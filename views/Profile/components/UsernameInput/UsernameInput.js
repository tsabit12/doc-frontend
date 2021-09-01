import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { HP, WP } from '../../../config/layout';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';

const INPUT_HEIGHT = HP('20%');

const UsernameInput = ({ onClose, defaultValue, onSave }) => {
    const refInput = useRef(new Animated.Value(-50)).current;
    const usernameRef = useRef(null);
    const [keyboardVisible, setkeyboardVisible] = useState(false);
    const [username, setusername] = useState(defaultValue);
    const [error, seterror] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setkeyboardVisible(true); // or some other action
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setkeyboardVisible(false); // or some other action
            }
        );
        
        Animated.timing(refInput, {
            toValue: 1,
            useNativeDriver: true,
            duration: 200
        }).start(({ finished }) => {
            if(finished){
                usernameRef.current.focus();
            }
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const onSubmit = () => {
        if(!username) return seterror(true);

        Animated.timing(refInput, {
            toValue: -50,
            duration: 100,
            useNativeDriver: true
        }).start(({ finished }) => {
            if(finished){
                onSave({ username: username.trim() });
                onClose('username');
            }
        })
    }

    const translateY = refInput.interpolate({
        inputRange: [-40, -10, 1],
        outputRange: [INPUT_HEIGHT, 30, 0]
    })

    const transform = [{ translateY }];

    return(
        <Modal
            visible={true}
            transparent={true}
            statusBarTranslucent={true}
        >
            <KeyboardAvoidingView style={{flex: 1}} behavior='padding' enabled={keyboardVisible}>
                <TouchableOpacity style={{flex: 1}} activeOpacity={1}>
                    <BlurView intensity={100} tint='dark' style={{flex: 1}}>
                        <Animated.View style={{ ...styles.content, transform }}>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={styles.inputcontainer}>
                                    <Text style={{marginTop: 7, fontFamily: 'Poppins-Regular'}}>Enter your username</Text>
                                    <TextInput 
                                        placeholder='Username'
                                        style={{ ...styles.input, borderBottomColor: error ? 'red' : 'black'}}
                                        ref={usernameRef}
                                        value={username}
                                        selectTextOnFocus
                                        onChangeText={(text) => { setusername(text); seterror(false) }}
                                        autoCapitalize='none'
                                    />
                                    { error && <Text style={styles.error}>Username is required</Text>}
                                    <View 
                                        style={{
                                            alignItems: 'flex-end', 
                                            marginTop: error ? 15 : 25
                                        }}
                                    >
                                        <View style={styles.footer}>
                                            <TouchableOpacity activeOpacity={0.7} onPress={() => onClose('username')}>
                                                <Text style={{fontWeight: '700'}}>CANCEL</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.7} onPress={onSubmit}>
                                                <Text style={{color: '#0244b8', fontWeight: '700'}}>SAVE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </BlurView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        height: INPUT_HEIGHT,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    inputcontainer: {
        height: '100%',
        marginHorizontal: 10,
        paddingVertical: 5
    },
    input: {
        height: INPUT_HEIGHT * 0.3,
        borderBottomWidth: 0.7,
        marginTop: 10
    },
    footer: {
        flexDirection: 'row',
        width: WP('28%'),
        justifyContent: 'space-between'
    },
    error: {
        color: 'red',
        fontSize: RFValue(11)
    }
})

UsernameInput.propTypes = {
    onClose: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
}

export default UsernameInput;