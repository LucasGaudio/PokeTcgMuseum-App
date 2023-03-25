import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getAllCardsWithSameName } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
import { useRoute } from '@react-navigation/native';
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const AllCardsWithSameNameScreen = (props) => {
    const route = useRoute();



    const cardName = route.params.cardName
    console.log('cardName', cardName)
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

    useEffect(() => {
        dispatch(getAllCardsWithSameName(cardName))
        const updateOnGoBack = props.navigation.addListener('focus', () => {
            dispatch(getAllCardsWithSameName(cardName))
        });
        return updateOnGoBack;
	},[])

    useLayoutEffect(() => {
        props.navigation.setOptions({ headerTitle: cardName });
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

export default AllCardsWithSameNameScreen