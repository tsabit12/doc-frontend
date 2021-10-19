import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { HeaderLayout } from '../components';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import defaultstyles from '../config/styles';
import { AngleLeft } from '../../icons';
import Svg, { Path } from 'react-native-svg';

const Dots = () => (
     <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 8.59375C11.464 8.59375 10.4704 9.0053 9.73786 9.73786C9.0053 10.4704 8.59375 11.464 8.59375 12.5C8.59375 13.536 9.0053 14.5296 9.73786 15.2621C10.4704 15.9947 11.464 16.4062 12.5 16.4062C13.536 16.4062 14.5296 15.9947 15.2621 15.2621C15.9947 14.5296 16.4062 13.536 16.4062 12.5C16.4062 11.464 15.9947 10.4704 15.2621 9.73786C14.5296 9.0053 13.536 8.59375 12.5 8.59375ZM6.25 12.5C6.25 10.8424 6.90848 9.25268 8.08058 8.08058C9.25268 6.90848 10.8424 6.25 12.5 6.25C14.1576 6.25 15.7473 6.90848 16.9194 8.08058C18.0915 9.25268 18.75 10.8424 18.75 12.5C18.75 14.1576 18.0915 15.7473 16.9194 16.9194C15.7473 18.0915 14.1576 18.75 12.5 18.75C10.8424 18.75 9.25268 18.0915 8.08058 16.9194C6.90848 15.7473 6.25 14.1576 6.25 12.5Z" fill="black"/>
     </Svg>
)

const Notification = ({ navigation, route }) => {
     const { content } = route.params.data.notification.request;

     return(
          <SafeAreaView style={styles.droidSafeArea} edges={['top', 'left', 'right']}>
               <StatusBar style='dark' />
               <HeaderLayout 
                    title={
                         <View style={{flex: 1}}>
                              <Text style={{ ...defaultstyles.headertitle, color: '#5e5d5d'}}>Notification</Text>
                         </View> 
                    }
                    lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                         <AngleLeft color="#5e5d5d" />
                    </TouchableOpacity>} 
               />
               <View style={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                         <Dots />
                         <View style={{marginTop: -2, flex: 1, marginLeft: 5}}>
                              <Text>{ content.data.title }</Text>
                              <Text style={{fontSize: 12, opacity: 0.7, marginTop: 5}}>{ content.data.time }</Text>
                         </View>
                    </View>
                    <View style={styles.border} />
                    <View style={{marginHorizontal: 16}}>
                         <Text>{ content.body }</Text>
                    </View>
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     droidSafeArea: {
          flex: 1,
          paddingBottom: -20,
          backgroundColor: '#FFF'
     },
     container: {
          marginVertical: 10,
          marginHorizontal: 15
     },
     border: {
          height: 0.3,
          backgroundColor: '#5e5d5d',
          marginHorizontal: -15,
          marginVertical: 10
     }
})

Notification.propTypes = {
     route: PropTypes.shape({
          params: PropTypes.shape({
               data: PropTypes.object.isRequired,
          }).isRequired,
     }).isRequired,
}

export default Notification;