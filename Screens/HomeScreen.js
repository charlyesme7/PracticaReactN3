import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import { Card} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LibreriaContext } from '../Context/LibreriaContext';

export default function HomeScreen() {
  const { catalogo, agregarWishList, eliminarWishList, agregarCarro } = useContext(LibreriaContext);

  return (
    <View>
      <ScrollView>
        {catalogo.map((a, i) => (
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
            <View style={styles.datos}>
              <Text style={styles.datos} key={i}>Precio: ${a.precio} </Text>
              <Text style={styles.datos} key={i + 10}>{a.idioma}</Text>
            </View>
            
            <View style={styles.botones}>
              {a.desactivado === false ? (
                <TouchableHighlight onPress={() => agregarWishList(a)}>
                  <Ionicons name={'heart'} size={35} color={'gray'} />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight onPress={() => eliminarWishList(a)}>
                  <Ionicons name={'heart'} size={35} color={'red'} />
                </TouchableHighlight>
              )}
              <TouchableHighlight onPress={()=> agregarCarro(a)}>
                <Ionicons name={'cart-outline'} size={35} color={'green'} />
              </TouchableHighlight>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  botones: {
    padding: 20,
    size:40,
    flexDirection: 'row-reverse'
  },
  datos: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  }
});

