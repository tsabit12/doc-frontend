import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePageScreen, NotifView, Profile } from './views';
import { HomeIcon, NotificationIcon, ProfileIcon } from './icons';
import { HP, WP } from './views/config/layout';
import PropTypes from 'prop-types';
import { registerForPushNotificationsAsync } from './utils';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import service from './config/service';

const AlertIcon = ({ color }) => (
     <Svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M94.0001 67.9167L62.0418 14.9167C60.7495 12.8951 58.9691 11.2313 56.8646 10.0789C54.7602 8.92647 52.3994 8.3224 50.0001 8.3224C47.6008 8.3224 45.24 8.92647 43.1356 10.0789C41.0311 11.2313 39.2507 12.8951 37.9584 14.9167L6.00009 67.9167C4.87115 69.7986 4.25755 71.9445 4.22097 74.1388C4.1844 76.333 4.72615 78.4982 5.79176 80.4167C7.02376 82.5761 8.80701 84.3697 10.9593 85.6142C13.1115 86.8587 15.5556 87.5095 18.0418 87.5H81.9584C84.4282 87.5263 86.8613 86.9008 89.0121 85.6864C91.1629 84.472 92.9553 82.7118 94.2084 80.5833C95.3053 78.6449 95.8644 76.4486 95.8278 74.2216C95.7911 71.9947 95.1601 69.818 94.0001 67.9167V67.9167ZM50.0001 70.8333C49.176 70.8333 48.3704 70.589 47.6852 70.1311C47 69.6733 46.466 69.0225 46.1506 68.2612C45.8352 67.4998 45.7527 66.662 45.9135 65.8538C46.0743 65.0455 46.4711 64.3031 47.0538 63.7204C47.6365 63.1377 48.379 62.7408 49.1872 62.5801C49.9955 62.4193 50.8332 62.5018 51.5946 62.8172C52.356 63.1325 53.0067 63.6666 53.4645 64.3518C53.9224 65.037 54.1668 65.8426 54.1668 66.6667C54.1668 67.7717 53.7278 68.8315 52.9464 69.6129C52.165 70.3943 51.1052 70.8333 50.0001 70.8333ZM54.1668 54.1667C54.1668 55.2717 53.7278 56.3315 52.9464 57.1129C52.165 57.8943 51.1052 58.3333 50.0001 58.3333C48.895 58.3333 47.8352 57.8943 47.0538 57.1129C46.2724 56.3315 45.8334 55.2717 45.8334 54.1667V37.5C45.8334 36.3949 46.2724 35.3351 47.0538 34.5537C47.8352 33.7723 48.895 33.3333 50.0001 33.3333C51.1052 33.3333 52.165 33.7723 52.9464 34.5537C53.7278 35.3351 54.1668 36.3949 54.1668 37.5V54.1667Z" fill={color}/>
     </Svg>
)

AlertIcon.defaultProps = {
     color: 'red'
}

AlertIcon.propTypes = {
     color: PropTypes.string,
}

const AlertMessage = ({ open, text, onClose }) => {
     return <Modal visible={open} animationType='slide' transparent={true} statusBarTranslucent={true}>
          <BlurView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} tint='dark' intensity={70}>
               <View style={styles.modalcontainer}>
                    <AlertIcon />
                    <View style={{marginTop: 25, paddingHorizontal: 15, alignItems: 'center'}}>
                         <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, textAlign: 'center', opacity: 0.7}}>Ooops!</Text>
                         <Text style={{fontSize: 18, textAlign: 'center', color: '#8f8f8f'}}>
                              { text }
                         </Text>
                         <TouchableOpacity style={styles.buttonclose} activeOpacity={0.8} onPress={onClose}>
                              <Text style={{color: '#FFF', fontFamily: 'Poppins-Bold', fontSize: 15}}>CLOSE</Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </BlurView>
     </Modal>
}

AlertMessage.propTypes = {
     open: PropTypes.bool.isRequired,
     text: PropTypes.string,
     onClose: PropTypes.func.isRequired,
}

const Tab = createBottomTabNavigator();

const HomeTab = ({ sessions, message, setMessage }) => {
     const { open, message: text } = message;

     let sessionlength = Object.keys(sessions).length;
     
     useEffect(() => {
          if(sessionlength > 0){
               registerForPushNotificationsAsync()
                    .then(async token => {
                         const payload = {
                              userid: sessions.userid,
                              token
                         }

                         try {
                              await service.profile.addToken(payload);
                         } catch (error) {
                              if(error.message){
                                  setMessage({ open: true, message: error.message });
                              }else{
                                  setMessage({ open: true, message: 'Unknown error' });
                              }
                         }
                         
                    })
                    .catch(() => setMessage({ 
                         open: true, 
                         message: "Can't send notification to your device! Please check notification permission setting"
                    }))
          }
     }, [sessionlength]);     
     

     return <React.Fragment>
          <AlertMessage open={open} text={text} onClose={() => setMessage({ open: false, message: text })} />
          <Tab.Navigator
               screenOptions={{
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarLabelStyle: {
                         fontFamily: 'Poppins-Bold',
                         textAlign:'center'
                    },
                    tabBarStyle: { 
                         height: Platform.OS === 'android' ? HP('7%') : HP('9%'),
                         shadowColor: '#000',
                         shadowOpacity: 0.3,
                         shadowRadius: 5,
                         shadowOffset: {
                              width: 2,
                              height: 0
                         },
                         elevation: 2
                    },
                    tabBarActiveTintColor: '#000000',
                    tabBarInactiveTintColor: '#CDCDCD'
               }}
          >
               <Tab.Screen 
                    name='HomeAuth'
                    component={HomePageScreen}
                    options={{
                         tabBarLabel: 'Home',
                         tabBarIcon: ({ color }) => <HomeIcon color={color} />
                    }}
               />
               <Tab.Screen 
                    name='Notification'
                    component={NotifView}
                    options={{
                         tabBarLabel: 'Notification',
                         tabBarIcon: ({ color }) => <NotificationIcon color={color} />
                    }}
               />
               <Tab.Screen 
                    name='Profile'
                    component={Profile}
                    options={{
                         tabBarLabel: 'Profile',
                         tabBarIcon: ({ color }) => <ProfileIcon color={color} />
                    }}
               />
          </Tab.Navigator>
     </React.Fragment>
}
 
const styles = StyleSheet.create({
     modalcontainer: {
          backgroundColor: '#FFF',
          height: HP('45%'),
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: WP('80%')
     },
     buttonclose: {
          backgroundColor: '#FA6901',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          height: HP('6%'),
          width: WP('60%')
     }
})

HomeTab.propTypes = {
     sessions: PropTypes.object.isRequired,
     message: PropTypes.object.isRequired,
     setMessage: PropTypes.func.isRequired,
}

export default HomeTab;