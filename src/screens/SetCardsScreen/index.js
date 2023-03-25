import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Animated, FlatList, View, ActivityIndicator, Image } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getSet } from "../../store/actions/setsActions";
import PokemonCard from "../../components/PokemonCard"
import OptionTab from "../../components/OptionTab"

pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const SetCardsScreen = (props) => {

  const setData = props?.route.params.setData
	const dispatch = useDispatch();
	const { data, error } = useSelector(state => state.pokedex);

  const [selectedOption, setSelectedOption] = useState("All");

  const filteredData = selectedOption === "All" ? data : data?.filter(value => value?.subtypes?.some(subtype => subtype.startsWith(selectedOption)))

  useEffect(() => {
    setSelectedOption("All")
    dispatch(getSet(setData.id))
    const updateOnGoBack = props.navigation.addListener('focus', () => {
      dispatch(getSet(setData.id))
    });
    return updateOnGoBack;
  },[setData])

  useLayoutEffect(() => {
    props.navigation.setOptions({ headerTitle: setData.name });
  }, [props.navigation, setData ]);

  const uniqueSubtypes = data && [].concat(...data.map(item => item.subtypes))
  .filter((subtype, index, self) => self.indexOf(subtype) === index);

  const filteredArr = uniqueSubtypes && uniqueSubtypes.filter(value => value !== "Basic" && value !== "Stage 1" && value !== "Stage 2" && value !== "Goldenrod Game Corner" && value !== undefined);

  const toggleOption = (option) => {
    setSelectedOption(option);
  };
  
	return data ? (
        <View style={styles.imageContainer}>
          <View style={styles.setDataContainer}>
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

export default SetCardsScreen