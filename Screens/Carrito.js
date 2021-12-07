import React, { useContext } from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Card} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LibreriaContext } from '../Context/LibreriaContext';

export default function Wishlist() {
  const { carrito, total, eliminarCarritoTodo, comprar, eliminarCarrito } = useContext(LibreriaContext);

  return (
    <View>    
        {
        carrito.length === 0 
        ? 
          
          <View>
            <Text style={styles.template}>Tu carrito esta vacio</Text>
          </View>
        :
          <ScrollView>
          <View>
            <Text style={styles.template}>Total: $ {total}</Text>
            <View style={styles.boton}>
            <FontAwesome.Button backgroundColor="#3b7bbf" onPress={()=>comprar()}>
              Pagar
            </FontAwesome.Button>
            <TouchableHighlight onPress={() => eliminarCarritoTodo()}>
                <Ionicons name={'trash'} size={35} color={'red'} />
              </TouchableHighlight>
            
          </View>
        </View>
          {
            carrito.map((a,i)=>
            <Card>
            <Card.Title>{a.titulo}</Card.Title>

            <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginLeft: 1,
              marginRight: 1
            }}
            />

            <Text key={i}>Cantidad: {a.cantidad} </Text>
            <Text key={i}>Precio unitario: $ {a.precio}</Text>
            <Text key={i}>Importe: $ {a.cantidad*a.precio}</Text>
            <View style={styles.container}>
              <TouchableHighlight onPress={() => eliminarCarrito(a,i)}>
                <Ionicons name={'trash'} size={35} color={'red'} />
              </TouchableHighlight>
            </View>
            </Card>)
          }
           </ScrollView>      
        }      
    </View>
  );
}

const styles = StyleSheet.create({
  template:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 24,
    flexDirection: 'row',
  },
  boton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
