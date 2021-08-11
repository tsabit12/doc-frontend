import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();
import { 
    HomeScreen,
    DetailScreen 
} from './views';

const AppStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ 
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack;