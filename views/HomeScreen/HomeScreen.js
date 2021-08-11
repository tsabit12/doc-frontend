import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import React, { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WP, HP } from '../config/layout';
import { Eyeclose, Eyeopen } from '../../icons';
import { Loading } from '../../components';

const HomeScreen = ({ navigation }) => {
    const [seepassword, setseepassword] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [errors, seterrors] = useState({});
    const [field, setfield] = useState({username: '', password: ''});
    const [loading, setloading] = useState(false);

    const handleSubmitText = (name) => {
        const errors = validatekey(name);
        seterrors(errors);
        //make sure running when input not errors
        if(Object.keys(errors).length === 0){
            if(name === 'username') passwordRef.current.focus();
            if(name === 'password') handleSubmit();
        }
    }

    const handleChangeText = (value, name) => {
        seterrors(prev => ({ ...prev, [name]: undefined }));
        setfield(prev => ({ ...prev, [name]: value }));
    }

    const validatekey = (fieldname) => {
        const errors = {};
        if(!field[fieldname]) errors[fieldname] = `${fieldname} is required`;
        return errors;
    }

    const validate = (field) => {
        const errors = {};
        if(!field.username) errors.username = "username is required";
        if(!field.password) errors.password = "password is required";
        return errors;
    }

    const handleSubmit = () => {
        const errors = validate(field);
        seterrors(errors);

        if(Object.keys(errors).length === 0){
            setloading(true);

            setTimeout(() => {
                setloading(false);
            }, 1000);
        }
    }
    
    return(
        <LinearGradient
            style={styles.container}
            colors={['#FA6901', '#FA6901', '#D81919']}
        >
            <Loading open={loading} />
            <SafeAreaView style={styles.droidSafeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <ScrollView keyboardShouldPersistTaps={'handled'}>
                        <View style={{height: HP('92%'), justifyContent: 'space-around'}}>
                            <View style={styles.title}>
                                <Image 
                                    source={require('../../assets/logo.png')}
                                />
                                <Text style={styles.txt}>DIGITAL OPERATION {`\n`}CONTROL</Text>
                            </View>
                            <View style={styles.content}>
                                <View>
                                    <Text style={styles.signitext}>SIGN IN</Text>
                                </View>
                                <View>
                                    <View style={errors.username ? styles.formcontrolerror : styles.formcontrol}>
                                        <Text style={styles.label}>Username</Text>
                                        <TextInput 
                                            placeholder='Masukan username' 
                                            style={styles.input}
                                            ref={usernameRef}
                                            onSubmitEditing={() => handleSubmitText('username')}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            value={field.username}
                                            onChangeText={(text) => handleChangeText(text, 'username')}
                                        />
                                    </View>
                                    { errors.username && <Text style={styles.error}>{errors.username}</Text> }

                                    <View style={errors.password ? styles.formcontrolerror : styles.formcontrol}>
                                        <Text style={styles.label}>Password</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <TextInput 
                                                placeholder='Masukan password' 
                                                style={{...styles.input, flex: 1}}
                                                secureTextEntry={seepassword ? false : true }
                                                ref={passwordRef}
                                                autoCapitalize='none'
                                                onSubmitEditing={() => handleSubmitText('password')}
                                                onChangeText={(text) => handleChangeText(text, 'password')}
                                                value={field.password}
                                                returnKeyType='done'
                                            />
                                            <TouchableOpacity 
                                                style={{marginRight: 10, marginTop: -10}} 
                                                activeOpacity={0.8}
                                                onPress={() => setseepassword(!seepassword)}
                                            >
                                                { seepassword ? <Eyeopen /> : <Eyeclose /> }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    { errors.password && <Text style={styles.error}>{errors.password}</Text> }

                                    <View style={{alignItems: 'center'}}>
                                        <LinearGradient 
                                            style={styles.buttongradient}
                                            colors={['#FA6901', '#D81919']}
                                            end={{ x: 1.6, y: 0.3 }}
                                        >
                                            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit}>
                                                <Text style={styles.txtbtn}>SIGN IN</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Detail')}>
                                        <Text style={styles.link}>Forgot password?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView> 
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : Constants.statusBarHeight
    },
    txt: {
        fontFamily: 'Saira-Condensed',
        fontWeight: '400',
        lineHeight: 44,
        fontSize: 30,
        textAlign: 'center',
        color: "#FFFF"
    },
    title: {
        alignItems: 'center',
        height: HP('30%'),
        justifyContent: 'space-around',
        marginTop: HP('3%')
    },
    content: {
        flex: 1,
        backgroundColor: '#FFF',
        margin: 15,
        borderRadius: 30,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'space-around'
    },
    signitext: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontWeight: '700',
        fontSize: 26
    },
    form: {
        justifyContent: 'space-around',
        margin: 7,
        flex: 1
    },
    formcontrol: {
        padding: 5,
        paddingLeft: 10,
        paddingTop: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(170, 170, 170, 0.34)',
        marginTop: 14
    },
    formcontrolerror:{
        padding: 5,
        paddingLeft: 10,
        paddingTop: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(170, 170, 170, 0.34)',
        marginTop: 14,
        borderWidth: 1,
        borderColor: 'red'
    },
    label: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    },
    error: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: 'red',
        marginLeft: 10
    },
    input: {
        height: HP('5%'),
        marginTop: -10
    },
    buttongradient: {
        height: HP('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        borderRadius: 35,
        width: WP('70%'),
    },
    button: {
        flex: 1, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    txtbtn: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 20
    },
    link: {
        color: '#776F6F',
        fontSize: 17,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginTop: 15
    }
  });
  

export default HomeScreen;