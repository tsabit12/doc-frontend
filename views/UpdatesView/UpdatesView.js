import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Loading } from '../../components';
import { GradientLayout } from '../components';
import { WP } from '../config/layout';
import * as Updates from 'expo-updates';

const UpdatesView = () => {
    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState(false);

    const handleUpdate = async () => {
        setloading(true);

        try {
            await Updates.fetchUpdateAsync();
            setsuccess(true);
        } catch (error) {
            alert("Something wrong! please try again letter");
        }

        setloading(false);
    }

    const handleRestart = async () => {
        setloading(true);
        try {
            await Updates.reloadAsync();
        } catch (error) {
            alert("Something wrong! please try again letter");
        }

        setloading(false);
    }

    return(
        <GradientLayout>
            <Loading open={loading} />
            <View style={styles.center}>
                { !success ? 
                <React.Fragment>
                    <Text style={styles.title}>Update Available!</Text>
                    <Text style={styles.font}>This version is no longer supported. To continue please update the application first</Text>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleUpdate}>
                        <Text style={{fontFamily: 'Poppins-Regular'}}>Update</Text>
                    </TouchableOpacity>
                </React.Fragment> : 
                <React.Fragment>
                    <Text style={styles.title}>Update Success!</Text>
                    <Text style={styles.font}>Please confirm to restart application</Text>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleRestart}>
                        <Text style={{fontFamily: 'Poppins-Regular'}}>Restart Application</Text>
                    </TouchableOpacity>
                </React.Fragment> }
            </View>
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(16),
        color: '#FFF'
    },
    font: {
        fontFamily: 'Poppins-Regular',
        color: '#FFF',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FFF',
        padding: 10,
        width: WP('50%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 30,
        elevation: 2
    }
})

export default UpdatesView;