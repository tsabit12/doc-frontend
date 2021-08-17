import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { 
    LoginScreen,
    DetailScreen, 
    HomeScreen,
    MenuScreen
} from './views';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const UserRoute = () => {
    return(
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
        </Stack.Navigator>
    )
}

const GuestRoute = () => {
    return(
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen name="Home" component={LoginScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}

const AppStack = ({ sessions }) => {
    return(
        <NavigationContainer>
            { Object.keys(sessions).length > 0 ? <UserRoute /> : <GuestRoute /> }
        </NavigationContainer>
    )
}

AppStack.propTypes = {
    sessions: PropTypes.object.isRequired,
}

function mapStateToProps(state){
    return{
        sessions: state.sessions
    }
}

export default connect(mapStateToProps, null)(AppStack);