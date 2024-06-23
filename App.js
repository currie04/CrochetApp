import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from './components/Screens/HomeScreen.js';
import Gallery from './components/Screens/Gallery.js';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    /*Creating Navigation System*/
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Gallery" component={Gallery}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}


