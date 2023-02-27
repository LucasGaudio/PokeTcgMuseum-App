import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import {useNavigation} from "@react-navigation/native"
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

import allPokemonNameData from "../../assets/json/allPokemonNames.json";
import allTrainers from "../../assets/json/allTrainers.json";
import allEnergy from "../../assets/json/allEnergy.json";



const SearchCardScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Pokemon');

    const navigation = useNavigation()

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
      setSearchText("");
      setSuggestions([]);
      navigation.navigate("AllCardsWithSameNamePage", {cardName: item})

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
          placeholderTextColor="#000" 
          onChangeText={handleSearchTextChange}
          value={searchText}
          returnKeyType="go"
          onSubmitEditing={() => handleSuggestionPress(searchText)}

        />

        {suggestions.length > 0 && (
            <View style={{ width: '90%' }}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionPress(item.name)}>
                <View style={styles.suggestionContainer}>
                  <Icon
                    name="search1"
                    size={16}
                    // color={"rgba(255, 255, 255, 0.9)"}
                    style={{ marginRight: 10, marginTop: 5 }}
                  />
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          </View>
        )}
      </View>
    );
  };
  
  export default SearchCardScreen;
