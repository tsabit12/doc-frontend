import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { HP, WP } from '../../../config/layout';
import { RFValue } from 'react-native-responsive-fontsize';
import { 
    Pencil as PencilIcon, 
    Plus as PlusIcon, 
    Search as SearchIcon 
} from '../../../../icons';

const ImageSource = () => (
    <Image 
        source={require('../../../../assets/images/profil.png')}
        style={styles.image}
        resizeMode='cover'
    />
)

const ImageUri = ({ url }) => (
    <Image 
        source={{ uri: url }}
        style={styles.image}
        resizeMode='cover'
    />
)

ImageUri.propTypes = {
    url: PropTypes.string.isRequired
}

const MenuHeader = ({ imageUri, fullname, onChangeImage, onSearch, onPressUpdateProfile }) => {
    const [search, setsearch] = useState('');

    useEffect(() => {
        const timeId = setTimeout(() => {
            onSearch(search);
        }, 500);

        return () => clearTimeout(timeId);
    }, [search]);

    return(
        <View style={styles.content}>
            <View>
                { imageUri === null ? <ImageSource /> : <ImageUri url={imageUri} /> }
                <TouchableOpacity activeOpacity={0.7} style={styles.updateicon} onPress={onChangeImage}>
                    <PlusIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.fullnamecontainer}>
                <Text style={styles.fullname} numberOfLines={1}>{ fullname }</Text>
                <TouchableOpacity style={styles.updateprofileicon} activeOpacity={0.6} onPress={onPressUpdateProfile}>
                    <PencilIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.center}>
                <View style={styles.inputbutton}>
                    <TextInput 
                        placeholder='Search menu...'
                        placeholderTextColor='#AEABAB'
                        style={{ height: '100%', flex: 1}}
                        value={search}
                        onChangeText={(text) => setsearch(text)}
                    />
                    <View style={{marginLeft: 5}}>
                        <SearchIcon />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    image: {
        width: WP('25%'),
        height: WP('25%'),
        overflow: 'hidden',
        borderRadius: WP('25%') / 2,
        backgroundColor: '#FFF'
    },
    fullnamecontainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullname: {        
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(20),
        marginLeft: 10
    },
    updateicon: {
        height: WP('6%'), 
        width: WP('6%'),
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 7,
        right: 0,
        borderRadius: WP('7%') / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    updateprofileicon: {
        marginLeft: 5
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputbutton: {
        backgroundColor: '#FFF',
        height: HP('6%'),
        alignItems: 'center',
        flexDirection: 'row',
        width: WP('75%'),
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 4,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 3
        }
    },
    textlogout: {
        fontFamily: 'Poppins-Regular',
        //letterSpacing: 1,
        color: '#FFF',
        opacity: .7
    }
})

MenuHeader.defaultProps = {
    imageUri: null
}

MenuHeader.propTypes = {
    imageUri: PropTypes.string,
    fullname: PropTypes.string.isRequired,
    onChangeImage: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onPressUpdateProfile: PropTypes.func.isRequired
}

export default MenuHeader;