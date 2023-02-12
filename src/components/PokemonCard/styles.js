import { StyleSheet } from "react-native";
import { Colors } from "../../constants/"
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        // flex: 1
        // margin: 5,
        margin: 6
    },
    cardView: {
		boxShadow: "rgba(0, 0, 0, 0.5)",
    },
    smallImage: {
        width: screenWidth * 0.3,
        height: 160,
        resizeMode: 'contain',
    },
   
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    largeImage: {
        width: "97%",
        height: "86%",
        resizeMode: 'contain' 
    },
    cardaInfoContainer:{
        flexDirection: 'row', 
        justifyContent: "space-between",
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
        // marginBottom: 10,
        borderRadius: 10,
        height: "14%",
        width: '100%'
    },
    setName: {
        maxWidth: 140
    },
    modalBottomText: {
        fontWeight: "700",
        color: "#485fc7",
        textDecorationLine: 'underline',
        maxWidth: 110
    }
    
    
})

export default styles;