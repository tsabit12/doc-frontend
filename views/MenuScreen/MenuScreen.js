import React, { useEffect, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { 
    CloseOutlined as CloseOutlinedIcon, 
    Search as SearchIcon,
    Book as BookIcon,
    Plus as PlusIcon
} from '../../icons';
import { GradientLayout, HeaderLayout } from '../components';
import { HP, WP } from '../config/layout';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import service, { asseturl } from '../../config/service';
import { AlertNotifaction, Loading } from '../../components';
import { setImage } from '../../actions/sessions';
import { setMessage } from '../../actions/message';

const menus = [
    { id: '1', title: 'Produksi Kiriman', subtitle: 'Pengawasan Produksi Kiriman', route: 'ProduksiKiriman'},
    { id: '5', title: 'Kiriman Jatuh Tempo', subtitle: '', route: 'JatuhTempo'},
    { id: '3', title: 'Kiriman Menginap', subtitle: 'Pengendalian Kiriman Potensi Menginap', route: 'Irregulaity' },
    { id: '4', title: 'Kiriman Terbuka', subtitle: 'Pengendalian Kiriman Terbuka', route: 'ProduksiKiriman'},
    { id: '6', title: 'Kiriman Irregularitas', subtitle: 'Pengendalian kiriman irregularitas', route: 'Irregulaity'},
]

const MenuScreen = ({ navigation, sessions, setImage, setMessage, messagenotification }) => {
    const { image } = sessions;
    const [loading, setloading] = useState(false);

    let imageurl = require('../../assets/images/profil.png');

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.listcontent} 
            activeOpacity={0.8}
            onPress={() => navigation.replace(item.route, { 
                title: item.title,
                subtitle: item.subtitle
            })}
        >
            <BookIcon />
            <View style={styles.list}>
                <Text style={styles.title}>{item.title}</Text>
                { item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : <React.Fragment /> }
            </View>
        </TouchableOpacity>
    );

    const handleChooseImage = async () => {
        if(Platform.OS !== 'web'){
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }else{
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [WP('25%'), WP('25%')],
                    quality: 1,
                });
              
                if (!result.cancelled) {
                    let localUri = result.uri;
                    let filename = localUri.split('/').pop();

                    // Infer the type of the image
                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;
                    
                    let formData = new FormData();
                    formData.append('photo', { uri: localUri, name: filename, type });
                    formData.append('userid', sessions.userid);
                    handleUpload(formData);
                }
            }
        }
    }

    const handleUpload = async (formData) => {
        setloading(true);

        try {
            const upload = await service.profile.uploadimage(formData);
            const { image } = upload;
            setImage(image);
        } catch (error) {
            if(error.global){
                setMessage({ open: true, message: error.global });
            }else{
                setMessage({ open: true, message: 'Unkonwn error'});
            }
        }

        setloading(false);
    }

    const header = () => (
        <React.Fragment>
            <HeaderLayout 
                title={ <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CloseOutlinedIcon />
                    </TouchableOpacity> }
            />
            <View style={styles.profile}>
                <View>
                    { image === null ? <Image 
                        source={imageurl}
                        style={styles.image}
                        resizeMode='cover'
                    /> : 
                    <Image 
                        source={{ uri: `${asseturl}/${sessions.image}` }}
                        style={styles.image}
                        resizeMode='cover'
                    /> }
                    <TouchableOpacity activeOpacity={0.7} style={styles.updateicon} onPress={handleChooseImage}>
                        <PlusIcon />
                    </TouchableOpacity>
                </View>
                <Text style={styles.fullname} numberOfLines={1}>{ sessions.fullname }</Text>
            </View>
            <View style={styles.center}>
                <View style={styles.inputbutton}>
                    <TextInput 
                        placeholder='Search menu...'
                        placeholderTextColor='#AEABAB'
                        style={{ height: '100%', flex: 1}}
                    />
                    <View style={{marginLeft: 5}}>
                        <SearchIcon />
                    </View>
                </View>
            </View>
        </React.Fragment>
    )

    return(
        <GradientLayout>
            <Loading open={loading} />
            { messagenotification.open && <AlertNotifaction 
                message={messagenotification.message}
                onClose={() => setMessage({ open: false, message: ''})}
            /> }
            <View style={styles.content}>
                <FlatList
                    data={menus}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={header}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={styles.footer}>
                        <Text style={styles.version}>Current version { Constants.manifest.version }</Text>
                    </View>}
                />
            </View>            
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    profile: {
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
    imagecontainer: {
    },
    fullname: {
        marginTop: 8,
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(20)
    },
    content: {
        flex: 1
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
        marginBottom: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    listcontent: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    list: {
        marginLeft: 10
    },
    title: {
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(15)
    },
    subtitle: {
        color: "#FFF",
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(11)
    },
    footer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    version: {
        color: '#FFF',
        textAlign: 'center'
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
    }
})

MenuScreen.propTypes = {
    sessions: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    setImage: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    messagenotification: PropTypes.object.isRequired,
}

function mapStateToProps(state){
    return {
        sessions: state.sessions,
        messagenotification: state.message
    }
}

export default connect(mapStateToProps, { setImage, setMessage })(MenuScreen);