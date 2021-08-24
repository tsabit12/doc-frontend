import React, { useRef } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AngleLeft } from '../../icons';
import { DateInput, GradientLayout, HeaderLayout, OfficeDropdown } from '../components';
import defaultstyles from '../config/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AlertNotifaction, Loading } from '../../components';
import { connect } from 'react-redux';
import { setMessage } from '../../actions/message';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACE_ITEM_SIZE = (width - ITEM_SIZE) / 2;

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

const KirimanMenginap = ({ navigation, setMessage, messagenotification }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

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

    const renderSlider = ({ item, index }) => {
        if(!item.jumlah){
            return (
                <View 
                    style={{
                        width: SPACE_ITEM_SIZE, 
                        // backgroundColor: 'red'
                    }} 
                />
            )
        }

        const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
        ]
        const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [10, 0, 10]
        })
        
        return(
            <View style={{width: ITEM_SIZE, marginTop: 15}}>
                <Animated.View style={{ transform: [{ translateY }]  }}>
                    <LinearGradient 
                        style={styles.sliderlist}
                        colors={['#FF7713', '#D81919']}
                        end={{ x: 1.6, y: 0.3 }}
                    >
                        <Text>{item.title}</Text>
                        <Text>{item.title}</Text>
                        <Text>{item.title}</Text>
                    </LinearGradient>
                </Animated.View>
            </View>
        )
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
                <DateInput onDateChoosed={search}>
                    <View style={{marginTop: 11}}>
                        <OfficeDropdown 
                            onError={(message) => setMessage({ open: true, message })}
                        />
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15, marginRight: 3}}>
                            <TouchableOpacity activeOpacity={0.8}>
                                <Text style={styles.viewdetails}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft: -15, marginRight: -15, marginTop: -5}}>
                            <Animated.FlatList 
                                onScroll={Animated.event(
                                    [{ nativeEvent: {contentOffset: {x: scrollY} } }],
                                    { useNativeDriver: true }
                                )}
                                snapToInterval={ITEM_SIZE}
                                data={slider}
                                renderItem={renderSlider}
                                keyExtractor={(item) => item.title}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                decelerationRate={0}
                                bounces={false}
                                contentContainerStyle={{alignItems: 'center', paddingBottom: 40}}
                                scrollEventThrottle={16}
                                ref={flatListRef}
                                onContentSizeChange={() => 
                                    flatListRef.current.scrollToOffset({ offset: 300, animated: true }) //300 in second index with centered
                                }
                            />
                        </View>
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
    sliderlist: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: SPACING * 2,
        marginHorizontal: SPACING,
        elevation: 3,
        shadowColor: 'green',
        shadowOffset: { width: 20, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: 'red'
    },
    viewdetails: {
        fontFamily: 'Poppins-Bold',
        color: 'black',
        opacity: .5
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