import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import { fetchUserData } from '../../services/supabase/client';
import { supabaseClient } from '../../services/supabase/client';
import DeviceInfo from 'react-native-device-info';

import { SUPABASE_URL, SUPABASE_ANON_KEY, REACT_APP_POKEMONTCG_KEY } from '@env';

const SettingsScreen = () => {
  const [deviceId, setDeviceId] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  console.log('deviceId', deviceId)
  console.log('uniqueId', uniqueId)


  useEffect(() => {
    console.log('SUPABASE_URL', SUPABASE_URL)
    console.log('SUPABASE_ANON_KEY', SUPABASE_ANON_KEY)
    console.log('REACT_APP_POKEMONTCG_KEY', REACT_APP_POKEMONTCG_KEY)

    const fetchIds = async () => {
      const id = DeviceInfo.getDeviceId(); // Model identifier, like "SM-G973F"
      const uid = await DeviceInfo.getUniqueId(); // Unique ID for the device
      setDeviceId(id);
      setUniqueId(uid);
    };

    fetchIds();
    fetchUserData()
  }, []);

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
