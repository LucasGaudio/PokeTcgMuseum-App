import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator, TextInput } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { Colors } from "../../constants"

import IndividualSetBox from "../../components/IndividualSetBox"

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const HomeScreen = () => {
    const [pokemonSets, setPokemonSets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    
    const filteredData = searchText === "" ? pokemonSets : pokemonSets?.filter(value => value?.name?.includes(searchText))

    useEffect(() => {
        setLoading(true);
        pokemon.set.all({ orderBy: "-releaseDate" }).then(sets => {
            setPokemonSets(sets);
            setLoading(false);
        });
    }, []);

    const handleSearchTextChange = (text) => {

        setSearchText(text);
        // if (text === '') {
        //   setSuggestions([]);
        //   return;
        // }
        // const filteredSuggestions = selectedOptionJson.filter(
        //   (item) => item.name.toLowerCase().startsWith(text.toLowerCase())
        // );
        // setSuggestions(filteredSuggestions);
    };

	return (
        <View style={{flex: 1, marginBottom: 20, marginTop: 7 }}>
            {
                !loading ?
                    pokemonSets !== null &&   
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder={"Filter a Set"}
                                placeholderTextColor="#000" 
                                onChangeText={handleSearchTextChange}
                                value={searchText}
                                returnKeyType="go"
                                onSubmitEditing={() => handleSuggestionPress(searchText)}

                            />
                            <FlatList
                                contentContainerStyle={{ margin: 1 }}
                                showsVerticalScrollIndicator={false}
                                data={filteredData}
                                renderItem={({item}) =>
                                    <IndividualSetBox
                                        setData={item}
                                    />
                                }
                            /> 
                        </>
                    
                :
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            }
        </View>
	);
};

export default HomeScreen