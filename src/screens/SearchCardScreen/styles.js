import { StyleSheet } from "react-native";
import { Colors } from "../../constants/"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      //   backgroundColor: "#000"
      //   justifyContent: 'center',
      },
      input: {
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
      suggestionContainer: {
        flexDirection: "row",
        padding: 10,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 5,
        backgroundColor: 'white',
      },
      suggestionText: {
        fontSize: 18,
        color: Colors.black
      },
      selectedTab: {
          backgroundColor: 'black',
      },
      OptionTabContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
      },
      tab: {
          height: 40,
          width: 80,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 2,
          borderBottomColor: 'rgba(255, 255, 255, 0.0)',
        },
        selectedTab: {
          borderBottomColor: 'black',
        },
        tabText: {
          color: 'rgba(0, 0, 0, 0.5)',
        },
        selectedTabText: {
          color: 'black',
          fontWeight: 'bold',
        },
})

export default styles;