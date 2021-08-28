import React, { useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GradientLayout, HeaderLayout } from '../components';
import PropTypes from 'prop-types';
import defaultstyles from '../config/styles';
import { AngleLeft, CollapseDown, CollapseUp } from '../../icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { rupiahNumber } from '../../utils';

const TableProduksiKiriman = ({ navigation, route }) => {
    const [active, setActive] = useState([]);
   // const collapseValue = useRef(new Animated.Value(-100)).current;

    const { data } = route.params;

    const handleCollapse = (isActive, index) => {
        if(isActive){
            setActive(active.filter(row => row !== index))
        }else{
            // collapseValue.setValue(-100);

            // Animated.timing(collapseValue, {
            //     toValue: 1 ,
            //     useNativeDriver: true,
            //     duration: 300
            // }).start();

            setActive(prev => [...prev, index])}
    }

    const renderItem = ({ item, index }) => {
        // const translateY = collapseValue.interpolate({
        //     inputRange: [(index - 5) * 50, 1],
        //     outputRange: [(index -2) * 50, 0],
        //     extrapolate: 'clamp'
        // });

        let activeItem = active.includes(index);

        return(
            <View style={styles.row}>
                <View style={styles.tr}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => handleCollapse(activeItem, index)}>
                        { activeItem ?  <CollapseUp /> : <CollapseDown /> }
                    </TouchableOpacity>
                    <Text style={{ ...styles.td, flex: 1 }}>Resi/Connote</Text>
                    <Text style={{ ...styles.td, color: '#A7A6A6'}}>{item.connote}</Text>
                </View>

                { activeItem && <Animated.View style={{...styles.subtr }}>
                    <View style={styles.tr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Asal kantor kirim</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{item.asal_kantor_kirim}</Text>
                    </View>
                    <View style={styles.tr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Petugas</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{item.nama_petugas}</Text>
                    </View>
                    <View style={{ ...styles.tr, marginTop: 5 }}>
                        <Text style={{ ...styles.td, flex: 1 }}>Layanan</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{item.layanan}</Text>
                    </View>
                    <View style={{ ...styles.tr, marginTop: 5 }}>
                        <Text style={{ ...styles.td, flex: 1 }}>Berat</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{rupiahNumber(item.berat)}</Text>
                    </View>
                    <View style={{ ...styles.tr, marginTop: 5 }}>
                        <Text style={{ ...styles.td, flex: 1 }}>Nama Pengirim</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{item.nama_pengirim}</Text>
                    </View>
                    <View style={{ ...styles.tr, marginTop: 5 }}>
                        <Text style={{ ...styles.td, flex: 1 }}>Ongkir</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{rupiahNumber(item.Ongkir)}</Text>
                    </View>
                    <View style={{ ...styles.tr, marginTop: 5 }}>
                        <Text style={{ ...styles.td, flex: 1 }}>PPN</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{rupiahNumber(item.ppn)}</Text>
                    </View>
                    <View style={{ ...styles.tr, marginTop: 5 }}>
                        <Text style={{ ...styles.td, flex: 1 }}>Total</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{rupiahNumber(item.total)}</Text>
                    </View>
                </Animated.View> }
            </View>
        )
    }

    return(
        <GradientLayout>
            <HeaderLayout 
                title={<Text style={styles.title}>Detail produksi kiriman</Text>}
                lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>} 
            />
            <View style={styles.content}>
                <FlatList 
                    data={data}
                    keyExtractor={(item) => item.connote}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    title: { ...defaultstyles.headertitle, marginTop: 5 },
    content: {
        flex: 1,
        marginTop: 8,
        backgroundColor: '#FFF'
    },
    row: {
        marginVertical: 5,
        borderBottomWidth: 0.8,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: '#A7A6A6'
    },
    tr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    td: {
        marginHorizontal: 10,
        fontSize: RFValue(12), 
        marginTop: -5
    },
    subtr: {
        marginLeft: 25, //icon size
    }
})

TableProduksiKiriman.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            data: PropTypes.array.isRequired,
        }).isRequired,
    }).isRequired,
}

export default TableProduksiKiriman;