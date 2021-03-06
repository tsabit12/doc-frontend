import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { 
    LoginScreen,
    DetailScreen, 
    //MenuScreen,
    JatuhTempo,
    UpdatesView,
    User,
    Notification as NotifView,
    ProduksiKiriman,
    DetailSummary
} from './views';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { 
    vertical as verticalTransition, 
    horizontal as horizontalTransition 
} from './views/config/transition';
import { setLoggedIn } from './actions/sessions';
import { setMessage } from './actions/message';
import HomeTab from './HomeTab';

const themes = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        background: '#FA6901'
    }
}

const Stack = createStackNavigator();

const UserRoute = ({ notification, sessions, message, setMessage }) => {
    const navigation = useNavigation();

    useEffect(() => {
        if(Object.keys(notification).length > 0){
            navigation.navigate('Notification', { data: notification });
        }
    }, [notification]);

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomePage">
                {(props) => 
                    <HomeTab 
                        { ...props }
                        sessions={sessions} 
                        message={message}
                        setMessage={setMessage}
                    /> }
            </Stack.Screen>
            <Stack.Screen name="JatuhTempo" component={JatuhTempo} options={{ ...verticalTransition }} />
            <Stack.Screen name="ProduksiKiriman" component={ProduksiKiriman} options={{ ...verticalTransition }} />
            <Stack.Screen name="Users" component={User} options={{ ...verticalTransition }} />
            <Stack.Screen name="Notification" component={NotifView} options={{ ...verticalTransition }} />
            <Stack.Screen name="DetailSummary" component={DetailSummary} options={{ ...horizontalTransition }} />
        </Stack.Navigator>
    )
}

UserRoute.propTypes = {
    notification: PropTypes.object.isRequired,
    sessions: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
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

const AppStack = ({ sessions, updateAvailable, setLoggedIn, notification, message, setMessage }) => {
    const [mount, setmount] = useState(false);

    useEffect(() => {
        (async() => {
            try {
                const sess = await AsyncStorage.getItem('sessions-v2');   
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
                    { Object.keys(sessions).length > 0 ? 
                        <UserRoute 
                            notification={notification} 
                            sessions={sessions}
                            message={message}
                            setMessage={setMessage}
                        /> : <GuestRoute /> }
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
    notification: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return{
        sessions: state.sessions,
        message: state.message
    }
}

export default connect(mapStateToProps, { setLoggedIn, setMessage })(AppStack);