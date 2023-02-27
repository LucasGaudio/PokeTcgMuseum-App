import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Animated, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getSet } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const SetCardsPage = (props) => {

  const setData = props?.route.params.setData
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

  // console.log('testando', data && data[0])

    const [pokemonSets, setPokemonSets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const [colors, setColors] = useState("#fff")

    const [scrollY] = useState(new Animated.Value(0));

    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


    useEffect(() => {
      dispatch(getSet(setData.id))
      const updateOnGoBack = props.navigation.addListener('focus', () => {
        dispatch(getSet(setData.id))
      });
      return updateOnGoBack;
	  },[setData])

    const yunaUrl = setData?.images?.logo



    // console.log('colors', colors)

    // const uniqueSubtypes = data && data.map(item => item.subtypes)
    // .filter((subtypes, index, self) => self.indexOf(subtypes) === index);
  
    // console.log('uniqueSubtypes', uniqueSubtypes)

    const uniqueSubtypes = data && [].concat(...data.map(item => item.subtypes))
  .filter((subtype, index, self) => self.indexOf(subtype) === index);

console.log(uniqueSubtypes);

const handleScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
  { useNativeDriver: true }
);
  
	return data ? (
        <View style={styles.imageContainer}>
          <View style={{ ...styles.setDataContainer, backgroundColor: colors,}}>
            <Image
              source={{
                uri: setData?.images?.logo
              }}
              style={styles.setLogo}
            />
          </View>
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

export default SetCardsPage