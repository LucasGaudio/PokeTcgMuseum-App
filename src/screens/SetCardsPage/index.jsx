import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Animated, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getSet } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
import OptionTab from "../../components/OptionTab"

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const SetCardsPage = (props) => {

  const setData = props?.route.params.setData
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

  // console.log('testando', data && data[0].subtypes)

    const [pokemonSets, setPokemonSets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const [colors, setColors] = useState("#fff")
    const [selectedOption, setSelectedOption] = useState('All');

    const filteredData = selectedOption === "All" ? data : data?.filter(value => value?.subtypes?.includes(selectedOption))

    console.log('filteredData', filteredData)
    const [scrollY] = useState(new Animated.Value(0));

    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

    useEffect(() => {
      dispatch(getSet(setData.id))
      const updateOnGoBack = props.navigation.addListener('focus', () => {
        dispatch(getSet(setData.id))
      });
      return updateOnGoBack;
	  },[setData])


    useLayoutEffect(() => {
      props.navigation.setOptions({ headerTitle: setData.name });
    }, [props.navigation, setData ]);

    const yunaUrl = setData?.images?.logo



    // console.log('colors', colors)

    // const uniqueSubtypes = data && data.map(item => item.subtypes)
    // .filter((subtypes, index, self) => self.indexOf(subtypes) === index);
  

    const uniqueSubtypes = data && [].concat(...data.map(item => item.subtypes))
    .filter((subtype, index, self) => self.indexOf(subtype) === index);

    const filteredArr = uniqueSubtypes && uniqueSubtypes.filter(value => value !== "Basic" && value !== "Stage 1" && value !== "Stage 2" && value !== "Goldenrod Game Corner" && value !== undefined);

    const toggleOption = (option) => {
      setSelectedOption(option);
    };

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
            <ScrollView nestedScrollEnabled={true} horizontal={true}>
              <View style={styles.OptionTabContainer}>
                <OptionTab selectedOption={selectedOption} onPress={toggleOption} option="All" />
                {filteredArr && filteredArr.map(item =>
                  <OptionTab key={item} selectedOption={selectedOption} onPress={toggleOption} option={item} />
                )}
              </View>
            </ScrollView>


          </View>
            <FlatList
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={filteredData}
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