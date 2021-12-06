import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { FontAwesome } from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LibreriaContext } from '../Context/LibreriaContext';

export default function Wishlist() {
  const { carrito, total, eliminarCarrito, comprarCarrito, eliminarCarro } = useContext(LibreriaContext);

  return (
    <View>      
        {
        carrito.length === 0 
        ? 
          <View>
            <Image
              style={styles.logo}
              source={require('../Imagenes/Emptycarrito.png')}
            />
            <Text style={styles.paragraph}>No hay nada en tu carrito</Text>
          </View>
        :
          <ScrollView>
          <View>
            <Text style={styles.paragraph}>Total: $ {total}</Text>
            <View style={styles.container2}>
            <FontAwesome.Button name="paypal" backgroundColor="#3b7bbf" onPress={()=>comprarCarrito()}>
              Pagar con Paypal
            </FontAwesome.Button>
            <Text style={styles.paragraph}>____________________</Text>
            <FontAwesome.Button name="remove" backgroundColor="#c33d3c" onPress={()=>eliminarCarrito()}>
              Eliminar contenido del carrito
            </FontAwesome.Button>
          </View>
        </View>
          {
            carrito.map((a,i)=>
            <Card>
            <Card.Title>{a.titulo}</Card.Title>
            <Text key={i}>Cantidad = {a.cantidad} </Text>
            <Text key={i}>Precio = $ {a.precio} c/u </Text>
            <Text key={i}>Importe = $ {a.importe}  </Text>
            <View style={styles.container}>
              <TouchableHighlight onPress={() => eliminarCarro(a)}>
                <Ionicons name={'remove-circle'} size={22} color={'red'} />
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 24,
    flexDirection: 'row',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 200,
    width: 225,
    margin: 50,
  },
});
