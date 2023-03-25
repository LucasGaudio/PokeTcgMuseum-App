// import { createBottomTabNavigator } from 'react-navigation';
// import HomeScreen from "../screens/HomeScreen"
// import TabNavigator from './TabNavigator'

// const RootStack = ({
//   Home: { screen: HomeScreen },
//   Search: { screen: HomeScreen },
//   Settings: { screen: TabNavigator },
// });

// export default RootStack;

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen"


const TabNavigator = () => {
    
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={HomeScreen} />
        </Stack.Navigator>

    )

};

export default TabNavigator;