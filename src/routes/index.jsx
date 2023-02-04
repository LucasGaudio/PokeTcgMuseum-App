// import { createBottomTabNavigator } from 'react-navigation';
// import HomePage from "../screens/HomePage"
// import TabNavigator from './TabNavigator'

// const RootStack = ({
//   Home: { screen: HomePage },
//   Search: { screen: HomePage },
//   Settings: { screen: TabNavigator },
// });

// export default RootStack;

import { createStackNavigator } from '@react-navigation/stack';
import HomePage from "../screens/HomePage"


const TabNavigator = () => {
    
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Search" component={HomePage} />
        </Stack.Navigator>

    )

};

export default TabNavigator;