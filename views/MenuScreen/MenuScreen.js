import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, BackHandler, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { GradientLayout } from '../components';
import { HP, WP } from '../config/layout';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import service, { asseturl } from '../../config/service';
import { AlertNotifaction, Loading } from '../../components';
import { setImage, logout } from '../../actions/sessions';
import { setMessage } from '../../actions/message';
import { MenuHeader } from './components';
import { StackActions, useIsFocused } from '@react-navigation/native';
import { searchMenu, getmenu } from '../../actions/menus';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../../utils';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const MenuScreen = ({ 
    navigation, 
    sessions, 
    setImage, 
    setMessage, 
    messagenotification, 
    logout,
    searchMenu,
    menus,
    getmenu
}) => {
    const [loading, setloading] = useState(false);
    const [menufetched, setmenufetched] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            try {
                await getmenu({ roleid: sessions.roleid });
                //console.log(menusvalues);
            } catch (error) {
                if(error.message){
                    setMessage({ open: true, message: error.message });
                }else{
                    setMessage({ open: true, message: 'Unknown error' });
                }
            }
            setmenufetched(true);
        })();
    }, []);

    useEffect(() => {
        if(menufetched){
            registerForPushNotificationsAsync().then(async token => {
                const payload = {
                    userid: sessions.userid,
                    token
                }
    
                try {
                    await service.profile.addToken(payload);
                } catch (error) {
                    if(error.message){
                        setMessage({ open: true, message: error.message });
                    }else{
                        setMessage({ open: true, message: 'Unknown error' });
                    }
                }
    
                //Notifications.getNotificationCategoriesAsync().then(res => console.log({ res}))
            })
            .catch(error => {
                if(error.msg){
                    setMessage({ open: true, message: error.msg });
                }else{
                    setMessage({ open: true, message: 'Cannote send notification' });
                }
            })   
        }
    }, [menufetched])

    useEffect(() => {
        const backAction = () => {
            if(isFocused){
                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                      text: 'Cancel',
                      onPress: () => null,
                      style: 'cancel',
                    },
                    { text: 'YES', onPress: () => exitApp() }, 
                ]);
            }else{
                const popActions = StackActions.pop(1);
                navigation.dispatch(popActions);
            }

            return true;
        };
      
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isFocused]);

    const exitApp = () => {
        BackHandler.exitApp();
        // logout();
    }

    const handlePressMenu = (item) => {
        if(item.id === '7'){
            handleLogout();
        }else{
            navigation.navigate(item.route, { 
                title: item.title,
                subtitle: item.subtitle
            })
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.listcontent} 
            activeOpacity={0.8}
            onPress={() => handlePressMenu(item)}
        >
            { item.icon }
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
                    contentContainerStyle={{flexGrow: 1}}
                    ListHeaderComponent={ 
                        <MenuHeader 
                            fullname={sessions.fullname}
                            imageUri={sessions.image === null ? null : `${asseturl}/${sessions.image}`}
                            onChangeImage={handleChooseImage}
                            onSearch={searchMenu}
                            onPressUpdateProfile={() => navigation.navigate('Profile')}
                            onClickLogout={handleLogout}
                        /> 
                    }
                    showsVerticalScrollIndicator={false}
                    ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <Text style={styles.version}>Current version { Constants.manifest.version }</Text>
                        </View>
                    }
                    ListEmptyComponent={<View style={styles.emptycontainer}>
                        <Text style={styles.subtitle}>Menu not found</Text>
                    </View>}
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
        alignItems: 'center',
        marginBottom: 10
    },
    version: {
        color: '#FFF',
        textAlign: 'center'
    },
    emptycontainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flexGrow: 4
    }
})

MenuScreen.propTypes = {
    sessions: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    setImage: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    messagenotification: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    searchMenu: PropTypes.func.isRequired,
    getmenu: PropTypes.func.isRequired,
}

const filterMenu = (menus) => {
    const query = menus.param ? menus.param.toLowerCase() : '';

    return menus.data.filter(menu => menu.title.toLowerCase().indexOf(query) >= 0);
}

function mapStateToProps(state){
    const searchData = filterMenu(state.menus);
    
    return {
        sessions: state.sessions,
        messagenotification: state.message,
        menus: searchData
    }
}

export default connect(mapStateToProps, { 
    setImage, 
    setMessage, 
    logout, 
    searchMenu,
    getmenu
})(MenuScreen);