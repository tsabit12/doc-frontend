import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AngleLeft } from '../../icons';
import { DateInput, GradientLayout, HeaderLayout, OfficeDropdown, SliderAnimation } from '../components';
import defaultstyles from '../config/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AlertNotifaction, Loading } from '../../components';
import { connect } from 'react-redux';
import { setMessage } from '../../actions/message';

const slider = [
    { title: 'left-spacer'},
    { title: 'ABC', 'jumlah': 10 }, 
    { title: 'BCA', jumlah: 20 },
    { title: 'CDA', 'jumlah': 10 }, 
    { title: 'DAC', jumlah: 20 },
    { title: 'ZAC', jumlah: 20 },
    { title: 'ZAD', jumlah: 20 },
    { title: 'ZAZ', jumlah: 20 },
    { title: 'right-spacer'}
];

const KirimanMenginap = ({ navigation, setMessage, messagenotification, route }) => {
    const { params } = route;

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
            { messagenotification.open && <AlertNotifaction 
                message={messagenotification.message}
                onClose={() => setMessage({ open: false, message: ''})}
            /> }

            <HeaderLayout 
                title={
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>{params.title}</Text>
                        <Text style={styles.subtitle} numberOfLines={1}>{params.subtitle}</Text>
                    </View>
                }
                lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>} 
            />
            <Loading open={loading} />
            <View style={styles.content}>
                <DateInput onDateChoosed={search}>
                    <View style={{marginTop: 11}}>
                        <OfficeDropdown 
                            onError={(message) => setMessage({ open: true, message })}
                        />
                        <SliderAnimation listitem={slider} />
                    </View>
                    <View style={styles.card}>
                        <Text>Hello world</Text>
                        <Text>Hello world</Text>
                        <Text>Hello world</Text>
                        <Text>Hello world</Text>
                        <Text>Hello world</Text>
                        <Text>Hello world</Text>
                    </View>
                </DateInput>
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
    },
    card: {
        backgroundColor: '#FFF', 
        marginLeft: -15, 
        marginRight: -15,
        flex: 1
    }
})

KirimanMenginap.propTypes = {
    navigation: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
    messagenotification: PropTypes.object.isRequired,
}


function mapStateToProps(state){
    return {
        messagenotification: state.message
    }
}

export default connect(mapStateToProps, { setMessage })(KirimanMenginap);