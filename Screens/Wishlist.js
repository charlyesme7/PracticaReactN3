import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Card} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LibreriaContext } from '../Context/LibreriaContext';

export default function Wishlist() {
  const { wishList, eliminarWishList, agregarCarro } = useContext(LibreriaContext);

  return (
    <View>
      <ScrollView>
        {wishList.length === 0 ? (
          
            <Text style={styles.template}>Tu wishlist esta vacia</Text>
          
        ) : (
            wishList.map((a,i)=>
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

          <View>
            <Text style={styles.datos} key={i}>Precio: ${a.precio} </Text>
            <Text style={styles.datos} key={i + 10}>{a.idioma}</Text>
          </View>

            <View style={styles.botones}>
              <TouchableHighlight onPress={() => eliminarWishList(a)}>
                <Ionicons name={'trash'} size={35} color={'red'} />
              </TouchableHighlight>
              <TouchableHighlight onPress={()=> agregarCarro(a)}>
                <Ionicons name={'cart-outline'} size={35} color={'green'} />
              </TouchableHighlight>
            </View>
          </Card>
            )
        )}
      </ScrollView>
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
