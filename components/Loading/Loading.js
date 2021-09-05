import React from 'react';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

const Loading = props => {
    const { open, text } = props;
    
    return(
        <Modal 
            visible={open}
            animationType='fade'
            transparent
            statusBarTranslucent={true}
        >
            <BlurView tint='light' intensity={95} style={[StyleSheet.absoluteFillObject, styles.modalcontainer]}>
                <LottieView 
                    style={{
                        width: 400,
                        height: 400
                    }}
                    source={require('../../assets/lotties/loading.json')}
                    autoPlay
                    loop
                />
                { text && <View style={styles.footer}>
                    <Text style={styles.textloading}>{ text }</Text>
                </View> }
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalcontainer: {
        // backgroundColor: 'rgba(255, 255, 255, 0.85)',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        //backgroundColor: '#FFF',
        // padding: 8
    },
    textloading: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    }
})

Loading.propTypes = {
    open: PropTypes.bool.isRequired,
    text: PropTypes.string,
}

export default Loading;