
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
import ArtistCardsScreen from "./src/screens/ArtistCardsScreen"

import SearchCardScreen from "./src/screens/SearchCardScreen"


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

          <Stack.Screen
            name={"ArtistCardsScreen"}
            component={ArtistCardsScreen}
          /> 

        </Stack.Navigator> 
    )
  }

  const SearchStack = () => {
    return (
       <Stack.Navigator>
          <Stack.Screen
            name={"Search"}
            component={SearchCardScreen}
          />

          <Stack.Screen
            name={"SetCardsPage"}
            component={SetCardsPage}
          /> 

          <Stack.Screen
            name={"AllCardsWithSameNamePage"}
            component={AllCardsWithSameNamePage}
          /> 

          <Stack.Screen
            name={"ArtistCardsScreen"}
            component={ArtistCardsScreen}
          /> 

        </Stack.Navigator> 
    )
  }
  SearchCardScreen

  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen 
            name={"Sets"}
            component={HomeStack}
            options={{ 
              headerShown:false ,
            }}
          />
          <Tab.Screen 
            name={"Search card"}
            component={SearchStack}
            options={{ 
              headerShown:false ,
            }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;

