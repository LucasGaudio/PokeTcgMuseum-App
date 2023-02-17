import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import pokemon from "pokemontcgsdk";
import styles from "./styles"
import { useDispatch } from "react-redux";
import {useNavigation} from "@react-navigation/native"

const IndividualSetBox = ({setData}) => {
	// const dispatch = useDispatch();
    const navigation = useNavigation()
    const formatDate = (date) => {
        const dateArray = date.split('/');
        const reversedArray = dateArray.reverse();
        return reversedArray.join('/');
      };

	return (
        <TouchableOpacity onPress={() => navigation.navigate("SetCardsPage", {setData: setData})} style={styles.container}>
            <Image
                source={{
                    uri: setData.images.logo
                }}
                alt={setData.id}
                style={styles.setImage}
            />       
        <View style={{ flex: 1, marginLeft: 35 }}>
          <Text style={styles.setName}>{setData.name}</Text>
          <Text style={styles.setDate}>{formatDate(setData.releaseDate)}</Text>
        </View>
        <View>
            <Image
                source={{
                    uri: setData.images.symbol
                }}
                alt={setData.id}
                style={styles.setSymbol}
            /> 
        </View>
      </TouchableOpacity>

		
	);
}

export default IndividualSetBox