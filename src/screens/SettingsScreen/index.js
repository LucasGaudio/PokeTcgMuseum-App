import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import OcticonsIcon from 'react-native-vector-icons/Octicons';


const SettingsScreen = () => {

  const settingItems = (textPrimary, textSecondary, icon, onPress ) => (
    <TouchableOpacity style={styles.textContainer} onPress={onPress}>
      <OcticonsIcon
        name={icon}
        size={22}
        color={"#000"}
        style={styles.iconStyle}
      />
      <View>
        <Text style={styles.textPrimary}>{textPrimary}</Text>
        <Text style={styles.textSecondary}>{textSecondary}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      {settingItems("Developed by", "Lucas Gaudio", "person", () => Linking.openURL('https://github.com/LucasGaudio'))}

      <Text style={styles.declarationText}>This application is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company. </Text>
    </View>
  );
};

export default SettingsScreen;
