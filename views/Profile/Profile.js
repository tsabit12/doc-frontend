import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { CameraIcon, Pencil, Plus } from '../../icons';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';
import service, { asseturl } from '../../config/service';
import { HP, WP } from '../config/layout';
import { EmailInput, FullnameInput, UsernameInput } from './components';
import { updateSessions, setImage, logout } from '../../actions/sessions';
import { setMessage } from '../../actions/message';
import { Loading } from '../../components';
import * as ImagePicker from 'expo-image-picker';

const getAllowedUpdate = (key) => {
    switch (key) {
        case 'username':
            return true;
        case 'fullname':
            return true;
        case 'email':
            return true;
        default:
            return false
    }
}

const Profile = ({ sessions, updateSessions, setMessage, setImage, logout }) => {
    const [list, setlist] = useState([]);
    const [visible, setvisible] = useState({
        username: false,
        fullname: false,
        email: false
    })
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if(Object.keys(sessions).length > 0){
            const list = [];
            const ordered = Object.keys(sessions).sort().reduce(
                (obj, key) => { 
                  obj[key] = sessions[key]; 
                  return obj;
                }, 
                {}
            );

            Object.entries(ordered).forEach(row => {
                const key = row[0];
                const value = row[1];
                if(key == 'username' || key === 'fullname' || key === 'email' || key === 'officeid' || key === 'officename' || key === 'roledescription'){
                    list.push({
                        title: key,
                        value,
                        allowedupdate: getAllowedUpdate(key)
                    })
                }
            })

            setlist(list);
        }
    }, [sessions]);

    const handleVisible = (key) => setvisible(prev => ({ 
        ...prev,
        [key]: !prev[key]
    }))

    const handleUpdate = async (field) => {
        const payload = {
            ...sessions,
            ...field
        }

        updateSessions(payload);

        try {
            await service.profile.update(payload);
        } catch (error) {
            console.log(error);
            if(error.message){
                setMessage({ open: true, message: error.message });
            }else{
                setMessage({ open: true, message: 'Internal server error' });
            }
        }
    }

    const handleLogout = () => {
        Alert.alert('Are you sure you want to logout?', 'After logout.. you may not receive the notifications we send', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'YES', onPress: () => onLogout() }, 
        ]);
    }

    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem('sessions');
            logout();
        } catch (error) {
            alert("Logout failed");
        }
    }

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
            const { image } = await service.profile.uploadimage(formData);
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
        <View style={{flex: 1, backgroundColor: '#FA6901'}} edges={['top', 'left', 'right']}>
            <Loading open={loading} />
            { visible.username && 
                <UsernameInput 
                    onClose={handleVisible} 
                    defaultValue={sessions.username} 
                    onSave={handleUpdate}
                /> }

            { visible.fullname && 
                <FullnameInput 
                    onClose={handleVisible} 
                    defaultValue={sessions.fullname} 
                    onSave={handleUpdate}
                /> }

            { visible.email && 
                <EmailInput 
                    onClose={handleVisible} 
                    defaultValue={sessions.email} 
                    onSave={handleUpdate}
                /> }

            <FlatList 
                data={list}
                keyExtractor={item => item.title}
                contentContainerStyle={{flexGrow: 1, backgroundColor: '#FFF'}}
                renderItem={({ item }) => (
                    <TouchableNativeFeedback
                        onPress={() => handleVisible(item.title)}
                        disabled={!item.allowedupdate}
                        background={TouchableNativeFeedback.Ripple('#6e6d6d', false)}
                    >
                        <View style={styles.list}>
                            <View>
                                <Text style={styles.listtitle}>{item.title}</Text>
                                <Text style={styles.listsubtitle}>{item.value}</Text>
                            </View>
                            { item.allowedupdate && <Pencil color='#6e6d6d' /> }
                        </View>
                    </TouchableNativeFeedback>
                )}
                ListHeaderComponent={
                    <View style={styles.imagecontainer}>
                        <View>
                            <Image 
                                source={{ uri: `${asseturl}/${sessions.image}`}}
                                style={styles.image}
                                resizeMode='cover'
                            />
                            <TouchableOpacity style={styles.updateicon} activeOpacity={1} onPress={handleChooseImage}>
                                <CameraIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                        <TouchableOpacity style={styles.btnlogout} activeOpacity={0.8} onPress={handleLogout}>
                            <Text style={{color: '#FA6901'}}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginVertical: 5,
        paddingHorizontal: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: HP('7%')
    },
    listtitle: {
        textTransform: 'capitalize',
        color: '#000',
        fontSize: RFValue(14),
        fontFamily: 'Poppins-Bold'
    },
    listsubtitle: {
        color: '#6e6d6d',
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12)
    },
    imagecontainer: {
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 10,
        backgroundColor: '#FA6901',
        height: HP('32%'),
        justifyContent: 'center'
    },
    image: {
        width: WP('45%'),
        height: WP('45%'),
        overflow: 'hidden',
        borderRadius: WP('45%') / 2,
        backgroundColor: '#FFF'
    },
    btnlogout: {
        width: WP('50%'),
        height: HP('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#FA6901'
    },
    updateicon: {
        height: WP('12%'), 
        width: WP('12%'),
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: WP('12%') / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            width: 3,
            height: 3
        }
    }
})

Profile.propTypes = {
    sessions: PropTypes.object.isRequired,
    updateSessions: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setImage: PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return{
        sessions: state.sessions
    }
}

export default connect(mapStateToProps, { updateSessions, setMessage, logout, setImage })(Profile);