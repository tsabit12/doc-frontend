import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { HP } from '../../views/config/layout';
import hexToRgba from 'hex-to-rgba';
import { Close as CloseIcon, Info as InfoIcon } from '../../icons'
import { RFValue } from 'react-native-responsive-fontsize';

const Notification = ({ message, onClose }) => {
    const rightposition = useRef(new Animated.Value(-500)).current;

    useEffect(() => {
        Animated.timing(rightposition, {
            toValue: 1,
            duration: 200,
            delay: 100,
            useNativeDriver: true
        }).start(({ finished }) => {
            if(finished){
                setTimeout(() => {
                    handleClose();
                }, 3000);
            }
        });
    }, []);

    const handleClose = () => {
        Animated.timing(rightposition, {
            toValue: -500,
            duration: 200,
            useNativeDriver: true
        }).start(({ finished }) => {
            if(finished){ onClose() }
        });
    }

    const animatedstyle = {
        ...styles.root,
        transform: [
            {
              // Move the div by 0 to the right when value === 1
              translateX: rightposition.interpolate({
                inputRange: [-500, -300, -100, 1],
                outputRange: [500, 300, 100, 0],
    
                // Tells Animated to never go outside of the outputRange
                extrapolate: 'clamp',
              }) 
            }
        ]
    }

    return(
        <Animated.View style={animatedstyle}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <InfoIcon />
                <Text style={styles.text} numberOfLines={1}> {message}</Text>
            </View>
            <TouchableOpacity style={styles.icon} onPress={handleClose}>
                <CloseIcon />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: HP('7%'),
        backgroundColor: hexToRgba('#383838', '1'),
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        zIndex: 1,
        margin: 15,
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    text: {
        fontFamily: 'Poppins-Regular',
        color: '#FFF',
        fontSize: RFValue(12)
    },
    icon: {
        marginLeft: 6
    }
})

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Notification;