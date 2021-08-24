import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GradientLayout = ({ children }) => {
    return(
        <LinearGradient
            style={styles.container}
            colors={['#FA6901', '#FA6901', '#D81919']}
        >
            <SafeAreaView style={styles.droidSafeArea} edges={['top', 'left', 'right']}>
                { children }
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
        //paddingTop: Platform.OS === 'android' ? 25 : Constants.statusBarHeight,
        paddingBottom: -20
    }
})

GradientLayout.propTypes = {
    children: PropTypes.node,
}

export default GradientLayout;