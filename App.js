import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './Navigations/BottomTabNavigator';
import Libreriaprovider from './Context/LibreriaContext'

export default function App() {
  return (
    <Libreriaprovider>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </Libreriaprovider>
  );
}