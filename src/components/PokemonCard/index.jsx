import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Modal, Animated, ActivityIndicator } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from "./styles"
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import allPokemonNameData from "../../assets/json/allPokemonNames.json";
import {useNavigation} from "@react-navigation/native"

const PokemonCard = ({cardData, cardImageLarge, cardSmall}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPokemonName, setFilteredPokemonName] = useState(cardData.name);
  const navigation = useNavigation()
  
  const fadeIn = () => {
    if (cardData.supertype === "Pokémon") {
      const filteredPokemonName = allPokemonNameData.filter(item => item.dex === cardData.nationalPokedexNumbers[0]);
      setFilteredPokemonName(filteredPokemonName[0].name)
    }
   
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };
  

  const CardaInfoData = ({topLine, bottomLine, onPress}) => (
    <View>
      <Text style={styles.setName}>{topLine}</Text>
      <TouchableOpacity onPress={onPress} >
        <Text style={styles.setName}>{bottomLine}</Text>

      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.cardView}>
        <Image
          source={{
            uri: cardData.images.small
          }}
          style={styles.smallImage}
        />
      </View>
    </TouchableOpacity>
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onShow={fadeIn}
      onRequestClose={() => {
        fadeOut();
      }}
      onDismiss={() => fadeOut()}
    >
      
      {isLoading ? (
          <ActivityIndicator />
        ) : (
          <PanGestureHandler
          onGestureEvent={({ nativeEvent: { translationX } }) => {
            if (translationX > 100) {
              setModalVisible(false);
            }
          }}
        >
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          
            <Image
              source={{
                uri: cardData.images.large
              }}
              style={styles.largeImage}
              // onLoadStart={() => setIsLoading(true)}
              onLoad={() => setIsLoading(false)}
              />
            <View style={styles.cardaInfoContainer}>
              <CardaInfoData topLine={"Other"} bottomLine={filteredPokemonName} onPress={() => navigation.navigate("AllCardsWithSameNamePage", {cardName: filteredPokemonName})} />
              <CardaInfoData topLine={"Set name"} bottomLine={cardData.set.name} onPress={() => navigation.navigate("SetCardsPage", {setData: cardData.set})} />
              <CardaInfoData topLine={"artist"} bottomLine={cardData.artist} onPress={() => navigation.navigate("AllCardsWithSameNamePage", {cardName: filteredPokemonName})} />

            </View>
          </Animated.View>
        </PanGestureHandler>

      )}

    </Modal>
  </View>
  );
}

export default PokemonCard