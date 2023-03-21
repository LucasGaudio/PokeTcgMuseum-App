
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
import PokemonSubtypePage from "./src/screens/PokemonSubtypePage"


import SearchCardScreen from "./src/screens/SearchCardScreen"

import {Colors} from "./src/constants"

const Stack = createStackNavigator()

const App = () => {
  const Tab = createBottomTabNavigator()

  const HomeStack = () => {
    return (
       <Stack.Navigator>
          <Stack.Screen
            name={"Sets"}
            component={HomePage}
            options={{
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          />

          <Stack.Screen
            name={"SetCardsPage"}
            component={SetCardsPage}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          /> 

          <Stack.Screen
            name={"AllCardsWithSameNamePage"}
            component={AllCardsWithSameNamePage}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff",
            }}
          /> 

          <Stack.Screen
            name={"ArtistCardsScreen"}
            component={ArtistCardsScreen}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          /> 

          <Stack.Screen
            name={"PokemonSubtypePage"}
            component={PokemonSubtypePage}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          /> 

        </Stack.Navigator> 
    )
  }

  const SearchStack = () => {
    return (
       <Stack.Navigator>
          <Stack.Screen
            name={"Search a Card"}
            component={SearchCardScreen}
            options={{
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          />

          <Stack.Screen
            name={"SetCardsPage"}
            component={SetCardsPage}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          /> 

          <Stack.Screen
            name={"AllCardsWithSameNamePage"}
            component={AllCardsWithSameNamePage}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff",
            }}
          /> 

          <Stack.Screen
            name={"ArtistCardsScreen"}
            component={ArtistCardsScreen}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          /> 

          <Stack.Screen
            name={"PokemonSubtypePage"}
            component={PokemonSubtypePage}
            options={{
              headerTitle: null,
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff"
            }}
          /> 

        </Stack.Navigator> 
    )
  }

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
                  color={focused ? Colors.primaryColor : "#000"}
                  style={{marginTop: 5}}
                />
                
              ),
              tabBarLabel: ({ focused }) => (
                <Text style={{ fontSize: 16, color: focused ? Colors.primaryColor : "#000", marginBottom: 5}}>
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
                color={focused ? Colors.primaryColor : "#000"}
                style={{marginTop: 5}}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text style={{ fontSize: 16, color: focused ? Colors.primaryColor : "#000", marginBottom: 5}}>
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

