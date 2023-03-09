import { StyleSheet } from "react-native";
import { Colors } from "../../constants/"

const styles = StyleSheet.create({
    tab: {
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.0)',
    },
    selectedTab: {
        borderBottomColor: Colors.primaryColor,
    },
    tabText: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    selectedTabText: {
        color: Colors.primaryColor,
        fontWeight: 'bold',        
    },
})

export default styles;