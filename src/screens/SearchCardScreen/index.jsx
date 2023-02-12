import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';

import allPokemonNameData from "../../assets/json/allPokemonNames.json";
import allTrainers from "../../assets/json/allTrainers.json";
import allEnergy from "../../assets/json/allEnergy.json";



const SearchCardScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Pokemon');

    const handleSearchTextChange = (text) => {
        let selectedOptionJson;
        if(selectedOption === 'Pokemon') {
            selectedOptionJson = allPokemonNameData
        } else if (selectedOption === 'Trainer') {
            selectedOptionJson = allTrainers
        } else {
            selectedOptionJson = allEnergy
        }


        setSearchText(text);
        if (text === '') {
          setSuggestions([]);
          return;
        }
        const filteredSuggestions = selectedOptionJson.filter(
          (item) => item.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const toggleOption = (option) => {
    setSelectedOption(option);
    setSearchText("")
    setSuggestions([]);

    };

  
    const handleSuggestionPress = (item) => {
      setSearchText(item.name);
      setSuggestions([]);
    };

    const OptionTab = ({ option }) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => toggleOption(option)}
          style={[styles.tab, selectedOption === option && styles.selectedTab]}
        >
          <Text style={[styles.tabText, selectedOption === option && styles.selectedTabText]}>
            {option}
          </Text>
        </TouchableOpacity>
    );

    const handleSubmit = (event) => {
        console.log(searchText);
      };
  
    return (
      <View style={styles.container}>
        <View style={styles.OptionTabContainer}>
            <OptionTab option="Pokemon" />
            <OptionTab option="Trainer" />
            <OptionTab option="Energy" />
        </View>
           
        <TextInput
          style={styles.input}
          placeholder={`Search ${selectedOption === "Energy" ? "an" : "a" } ${selectedOption}`}
          onChangeText={handleSearchTextChange}
          value={searchText}
          handleSubmit={handleSubmit()}
          
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                <View style={styles.suggestionContainer}>
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    //   backgroundColor: "#000"
    //   justifyContent: 'center',
    },
    input: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      marginTop: 20,
    },
    suggestionContainer: {
      backgroundColor: 'lightgray',
      padding: 10,
      width: '100%',
      marginTop: 10,
    },
    suggestionText: {
      fontSize: 18,
    },
    selectedTab: {
        backgroundColor: 'black',
    },
    OptionTabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    tab: {
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.0)',
      },
      selectedTab: {
        borderBottomColor: 'black',
      },
      tabText: {
        color: 'rgba(0, 0, 0, 0.5)',
      },
      selectedTabText: {
        color: 'black',
        fontWeight: 'bold',
      },
  });
  
  export default SearchCardScreen;
