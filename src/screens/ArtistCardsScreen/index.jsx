import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const ArtistCardsScreen = (props) => {

    const artistName = props?.route.params.artistName
    console.log('artistName', artistName)
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

    const [pokemonSets, setPokemonSets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const [colors, setColors] = useState("#fff")


    useEffect(() => {
        dispatch(getArtist(artistName))
        const updateOnGoBack = props.navigation.addListener('focus', () => {
            dispatch(getArtist(artistName))
        });
        return updateOnGoBack;
	},[])


    // console.log('colors', colors)

    const uniqueSupertypes = data && data.map(item => item.supertype)
    .filter((supertype, index, self) => self.indexOf(supertype) === index);
  
    // console.log('uniqueSupertypes', uniqueSupertypes)
  
	return data ? (
        <View style={styles.imageContainer}>
            {/* <View style={{...styles.setDataContainer, backgroundColor: colors}}>
                <Image
                    source={{
                        uri: setData.images.logo
                    }}
                    style={styles.setLogo}
                />
            </View> */}
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