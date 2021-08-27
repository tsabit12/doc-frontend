import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GradientLayout, HeaderLayout } from '../components';
import PropTypes from 'prop-types';
import defaultstyles from '../config/styles';
import { AngleLeft } from '../../icons';

const TableProduksiKiriman = ({ navigation, route }) => {
    const { data } = route.params;

    const renderItem = ({ item }) => {
        return(
            <View style={styles.row}>
                <View style={styles.tr}>
                    <Text>Resi/Connote</Text>
                    <Text>{item.connote}</Text>
                </View>
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
                />
            </View>
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    title: { ...defaultstyles.headertitle },
    content: {
        flex: 1,
        marginTop: 8,
        backgroundColor: '#FFF',
        paddingHorizontal: 15
    },
    row: {
        marginVertical: 5
    },
    tr: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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