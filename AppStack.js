import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { 
    LoginScreen,
    DetailScreen, 
    HomeScreen,
    MenuScreen,
    KirimanMenginap,
    ProduksiKiriman,
    TableProduksiKiriman,
    JatuhTempo,
    Irregulaity
} from './views';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    vertical as verticalTransition, 
    horizontal as horizontalTransition 
} from './views/config/transition';

const Stack = createStackNavigator();

const UserRoute = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ ...verticalTransition }} />
            <Stack.Screen name="Menu" component={MenuScreen} options={{ ...horizontalTransition }} />
            <Stack.Screen name="KirimanMenginap" component={KirimanMenginap} options={{ ...verticalTransition }} />
            <Stack.Screen name="ProduksiKiriman" component={ProduksiKiriman} options={{ ...verticalTransition }} />
            <Stack.Screen name="TableProduksiKiriman" component={TableProduksiKiriman} options={{ ...horizontalTransition }} />
            <Stack.Screen name="JatuhTempo" component={JatuhTempo} options={{ ...verticalTransition }} />
            <Stack.Screen name="Irregulaity" component={Irregulaity} options={{ ...verticalTransition }} />
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