import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getSet } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const ListOfCards = (props) => {

    const listOfCardsData = props.data
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

    const [pokemonSets, setPokemonSets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const [colors, setColors] = useState("#fff")

    useEffect(() => {
      dispatch(getSet(listOfCardsData))
      const updateOnGoBack = props.navigation.addListener('focus', () => {
        dispatch(getSet(listOfCardsData))
      });
      return updateOnGoBack;
	  },[listOfCardsData])

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
                keyExtractor={item => item.id}
            /> 
            

        </View>
    ) : 
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
};

export default ListOfCards