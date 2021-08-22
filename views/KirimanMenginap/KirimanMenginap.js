import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AngleLeft } from '../../icons';
import { DateInput, GradientLayout, HeaderLayout } from '../components';
import defaultstyles from '../config/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Loading } from '../../components';

const KirimanMenginap = ({ navigation }) => {
    const [loading, setloading] = useState(false);
    const [daterange, setdaterange] = useState({
        startdate: '',
        enddate: ''
    })

    const search = (daterange) => {
        setloading(true);
        setdaterange(daterange);

        setTimeout(() => {
            setloading(false);
        }, 1000);
    }

    return(
        <GradientLayout>
            <HeaderLayout 
                title={
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>Kiriman Menginap</Text>
                        <Text style={styles.subtitle} numberOfLines={1}>Pengendalian kiriman potensi menginap hahe ash asj as</Text>
                    </View>
                }
                lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>} 
            />
            <Loading open={loading} />
            <View style={styles.content}>
                <View style={{position: 'absolute', top: 0 }}>
                    <View style={{zIndex: 2}}>
                        <DateInput onDateChoosed={search} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{marginTop: 15, color: '#FFF'}}>
                            The current value is between {daterange.startdate} and {daterange.enddate}
                        </Text>
                    </View>
                </View>
            </View>
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    title: { ...defaultstyles.headertitle },
    subtitle: { ...defaultstyles.headersubtitle, marginTop: Platform.OS === 'ios' ? -4 : -10 }, 
    content: {
        flex: 1,
        marginTop: 8,
        marginLeft: 15,
        marginRight: 15
    }
})

KirimanMenginap.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default KirimanMenginap;