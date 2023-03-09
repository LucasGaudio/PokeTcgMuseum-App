import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const OptionTab = ({onPress, option, selectedOption}) => {

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onPress(option)}
            style={[styles.tab, selectedOption === option && styles.selectedTab]}
        >
            <Text style={[styles.tabText, selectedOption === option && styles.selectedTabText]}>
                {option}
            </Text>
        </TouchableOpacity>
    );
  };
  
  export default OptionTab;
