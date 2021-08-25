import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
import { AngleDown, AngleLeft } from '../../icons';
import { DateInput, DropDown, GradientLayout, HeaderLayout, OfficeDropdown, SliderAnimation } from '../components';
import { HP, WP } from '../config/layout';
import defaultstyles from '../config/styles';
import { PieChart } from 'react-native-svg-charts';
import { RFValue } from 'react-native-responsive-fontsize';
import { generateColor } from '../../utils';
import slider from '../../json/kiriman.json';
const options = [
    { title: 'Sebaran KPRK' },
    { title: 'Sebaran Regional' },
    { title: 'Sebaran KPC' },
    { title: 'Sebaran Agen' },
    { title: 'Sebaran Agen 2' },
    { title: 'Sebaran Agen 4' },
]

const ProduksiKiriman = ({ navigation, route }) => {
    const { params } = route;
    const [datapie, setdatapie] = useState([]);
    const [option, setoption] = useState(0);

    useEffect(() => { 
        const datapie = [];
        slider.forEach((row, index) => {
            if(row.jumlah){
                datapie.push({
                    key: index,
                    name: row.title,
                    jumlah: row.jumlah,
                    svg: {
                        fill: generateColor(index)
                    }
                })
            }
        });
        setdatapie(datapie);
    }, [slider]);

    const renderDot = ({ item  }) => {
        return(
            <View style={styles.dotlist}>
                <View style={{ ...styles.dot, backgroundColor: item.svg.fill }} />
                <Text style={styles.dotitle}>{item.name} ({item.jumlah})</Text>
            </View>
        )
    }

    return (
        <GradientLayout>
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
            <View style={styles.content}>
                <DateInput onDateChoosed={(daterange) => console.log(daterange)}>
                    <React.Fragment>
                        <View style={{marginTop: 11}}>
                            <OfficeDropdown
                                onError={(message) => setMessage({ open: true, message })}
                            />
                            <SliderAnimation listitem={slider}/>
                        </View>
                        <View style={styles.card}>
                            <DropDown 
                                indexvalue={option}
                                options={options}
                                onChoose={(index) => setoption(index)}
                            />

                            <PieChart
                                style={{ height: 270, width: '100%', marginTop: 10 }}
                                valueAccessor={({ item }) => item.jumlah}
                                data={datapie}
                                spacing={0}
                                outerRadius={'95%'}
                            />
                            <FlatList 
                                data={datapie}
                                keyExtractor={(item) => item.name}
                                renderItem={renderDot}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{marginTop: 10}}
                            />
                        </View>
                    </React.Fragment>
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
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    dotlist: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        height: HP('3%'),
        width: HP('3'),
        backgroundColor: 'red',
        borderRadius: HP('3%') / 2
    },
    dotitle: {
        textAlign: 'center',
        fontSize: RFValue(10),
        fontFamily: 'Poppins-Regular',
        color: '#5c5c5c',
        opacity: .6
    }
})

export default ProduksiKiriman;