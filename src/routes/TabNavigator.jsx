import { createStackNavigator } from '@react-navigation/stack';
import HomePage from "../screens/HomePage"

const Stack = createStackNavigator();

const TabNavigator = () => {
  <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Search" component={HomePage} />
    </Stack.Navigator>

};

export default TabNavigator;