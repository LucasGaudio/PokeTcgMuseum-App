import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen"

const Stack = createStackNavigator();

const TabNavigator = () => {
  <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={HomeScreen} />
    </Stack.Navigator>

};

export default TabNavigator;