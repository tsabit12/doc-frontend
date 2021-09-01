import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { AngleLeft, Pencil } from '../../icons';
import { GradientLayout, HeaderLayout } from '../components';
import defaultstyles from '../config/styles';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';
import service, { asseturl } from '../../config/service';
import { WP } from '../config/layout';
import { EmailInput, FullnameInput, UsernameInput } from './components';
import { updateSessions } from '../../actions/sessions';
import { setMessage } from '../../actions/message';
import { AlertNotifaction } from '../../components';

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

const Profile = ({ navigation, sessions, updateSessions, setMessage, messagenotification }) => {
    const [list, setlist] = useState([]);
    const [visible, setvisible] = useState({
        username: false,
        fullname: false,
        email: false
    })

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
            if(error.message){
                setMessage({ open: true, message: error.message });
            }else{
                setMessage({ open: true, message: 'Internal server error' });
            }
        }
    }

    return(
        <GradientLayout>
            <HeaderLayout 
                title={<Text style={styles.title}>Profile</Text>}
                lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>} 
            />
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
                contentContainerStyle={{flex: 1, marginTop: 10}}
                renderItem={({ item }) => (
                    <TouchableNativeFeedback
                        onPress={() => handleVisible(item.title)}
                        disabled={!item.allowedupdate}
                        background={TouchableNativeFeedback.Ripple('#E9E9E9', false)}
                    >
                        <View style={styles.list}>
                            <View>
                                <Text style={styles.listtitle}>{item.title}</Text>
                                <Text style={styles.listsubtitle}>{item.value}</Text>
                            </View>
                            { item.allowedupdate && <Pencil /> }
                        </View>
                    </TouchableNativeFeedback>
                )}
                ListHeaderComponent={
                    <View style={styles.imagecontainer}>
                        <Image 
                            source={{ uri: `${asseturl}/${sessions.image}`}}
                            style={styles.image}
                            resizeMode='cover'
                        />
                    </View>
                }
            />


            { messagenotification.open && <AlertNotifaction 
                message={messagenotification.message}
                onClose={() => setMessage({ open: false, message: ''})}
            /> }
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    title: { ...defaultstyles.headertitle, marginTop: 2 },
    list: {
        marginVertical: 5,
        padding: 10,
        paddingHorizontal: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listtitle: {
        textTransform: 'capitalize',
        color: '#FFF',
        fontSize: RFValue(14),
        fontFamily: 'Poppins-Bold'
    },
    listsubtitle: {
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12)
    },
    imagecontainer: {
        alignItems: 'center'
    },
    image: {
        width: WP('35%'),
        height: WP('35%'),
        overflow: 'hidden',
        borderRadius: WP('35%') / 2,
        backgroundColor: '#FFF'
    }
})

Profile.propTypes = {
    sessions: PropTypes.object.isRequired,
    updateSessions: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    messagenotification: PropTypes.object.isRequired
}

function mapStateToProps(state){
    return{
        sessions: state.sessions,
        messagenotification: state.message
    }
}

export default connect(mapStateToProps, { updateSessions, setMessage })(Profile);