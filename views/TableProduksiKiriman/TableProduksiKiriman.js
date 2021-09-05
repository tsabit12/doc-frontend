import React, { useState } from 'react';
import { FlatList, LayoutAnimation, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, UIManager, View } from 'react-native';
import { GradientLayout, HeaderLayout } from '../components';
import PropTypes from 'prop-types';
import defaultstyles from '../config/styles';
import { AngleLeft, CollapseDown, CollapseUp } from '../../icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { rupiahNumber } from '../../utils';
import { WP } from '../config/layout';

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
            <View>
                <TouchableNativeFeedback 
                    onPress={() => handleCollapse(activeItem, index)} 
                    activeOpacity={0.7}
                    background={TouchableNativeFeedback.Ripple('#E9E9E9', false)}
                >    
                    <View style={styles.tr}>
                        { activeItem ?  <CollapseUp /> : <CollapseDown /> }
                    
                        <Text style={{ ...styles.td, flex: 1 }}>Resi/Connote ({index+1})</Text>
                        <Text style={{ ...styles.td, color: '#A7A6A6'}}>{item.connote_code}</Text>
                    </View>
                </TouchableNativeFeedback>
                

                { activeItem && <View style={styles.subtr}>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Asal kantor kirim</Text>
                        <Text style={styles.collapsetd} numberOfLines={1}>{item.location_code}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Petugas</Text>
                        <Text style={styles.collapsetd} numberOfLines={1}>{item.nama_pengguna}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Layanan</Text>
                        <Text style={styles.collapsetd} numberOfLines={1}>{item.service}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Berat</Text>
                        <Text style={styles.collapsetd} numberOfLines={1}>{rupiahNumber(item.berat)}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Nama Pengirim</Text>
                        <Text style={styles.collapsetd} numberOfLines={1}>{item.pengirim}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Ongkir</Text>
                        <Text style={styles.collapsetd}>{rupiahNumber(item.ongkir)}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>PPN</Text>
                        <Text style={styles.collapsetd}>{rupiahNumber(item.ppn)}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Total</Text>
                        <Text style={styles.collapsetd}>{rupiahNumber(item.total)}</Text>
                    </View>
                    <View style={styles.collapsetr}>
                        <Text style={{ ...styles.td, flex: 1 }}>Created at</Text>
                        <Text style={styles.collapsetd}>{item.created}</Text>
                    </View>
                </View> }
            </View>
        )
    }

    const SeparatorComponent = () => {
        return <View style={styles.border} />
    }

    return(
        <GradientLayout>
            <HeaderLayout 
                title={<View style={{flex: 1}}>
                    <Text style={styles.title}>Detail produksi kiriman</Text>
                    <Text style={styles.subtitle} numberOfLines={1}>{ data.length } Resi</Text>
                </View>}
                lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>} 
            />
            <View style={styles.content}>
                <FlatList 
                    data={data}
                    contentContainerStyle={{flexGrow: 1}}
                    keyExtractor={(item) => item.connote_code}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<View style={styles.centered}>
                        <Text>Data tidak ditemukan</Text>
                    </View>}
                    ItemSeparatorComponent={SeparatorComponent}
                    removeClippedSubviews={true} // Unmount components when outside of window 
                    initialNumToRender={2} // Reduce initial render amount
                    maxToRenderPerBatch={10} // Reduce number in each render batch
                    updateCellsBatchingPeriod={100} // Increase time between renders
                    windowSize={7} // Reduce the window size
                />
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
        backgroundColor: '#FFF'
    },
    row: {
        paddingLeft: 5
    },
    tr: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft: 5
    },
    td: {
        marginHorizontal: 10,
        fontSize: RFValue(12), 
        marginTop: -5
    },
    subtr: {
        marginLeft: 30, //icon size + padding left
    },
    collapsetr: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    collapsetd: {
        marginHorizontal: 10,
        fontSize: RFValue(12), 
        marginTop: -5,
        color: '#A7A6A6',
        width: WP('50%'),
        textAlign: 'right'
    },
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    border: {
        height: 0.4,
        backgroundColor: '#A7A6A6',
        // paddingTop: 2,
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