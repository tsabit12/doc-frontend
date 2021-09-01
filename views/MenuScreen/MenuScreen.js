import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Book as BookIcon } from '../../icons';
import { GradientLayout } from '../components';
import { WP } from '../config/layout';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import service, { asseturl } from '../../config/service';
import { AlertNotifaction, Loading } from '../../components';
import { setImage } from '../../actions/sessions';
import { setMessage } from '../../actions/message';
import { MenuHeader } from './components';

const menus = [
    { id: '1', title: 'Produksi Kiriman', subtitle: 'Pengawasan Produksi Kiriman', route: 'ProduksiKiriman'},
    { id: '5', title: 'Kiriman Jatuh Tempo', subtitle: '', route: 'JatuhTempo'},
    { id: '3', title: 'Kiriman Menginap', subtitle: 'Pengendalian Kiriman Potensi Menginap', route: 'Irregulaity' },
    { id: '4', title: 'Kiriman Terbuka', subtitle: 'Pengendalian Kiriman Terbuka', route: 'ProduksiKiriman'},
    { id: '6', title: 'Kiriman Irregularitas', subtitle: 'Pengendalian kiriman irregularitas', route: 'Irregulaity'}
]

const MenuScreen = ({ navigation, sessions, setImage, setMessage, messagenotification }) => {
    const [loading, setloading] = useState(false);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.listcontent} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.route, { 
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
                    ListHeaderComponent={ 
                        <MenuHeader 
                            fullname={sessions.fullname}
                            imageUri={sessions.image === null ? null : `${asseturl}/${sessions.image}`}
                            onChangeImage={handleChooseImage}
                        /> 
                    }
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <Text style={styles.version}>Current version { Constants.manifest.version }</Text>
                        </View>
                    }
                />
            </View>            
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    version: {
        color: '#FFF',
        textAlign: 'center'
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