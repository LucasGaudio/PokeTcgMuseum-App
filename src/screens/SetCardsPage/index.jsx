import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Animated, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getSet } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
import ImageColors from "react-native-image-colors";
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

    useEffect(() => {
        if (data) {
            const fetchColors = async () => {
                const result = await ImageColors.getColors(yunaUrl, {
                  fallback: '#000000',
                  quality: 'low',
                  pixelSpacing: 5,
                  cache: true,
                  headers: {
                    authorization: 'Basic 123',
                  },
                })
          
                switch (result.platform) {
                  case 'android':
                  case 'web':
                    setColors({
                      colorOne: { value: result.lightVibrant, name: 'lightVibrant' },
                      colorTwo: { value: result.dominant, name: 'dominant' },
                      colorThree: { value: result.vibrant, name: 'vibrant' },
                      colorFour: { value: result.darkVibrant, name: 'darkVibrant' },
                      rawResult: JSON.stringify(result),
                    })
                    break
                  case 'ios':
                    setColors({
                      colorOne: { value: result.background, name: 'background' },
                      colorTwo: { value: result.detail, name: 'detail' },
                      colorThree: { value: result.primary, name: 'primary' },
                      colorFour: { value: result.secondary, name: 'secondary' },
                      rawResult: JSON.stringify(result),
                    })
                    break
                  default:
                    throw new Error('Unexpected platform')
                }
          
                setLoading(false)
              }
          
              fetchColors()
        }
      
      }, [data])

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
      <Animated.View style={{ ...styles.setDataContainer, backgroundColor: colors, transform: [{
        scaleY: scrollY.interpolate({
          inputRange: [0, 200],
          outputRange: [1, 0.5],
          extrapolate: 'clamp'
        })
      }] }}>
        <Image
          source={{
            uri: setData?.images?.logo
          }}
          style={styles.setLogo}
        />
      </Animated.View>
            <AnimatedFlatList
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={data}
                onScroll={handleScroll}
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