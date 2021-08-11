import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WP, HP } from '../config/layout';

const HomeScreen = ({ navigation }) => {
    return(
        <LinearGradient
            style={styles.container}
            colors={['#FA6901', '#FA6901', '#D81919']}
        >
            <SafeAreaView style={styles.droidSafeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <ScrollView>
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
                                    <View style={styles.formcontrol}>
                                        <Text style={styles.label}>Username</Text>
                                        <TextInput 
                                            placeholder='Masukan username' 
                                            style={styles.input}
                                        />
                                    </View>
                                    <View style={styles.formcontrol}>
                                        <Text style={styles.label}>Password</Text>
                                        <TextInput 
                                            placeholder='Masukan password' 
                                            style={styles.input}
                                        />
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <LinearGradient 
                                            style={styles.buttongradient}
                                            colors={['#FA6901', '#D81919']}
                                            end={{ x: 1.6, y: 0.3 }}
                                        >
                                            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
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
    label: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16
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