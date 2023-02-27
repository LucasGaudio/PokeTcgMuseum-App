import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setImage: {
        width: 120,
        height: 60,
        resizeMode: 'contain' 
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10

    },
    setDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 120
    },
    setLogo: {
        width: 150,
        height: 100,
        resizeMode: 'contain' 
    }
    // FlatListContainer: {
    //     flexDirection: "row",
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // }
})

export default styles;