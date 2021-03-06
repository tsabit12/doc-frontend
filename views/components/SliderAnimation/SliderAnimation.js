import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { rupiahNumber } from '../../../utils';
import { HP } from '../../config/layout';

const { width } = Dimensions .get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACE_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const SliderAnimation = ({ listitem }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    const renderSlider = ({ item, index }) => {
        if(!item.jumlah){
            return (
                <View 
                    style={{
                        width: SPACE_ITEM_SIZE
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
                    <View style={styles.shadow}>
                        <LinearGradient 
                            style={styles.sliderlist}
                            colors={['#FF7713', '#D81919']}
                            end={{ x: 1.6, y: 0.3 }}
                        >
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subtitle} numberOfLines={2}>
                                <Text style={styles.number}>{ rupiahNumber(item.jumlah) } </Text>
                                {item.satuan}
                            </Text>
                        </LinearGradient>
                    </View>
                </Animated.View>
            </View>
        )
    }

    return(
        <React.Fragment>
            <View style={{marginLeft: -15, marginRight: -15, marginTop: 7 }}>
                <Animated.FlatList 
                    onScroll={Animated.event(
                        [{ nativeEvent: {contentOffset: {x: scrollY} } }],
                        { useNativeDriver: true }
                    )}
                    snapToInterval={ITEM_SIZE}
                    data={listitem}
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
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    sliderlist: {
        justifyContent: 'center',
        borderRadius: 10,
        padding: SPACING * 2,
        height: HP('15%'),
        elevation: 3
    },
    shadow: {
        marginHorizontal: SPACING,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 2
        }
    },  
    link: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginTop: 15, 
        marginRight: 3
    },
    viewdetails: {
        fontFamily: 'Poppins-Bold',
        color: 'black',
        opacity: .5
    },
    title: {
        fontFamily: 'Poppins-Regular',
        color: '#FFF',
        fontSize: RFValue(15)
    },
    subtitle: {
        fontFamily: 'Poppins-Regular',
        color: '#FFF',
        fontSize: RFValue(14)
    },
    number: {
        fontSize: RFValue(20),
        //lineHeight: 26,
        fontFamily: 'Poppins-Bold',
    }
})

SliderAnimation.propTypes = {
    listitem: PropTypes.array.isRequired
}

export default SliderAnimation;