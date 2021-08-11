import React from 'react';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import { Modal, StyleSheet, View } from 'react-native';

const Loading = props => {
    const { open } = props;
    
    return(
        <Modal 
            visible={open}
            animationType='fade'
            transparent
            statusBarTranslucent={true}
        >
            <View style={styles.modalcontainer}>
                <LottieView 
                    style={{
                        width: 400,
                        height: 400
                    }}
                    source={require('../../assets/lotties/loading.json')}
                    autoPlay
                    loop
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalcontainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

Loading.propTypes = {
    open: PropTypes.bool.isRequired,
}

export default Loading;