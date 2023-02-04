
import React from 'react';
import {
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from '@react-navigation/native';

import HomePage from "./src/screens/HomePage"
import SetCardsPage from "./src/screens/SetCardsPage"
import AllCardsWithSameNamePage from "./src/screens/AllCardsWithSameNamePage"



const Stack = createStackNavigator()

const App = () => {
  const Tab = createBottomTabNavigator()

  const HomeStack = () => {
    return (
       <Stack.Navigator>
          <Stack.Screen
            name={"Sets"}
            component={HomePage}
          />

          <Stack.Screen
            name={"SetCardsPage"}
            component={SetCardsPage}
          /> 

          <Stack.Screen
            name={"AllCardsWithSameNamePage"}
            component={AllCardsWithSameNamePage}
          /> 

        </Stack.Navigator> 
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen 
            name={"Home"}
            component={HomeStack}
            options={{ 
              headerShown:false ,
            }}
          />
          <Tab.Screen 
            name={"Tipo home"}
            component={HomeStack}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;

