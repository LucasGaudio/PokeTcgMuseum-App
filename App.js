
import React from 'react';
import {
  View, Text
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

import HomeScreen from "./src/screens/HomeScreen"
import SetCardsScreen from "./src/screens/SetCardsScreen"
import AllCardsWithSameNameScreen from "./src/screens/AllCardsWithSameNameScreen"
import ArtistCardsScreen from "./src/screens/ArtistCardsScreen"
import PokemonSubtypeScreen from "./src/screens/PokemonSubtypeScreen"
import SettingsScreen from "./src/screens/SettingsScreen"

import SearchCardScreen from "./src/screens/SearchCardScreen"

import {Colors} from "./src/constants"
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native"

const Stack = createStackNavigator()

const App = () => {
  const Tab = createBottomTabNavigator()

  const HomeStack = () => {
    const navigation = useNavigation()

    return (
       <Stack.Navigator>
          <Stack.Screen
            name={"Sets"}
            component={HomeScreen}
            options={{
              headerBackTitle: null,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: "#fff",
              headerRight: () => (
                <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.navigate("SettingsScreen")} >
                   <OcticonsIcon
                      name="gear"
                      size={20}
                      color={"#fff"}
                    />
                </TouchableOpacity>
              )
            }}
          />

          <Stack.Screen
            name={"SetCardsScreen"}
            component={SetCardsScreen}
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
            name={"AllCardsWithSameNameScreen"}
            component={AllCardsWithSameNameScreen}
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
            name={"PokemonSubtypeScreen"}
            component={PokemonSubtypeScreen}
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
            name={"SettingsScreen"}
            component={SettingsScreen}
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
        </Stack.Navigator> 
    )
  }

  const SearchStack = () => {
    const navigation = useNavigation()

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
              headerTintColor: "#fff",
            }}
          />

          <Stack.Screen
            name={"SetCardsScreen"}
            component={SetCardsScreen}
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
            name={"AllCardsWithSameNameScreen"}
            component={AllCardsWithSameNameScreen}
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
            name={"PokemonSubtypeScreen"}
            component={PokemonSubtypeScreen}
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
                  style={{marginTop: 3}}
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
                <OcticonsIcon
                name="search"
                size={20}
                color={focused ? Colors.primaryColor : "#000"}
                style={{marginTop: 3}}
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

