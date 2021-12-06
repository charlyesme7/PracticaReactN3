import React, { useContext } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Badge } from 'react-native-elements';

import HomeScreen from '../Screens/HomeScreen';
import Wishlist from '../Screens/Wishlist';
import Carrito from '../Screens/Carrito';

import { LibreriaContext } from '../Context/LibreriaContext';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator1(){
  const { cantidades, contando } = useContext(LibreriaContext);
  return(
    <Tab.Navigator
      initialRouteName="Libreria"
      tabBarOptions={{
        activeTintColor:"#2291b3",
        inactiveTintColor:"#060606",
        showLabel:true,
        labelStyle:{
            fontSize:12
        },
        style:{
            paddingBottom:5,
            backgroundColor:"#f3f3f1"
        }
      }}
    >   
    
    <Tab.Screen
      name = "Libreria"
      component={HomeScreen}
      options={{
          tabBarLabel:"Inicio",
          tabBarIcon:({color})=>(
          <Ionicons name={"home-outline"} size={20} color={color}/>
          )
      }}
    />

    <Tab.Screen
      name = "Whishlist"
      component={Wishlist}
      options={{
          tabBarLabel:"Wishlist",
          tabBarIcon:({color})=>(
          <View>
          <Ionicons name={"heart-circle-outline"} size={25} color={color}/>
            <Badge 
              status="error"
              value={contando()}
              containerStyle={{ position: 'absolute', top: 0, left: 150 }}
            />
          </View>
          )
      }}
    />

    <Tab.Screen
      name = "Carrito"
      component={Carrito}
      options={{
          tabBarLabel:"Carrito",
          tabBarIcon:({color})=>(
          <Ionicons name={"cart-outline"} size={20} color={color}/>
          )
      }}
    />


    </Tab.Navigator>
  )
}