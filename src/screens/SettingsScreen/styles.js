import { StyleSheet } from "react-native";
import { Colors } from "../../constants/"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,

      },
      title: {
        color: Colors.primaryColor,
        fontWeight: "500",
        marginBottom: 10,

      },
      textPrimary: {
        color: Colors.black,
      },
      textSecondary: {
        color: "rgba(0, 0, 0, 0.5)",

      },
      textContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2

      },
     iconStyle: { 
        marginRight: 20,
        marginTop: 5
     },

      declarationText: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.5)",
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: "80%",
        marginTop: 40
      },
})

export default styles;