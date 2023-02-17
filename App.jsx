
import React from 'react';
import {
  View, Text
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';



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
            name={"Set"}
            component={HomeStack}
            options={{ 
              headerShown:false,
              tabBarIcon: ({ focused }) => (
                <MaterialIcon
                name="cards"
                size={20}
                color={focused ? "#007aff" : "#000"}
                style={{marginTop: 5}}

                />
                
              ),
              tabBarLabel: ({ focused }) => (
                <Text style={{ fontSize: 16, color: focused ? "#007aff" : "#000", marginBottom: 5}}>
                  Cards
                </Text>
              ),
            }}
          />
          <Tab.Screen 
            name={"Search card"}
            component={SearchStack}
            options={{ 
              headerShown:false,
              tabBarIcon: ({ focused }) => (
                <Icon
                name="search1"
                size={20}
                color={focused ? "#007aff" : "#000"}
                style={{marginTop: 5}}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text style={{ fontSize: 16, color: focused ? "#007aff" : "#000", marginBottom: 5}}>
                  Search card
                </Text>
              ),
            }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;

