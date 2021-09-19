import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { 
    LoginScreen,
    DetailScreen, 
    // HomeScreen,
    MenuScreen,
    KirimanMenginap,
    ProduksiKiriman,
    TableProduksiKiriman,
    JatuhTempo,
    Irregulaity,
    UpdatesView,
    Profile
} from './views';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { 
    vertical as verticalTransition, 
    horizontal as horizontalTransition 
} from './views/config/transition';
import { setLoggedIn } from './actions/sessions';

const themes = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        background: '#FA6901'
    }
}

const Stack = createStackNavigator();

const UserRoute = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Menu" component={MenuScreen} options={{ ...horizontalTransition }} />
            <Stack.Screen name="KirimanMenginap" component={KirimanMenginap} options={{ ...verticalTransition }} />
            <Stack.Screen name="ProduksiKiriman" component={ProduksiKiriman} options={{ ...verticalTransition }} />
            <Stack.Screen name="TableProduksiKiriman" component={TableProduksiKiriman} options={{ ...horizontalTransition }} />
            <Stack.Screen name="JatuhTempo" component={JatuhTempo} options={{ ...verticalTransition }} />
            <Stack.Screen name="Irregulaity" component={Irregulaity} options={{ ...verticalTransition }} />
            <Stack.Screen name="Profile" component={Profile} options={{ ...horizontalTransition }} />
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

const AppStack = ({ sessions, updateAvailable, setLoggedIn }) => {
    const [mount, setmount] = useState(false);

    useEffect(() => {
        (async() => {
            try {
                const sess = await AsyncStorage.getItem('sessions');   
                if (sess !== null) {
                    setLoggedIn(JSON.parse(sess))
                }
            } catch (error) {
                console.log({ error });
            }

            setmount(true);
        })();
    }, []);

    if(mount){
        if(updateAvailable){
            return <UpdatesView />;
        }else{
            return(
                <NavigationContainer theme={themes}>
                    { Object.keys(sessions).length > 0 ? <UserRoute /> : <GuestRoute /> }
                </NavigationContainer>
            )
        }
    }else{
        return null;
    }
}

AppStack.propTypes = {
    sessions: PropTypes.object.isRequired,
    updateAvailable: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return{
        sessions: state.sessions
    }
}

export default connect(mapStateToProps, { setLoggedIn })(AppStack);