import React from 'react';
import { HP } from '../../config/layout';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const HeaderLayout = ({ title, withicon=false, onPressIcon, icon=<React.Fragment /> }) => {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>
                { title }
            </Text>
            { withicon && <TouchableOpacity activeOpacity={0.6} onPress={onPressIcon}>
                { icon }
            </TouchableOpacity> }
        </View>
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
    title: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(19)
    }
});

HeaderLayout.propTypes = {
    title: PropTypes.node.isRequired,
    withicon: PropTypes.bool,
    onPressIcon: function(props, propName, componentName) {
        if ((props['withicon'] == true && (props[propName] == undefined || typeof(props[propName]) != 'function'))) {
            return new Error('Please provide a onPressIcon function!');
        }
    },
    icon: function(props, propName, componentName) {
        if ((props['withicon'] == true && (props[propName] == undefined || typeof(props[propName]) != 'object'))) {
            return new Error('Please provide a icon component');
        }
    }
}

export default HeaderLayout;