import React from 'react';
import { HP } from '../../config/layout';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const HeaderLayout = ({ title, withicon=false, onPressIcon, icon=<React.Fragment />, lefticon=undefined }) => {
    return(
        <View style={styles.header}>
            <View style={styles.leftheader}>
                { lefticon && <View style={{marginRight: 10}}>{ lefticon }</View> }
                { title }
            </View> 

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
    leftheader: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
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
    },
    lefticon: PropTypes.node,
}

export default HeaderLayout;