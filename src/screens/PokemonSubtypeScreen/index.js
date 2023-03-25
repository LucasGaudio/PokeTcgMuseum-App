import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getSubtype } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const PokemonSubtypeScreen = (props) => {

    const subtypeName = props?.route.params.subtypeName
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

    useEffect(() => {
        dispatch(getSubtype(subtypeName))
        const updateOnGoBack = props.navigation.addListener('focus', () => {
            dispatch(getSubtype(subtypeName))
        });
        return updateOnGoBack;
	},[])


    useLayoutEffect(() => {
        props.navigation.setOptions({ headerTitle: subtypeName });
    }, [props.navigation]);
  
	return data ? (
        <View style={styles.imageContainer}>
            <FlatList
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({item}) =>
                    <PokemonCard
                        cardData={item}
                    />
                }
            /> 
            

        </View>
    ) : 
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
};

export default PokemonSubtypeScreen