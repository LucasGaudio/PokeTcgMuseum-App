import { StyleSheet } from "react-native";
import { Colors } from "../../constants/"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginHorizontal: 10,
        marginBottom: 10,
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        color: Colors.black
    },
})

export default styles;