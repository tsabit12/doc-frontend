import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import GradientLayout from '../config/GradientLayout';
import { HP } from '../config/layout';
import { Menu as MenuIcon } from '../../icons';

const HomeScreen = () => {
    return(
        <GradientLayout>
            <View style={styles.header}>
                <Text style={styles.headertitle}>Home</Text>
                <TouchableOpacity activeOpacity={0.6}>
                    <MenuIcon />
                </TouchableOpacity>
            </View>
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    header: {
        height: HP('8%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    headertitle: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(19)
    }
})

export default HomeScreen;