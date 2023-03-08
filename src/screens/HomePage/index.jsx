import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { Colors } from "../../constants"

import IndividualSetBox from "../../components/IndividualSetBox"

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const HomePage = () => {
    const [pokemonSets, setPokemonSets] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        pokemon.set.all({ orderBy: "-releaseDate" }).then(sets => {
            setPokemonSets(sets);
            setLoading(false);
        });
    }, []);

	return (
        <View style={{flex: 1, marginBottom: 20, }}>
            {
                !loading ?
                    pokemonSets !== null &&   
                        <FlatList
                            contentContainerStyle={{ margin: 1 }}
                            showsVerticalScrollIndicator={false}
                            data={pokemonSets}
                            renderItem={({item}) =>
                                <IndividualSetBox
                                    setData={item}
                                />
                            }
                        /> 
                :
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            }
        </View>
	);
};

export default HomePage