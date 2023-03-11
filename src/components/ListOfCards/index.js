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

    // const yunaUrl = setData?.images?.logo

    // useEffect(() => {
    //     if (data) {
    //         const fetchColors = async () => {
    //             const result = await ImageColors.getColors(yunaUrl, {
    //               fallback: '#000000',
    //               quality: 'low',
    //               pixelSpacing: 5,
    //               cache: true,
    //               headers: {
    //                 authorization: 'Basic 123',
    //               },
    //             })
          
    //             switch (result.platform) {
    //               case 'android':
    //               case 'web':
    //                 setColors({
    //                   colorOne: { value: result.lightVibrant, name: 'lightVibrant' },
    //                   colorTwo: { value: result.dominant, name: 'dominant' },
    //                   colorThree: { value: result.vibrant, name: 'vibrant' },
    //                   colorFour: { value: result.darkVibrant, name: 'darkVibrant' },
    //                   rawResult: JSON.stringify(result),
    //                 })
    //                 break
    //               case 'ios':
    //                 setColors({
    //                   colorOne: { value: result.background, name: 'background' },
    //                   colorTwo: { value: result.detail, name: 'detail' },
    //                   colorThree: { value: result.primary, name: 'primary' },
    //                   colorFour: { value: result.secondary, name: 'secondary' },
    //                   rawResult: JSON.stringify(result),
    //                 })
    //                 break
    //               default:
    //                 throw new Error('Unexpected platform')
    //             }
          
    //             setLoading(false)
    //           }
          
    //           fetchColors()
    //     }
      
    //   }, [data])

    // console.log('colors', colors)

    const uniqueSupertypes = data && data.map(item => item.supertype)
    .filter((supertype, index, self) => self.indexOf(supertype) === index);
  
    // console.log('uniqueSupertypes', uniqueSupertypes)
  
	return data ? (
        <View style={styles.imageContainer}>
            {/* <View style={{...styles.setDataContainer, backgroundColor: colors}}>
                <Image
                    source={{
                        uri: setData?.images?.logo
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
                keyExtractor={item => item.id}
            /> 
            

        </View>
    ) : 
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
};

export default ListOfCards