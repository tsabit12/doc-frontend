import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AngleLeft } from '../../icons';
import { DateInput, DropDown, GradientLayout, HeaderLayout, OfficeDropdown, SliderAnimation } from '../components';
import defaultstyles from '../config/styles';
import { generateColor } from '../../utils';
import { PieChart } from 'react-native-svg-charts';
import { HP } from '../config/layout';
import { RFValue } from 'react-native-responsive-fontsize';
import slider from '../../json/jatuhtempo_slider.json';
import swp from '../../json/jatuhtempo_swp.json';
import jatuh from '../../json/jatuhtempo_jatuh.json';
import inproses from '../../json/jatuhtempo_inproses.json';

const options = [
    { title: 'SWP', type: 'pie' },
    { title: 'Jatuh Tempo', type: 'pie' },
    { title: 'Inproses', type: 'pie' },
    { title: 'Over SLA', type: 'pie' }
]

const getData = (optionIndex) => {
    switch (optionIndex) {
        case 0: return swp;
        case 1: return jatuh;
        case 2: return inproses;
        default: return [];
    }
}

const JatuhTempo = ({ navigation, route }) => {
    const { params } = route;
    const [datapie, setdatapie] = useState([]);
    const [option, setoption] = useState({
        value: 0,
        type: 'pie'
    });

    useEffect(() => { 
        const { value, type } = option;
        const datapie = [];
        let json = getData(value);
        
        json.forEach((row, index) => {
            datapie.push({
                key: index,
                name: row.title,
                jumlah: row.jumlah,
                svg: {
                    fill: type === 'pie' ? generateColor(index) : 'rgba(134, 65, 244, 0.8)'
                }
            })
        });

        setdatapie(datapie);

    }, [option]);

    const renderDot = ({ item  }) => {
        return(
            <View style={styles.dotlist}>
                <View style={{ ...styles.dot, backgroundColor: item.svg.fill }} />
                <Text style={styles.dotitle}>{item.name} ({item.jumlah})</Text>
            </View>
        )
    }

    const renderPie = () => (
        <PieChart
            style={{ height: 270, width: '100%', marginTop: 10 }}
            valueAccessor={({ item }) => item.jumlah}
            data={datapie}
            spacing={0}
            outerRadius={'95%'}
        />
    )

    return(
        <GradientLayout>
            <HeaderLayout 
                title={
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>{params.title}</Text>
                        { params.subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{params.subtitle}</Text> : <React.Fragment />}
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
                            <SliderAnimation listitem={slider} />
                        </View>
                        <View style={styles.card}>
                            <DropDown 
                                indexvalue={option.value}
                                options={options}
                                onChoose={(index) => setoption(prev => ({ 
                                    ...prev, 
                                    value: index,
                                    type: options[index].type
                                }))}
                            />

                            { option.type === 'pie' && <React.Fragment>
                                { renderPie() }
                                <FlatList 
                                    data={datapie}
                                    keyExtractor={(item) => item.name}
                                    renderItem={renderDot}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{marginTop: 10}}
                                />
                            </React.Fragment> }
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
        height: HP('2%'),
        width: HP('2'),
        backgroundColor: 'red',
        borderRadius: HP('2%') / 2
    },
    dotitle: {
        textAlign: 'center',
        fontSize: RFValue(10),
        fontFamily: 'Poppins-Regular',
        color: '#5c5c5c',
        opacity: .6
    }
})

export default JatuhTempo;