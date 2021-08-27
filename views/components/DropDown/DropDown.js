import React, { useRef, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { AngleDown } from '../../../icons';
import { HP, WP } from '../../config/layout';

const INPUT_HEIGHT = HP('24%');

const DropDown = ({ options, indexvalue, onChoose }) => {
    const [visible, setvisible] = useState(false);
    const inputposition = useRef(new Animated.Value(-100)).current;

    const handleOpen = () => {
        setvisible(true);
        Animated.timing(inputposition, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const handleClose = (index) => {
        if(index){
            const indexvalues = index.split('-'); //add separtor to handle 0
            onChoose(Number(indexvalues[1]));
        }
        
        Animated.timing(inputposition, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true
        }).start(({ finished }) => { 
            if(finished){ 
                setvisible(false)
            } 
        })
    }

    const inputRange = [-90, -40, 1];
    const translateY = inputposition.interpolate({
        inputRange,
        outputRange: [INPUT_HEIGHT, 100, 0]
    })

    return(
        <React.Fragment>
            <TouchableOpacity style={styles.buttonoptions} activeOpacity={0.7} onPress={handleOpen}>
                <Text style={styles.textoptions}>
                    {options[indexvalue].title}
                </Text>
                <AngleDown size='small' />
            </TouchableOpacity>
            <Modal 
                visible={visible} 
                animationType='fade'
                statusBarTranslucent={true}
                transparent={true}
                onRequestClose={() => handleClose()}
            >
                <TouchableOpacity onPress={() => handleClose()} activeOpacity={1} style={{flex: 1}}>
                    <View style={styles.background} />
                    <TouchableOpacity activeOpacity={1} style={styles.container}>
                        <Animated.View style={{ ...styles.content, transform: [{ translateY } ]}}>
                            <View style={styles.header}>
                                <Text style={{color: '#FFF', fontFamily: 'Poppins-Bold'}}>Select Options</Text>
                            </View>
                            <View style={styles.listcontainer}>
                                { options.map((row, index) => 
                                <TouchableOpacity 
                                    key={index} 
                                    style={indexvalue === index ? styles.itemsactive : styles.items} 
                                    activeOpacity={0.8}
                                    onPress={() => handleClose(`seprator-${index}`)}
                                >
                                    <Text 
                                        style={{...styles.textitems, color: indexvalue === index ? '#FFF' : '#FA6901'}}
                                    >
                                        {row.title}
                                    </Text>
                                </TouchableOpacity>)}
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </React.Fragment>
    )
}

DropDown.defaultProps = {
    indexvalue: 0
}

DropDown.propTypes = {
    indexvalue: PropTypes.number,
    options: PropTypes.array.isRequired,
    onChoose: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    buttonoptions: {
        backgroundColor: '#FFF',
        width: '100%',
        borderBottomWidth: 0.4,
        borderColor: '#ADADAD',
        paddingLeft: 10,
        paddingRight: 10,
        height: HP('5%'),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textoptions: {
        color: '#ADADAD',
        fontFamily: 'Poppins-Regular',
        marginTop: 3
    },
    background: {
        backgroundColor: '#0a0a0a',
        flex: 1,
        opacity: .6
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        //height: INPUT_HEIGHT
    },
    content: {
        backgroundColor: '#FFF',
        flex: 1,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    header: {
        backgroundColor: '#FA6901',
        height: HP('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    listcontainer: {
        flexDirection: 'row',
        padding: 5,
        flex: 1,
        flexWrap: 'wrap'
    },
    items: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: HP('6%'),
        width: HP('15.5%'),
        margin: 5,
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        borderWidth: 0.8,
        borderColor: '#FA6901'
    },
    itemsactive: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: HP('6%'),
        width: HP('15.5%'),
        margin: 5,
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#FA6901'
    },
    textitems: {
        textAlign: 'center', 
        color: '#FA6901', 
        width: '100%'
    }
})

export default DropDown;