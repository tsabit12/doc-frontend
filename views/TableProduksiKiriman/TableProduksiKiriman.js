import React, { useState } from 'react';
import { Animated, FlatList, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { GradientLayout, HeaderLayout } from '../components';
import PropTypes from 'prop-types';
import defaultstyles from '../config/styles';
import { AngleLeft, CollapseDown, CollapseUp } from '../../icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { rupiahNumber } from '../../utils';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const TableProduksiKiriman = ({ navigation, route }) => {
    const [active, setActive] = useState([]);
    const { data } = route.params;

    const handleCollapse = (isActive, index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if(isActive){
            setActive(active.filter(row => row !== index))
        }else{
            setActive(prev => [...prev, index])}
    }

    const renderItem = ({ item, index }) => {
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

                { activeItem && <Animated.View style={styles.subtr}>
                    <View style={styles.tr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Asal kantor kirim</Text>
                        <Text style={styles.collapsetd}>{item.asal_kantor_kirim}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Petugas</Text>
                        <Text style={styles.collapsetd}>{item.nama_petugas}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Layanan</Text>
                        <Text style={styles.collapsetd}>{item.layanan}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Berat</Text>
                        <Text style={styles.collapsetd}>{rupiahNumber(item.berat)}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Nama Pengirim</Text>
                        <Text style={styles.collapsetd}>{item.nama_pengirim}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Ongkir</Text>
                        <Text style={styles.collapsetd}>{rupiahNumber(item.Ongkir)}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>PPN</Text>
                        <Text style={styles.collapsetd}>{rupiahNumber(item.ppn)}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Total</Text>
                        <Text style={styles.collapsetd}>{rupiahNumber(item.total)}</Text>
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
        alignItems: 'center',
        marginBottom: 7
    },
    td: {
        marginHorizontal: 10,
        fontSize: RFValue(12), 
        marginTop: -5
    },
    subtr: {
        marginLeft: 25, //icon size
    },
    collapsetr: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    collapsetd: {
        marginHorizontal: 10,
        fontSize: RFValue(12), 
        marginTop: -5,
        color: '#A7A6A6'
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