import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Modal, Animated, ActivityIndicator, Alert, Platform, Easing } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from "./styles"
import { PanGestureHandler } from 'react-native-gesture-handler';
import allPokemonNameData from "../../assets/json/allPokemonNames.json";
import {useNavigation} from "@react-navigation/native"
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const PokemonCard = ({cardData, cardImageLarge, cardSmall}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPokemonName, setFilteredPokemonName] = useState("");

  const [saveMessageVisible, setSaveMessageVisible] = useState(false);
  const [saveMessageOpacity] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  const showSaveMessage = () => {
    setSaveMessageVisible(true);
    saveMessageOpacity.setValue(0);
    
    Animated.sequence([
      Animated.spring(saveMessageOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        friction: 8,
        tension: 40
      }),
      Animated.delay(2400),
      // Fade out with easing
      Animated.timing(saveMessageOpacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      })
    ]).start(() => {
      setSaveMessageVisible(false);
    });
  };

  const saveImage = async () => {
    try {
      // 1. Pedir permissão
      const permission =
        Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
  
      const result = await request(permission);
  
      if (result !== RESULTS.GRANTED) {
        Alert.alert('Permissão negada', 'Não foi possível salvar a imagem.');
        return;
      }
  
      // 2. Baixar a imagem
      const imageUrl = cardData.images.large;
      const fileName = imageUrl.split('/').pop();
      const downloadDest = `${RNFS.CachesDirectoryPath}/${fileName}`;
  
      const downloadResult = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;
  
      // 3. Se o download foi bem-sucedido...
      if (downloadResult.statusCode === 200) {
        try {
          await CameraRoll.saveAsset(downloadDest);
          // Alert.alert('Sucesso', 'Imagem salva na galeria!');
          showSaveMessage();
        } catch (saveError) {
          console.error('Error saving to CameraRoll:', saveError);
          Alert.alert('Erro', 'Não foi possível salvar a imagem.');
        }
      } else {
        Alert.alert('Erro', 'Não foi possível baixar a imagem.');
      }
    } catch (err) {
      console.error('Error in saveImage:', err);
      Alert.alert('Erro', 'Não foi possível salvar a imagem.');
    }
  };

  const fadeIn = () => {
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

  const handleOnPressCard = () => {
    setModalVisible(true)
    if (cardData.supertype === "Pokémon" && cardData.nationalPokedexNumbers && cardData.nationalPokedexNumbers.length > 0) {
      const filteredAllPokemonName = allPokemonNameData.filter(item => item.dex === cardData.nationalPokedexNumbers[0]);
      setFilteredPokemonName(filteredAllPokemonName[0]?.name || "")
    } else {
      setFilteredPokemonName("")
    }
  }

  const CardaInfoData = ({topLine, bottomLine, onPress}) => (
    <View>
      <Text style={styles.modalTopText}>{topLine}</Text>
      {Array.isArray(bottomLine) && bottomLine.length >= 1 ? 
        bottomLine.map((item) => (
          <TouchableOpacity key={item} onPress={() => navigation.push("PokemonSubtypeScreen", {subtypeName: item})} >
            <Text style={styles.modalBottomText}>{item}</Text>
          </TouchableOpacity>
        )) : (
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.modalBottomText}>{bottomLine}</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );

  const filteredPokemonSubtypes = () => {
    const filteredArr = cardData.subtypes.filter(value => value !== "Basic" && value !== "Stage 1" && value !== "Stage 2" && value !== "Goldenrod Game Corner" && value !== undefined);    
    return filteredArr;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPressCard}>
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
        onRequestClose={fadeOut}
        onDismiss={fadeOut}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <PanGestureHandler
              onGestureEvent={({ nativeEvent: { translationX } }) => {
                if (translationX > 100) {
                  setModalVisible(false);
                }
              }}
            >
              <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={saveImage}
                >
                  <Icon name="save" size={30} color={Colors.white} />
                </TouchableOpacity>
                <Image
                  source={{
                    uri: cardData.images.large
                  }}
                  style={styles.largeImage}
                />
                <View style={styles.cardaInfoContainer}>
                  <CardaInfoData
                  topLine={"Other"}
                  bottomLine={filteredPokemonName ? filteredPokemonName : "N/A"}
                  onPress={filteredPokemonName ? () => navigation.push("AllCardsWithSameNameScreen", {cardName: filteredPokemonName}) : undefined} />
                  <CardaInfoData 
                    topLine={"Set name"} 
                    bottomLine={cardData.set.name ? cardData.set.name : "N/A"} 
                    onPress={cardData.set.name ? () => navigation.push("SetCardsScreen", {setData: cardData.set}) : undefined} 
                  />
                  <CardaInfoData 
                    topLine={"artist"} 
                    bottomLine={cardData.artist ? cardData.artist : "N/A"} 
                    onPress={cardData.artist ? () => navigation.push("ArtistCardsScreen", {artistName: cardData.artist}) : undefined} 
                  />
                  {cardData.supertype === "Pokémon" && filteredPokemonSubtypes().length > 0 &&
                    <CardaInfoData topLine={"Other"} bottomLine={filteredPokemonSubtypes()} onPress={() => {}} />
                  }
                </View>

              </Animated.View>
              
            </PanGestureHandler>
            {saveMessageVisible && (
              <Animated.View style={[styles.toast, { opacity: saveMessageOpacity }]}>
                <Text style={styles.toastText}>Imagem salva na galeria!</Text>
              </Animated.View>
            )}
          </>
          
        )}
      </Modal>
    </View>
  );
}

export default PokemonCard;