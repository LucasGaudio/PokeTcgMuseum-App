import { StyleSheet } from "react-native";
import { Colors } from "../../constants/"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 20, 
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 5,
        borderRadius: 10,
        height: 80,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
    },
    setImage: {
        width: 120,
        height: 60,
        resizeMode: 'contain' 
    },
    setSymbol: {
        width: 30,
        height: 60,
        resizeMode: 'contain' 
    },
    setName: {
        maxWidth: 150,
        fontWeight: "700",
        fontSize: 16,
        color: Colors.black,
    },
    setDate: {
        color: Colors.black,
    },
    textView: {
        flex: 1,
        marginHorizontal: 15
    }
})

export default styles;