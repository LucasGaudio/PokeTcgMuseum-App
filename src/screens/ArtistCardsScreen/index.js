import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const ArtistCardsScreen = (props) => {

    const artistName = props?.route.params.artistName
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

    useEffect(() => {
        dispatch(getArtist(artistName))
        const updateOnGoBack = props.navigation.addListener('focus', () => {
            dispatch(getArtist(artistName))
        });
        return updateOnGoBack;
	},[])


    useLayoutEffect(() => {
        props.navigation.setOptions({ headerTitle: artistName });
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

export default ArtistCardsScreen