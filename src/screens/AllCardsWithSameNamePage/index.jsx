import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getAllCardsWithSameName } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const AllCardsWithSameNamePage = (props) => {

    const cardName = props?.route.params.cardName
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

    console.log('cardName test', cardName)

    useEffect(() => {
        dispatch(getAllCardsWithSameName(cardName))
        const updateOnGoBack = props.navigation.addListener('focus', () => {
            dispatch(getAllCardsWithSameName(cardName))
        });
        return updateOnGoBack;
	},[])
  
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

export default AllCardsWithSameNamePage