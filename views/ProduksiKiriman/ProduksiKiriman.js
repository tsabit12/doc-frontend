import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AngleLeft } from '../../icons';
import { DateInput, DropDown, GradientLayout, HeaderLayout, OfficeDropdown, SliderAnimation } from '../components';
import { HP } from '../config/layout';
import defaultstyles from '../config/styles';
import { PieChart } from 'react-native-svg-charts';
import { RFValue } from 'react-native-responsive-fontsize';
import { convertToDateFromString, generateColor } from '../../utils';
import defaultslider from '../../json/kiriman.json';
import sebaranreg from '../../json/kiriman_sebaranreg.json';
import sebarankprk from '../../json/kiriman_sebarankprk.json';
import koorporat from '../../json/kiriman_korporat.json'
import koorporatrevenue from '../../json/kiriman_korporatrevenue.json';
import agenpos from '../../json/kiriman_agenpos.json';
import datatable from '../../json/kiriman_table.json';

import { setMessage } from '../../actions/message';
import PropTypes from 'prop-types';

import { Bar } from './components';
import service from '../../config/service';
import { connect } from 'react-redux';
import { AlertNotifaction, Loading } from '../../components';

const options = [
    { title: 'Sebaran Regional', type: 'pie' },
    { title: 'Sebaran KPRK', type: 'pie' },
    { title: 'Grafik Transaksi Korporat', type: 'bar' },
    { title: 'Grafik Revenue Korporat', type: 'bar' },
    { title: 'Grafik Transaksi Agenpos', type: 'bar' },
]

const getData = (optionIndex) => {
    switch (optionIndex) {
        case 0: return sebaranreg;
        case 1: return sebarankprk;
        case 2: return koorporat;
        case 3: return koorporatrevenue;
        case 4: return agenpos;
        default: return [];
    }
}

const ProduksiKiriman = ({ navigation, route, setMessage, messagenotification }) => {
    const { params } = route;
    const [loading, setloading] = useState(true);
    const [datapie, setdatapie] = useState([]);
    const [option, setoption] = useState({
        value: 0,
        type: 'pie'
    });

    const [data, setdata] = useState([]);
    const [slider, setslider] = useState(defaultslider);
    const [office, setoffice] = useState({
        regional: '00',
        kprk: '00',
        status: '00'
    })
    const [daterange, setdaterange] = useState({
        startdate: '',
        enddate: ''
    })

    useEffect(() => {
        const defaultdate = convertToDateFromString();
        const values = defaultdate.split('|');

        const payload = {
            startdate: values[0],
            enddate: values[1],
            ...office
        }
        
        onSearch(payload);
    }, []);

    useEffect(() => {
        if(data.length > 0){
            const { berat, ongkir, ppn, agenpos, kprk, kpc } = data.reduce(({ 
                berat, 
                ongkir, 
                ppn, 
                agenpos,
                kprk,
                kpc
            }, item) =>
                ({ 
                    berat: berat + Number(item.berat), 
                    ongkir: ongkir + Number(item.ongkir),
                    ppn: ppn + Number(item.ppn),
                    agenpos: item.location_type === 'AGENPOS' ? agenpos + 1 : agenpos,
                    kprk: item.location_type === 'KPRK' ? kprk + 1 : kprk,
                    kpc: item.location_type === 'KPCDK' || item.location_type === 'KPCLK' ? kpc + 1 : kpc,
                })
            ,{ berat: 0, ongkir: 0, ppn: 0, agenpos: 0, kprk: 0, kpc: 0});

            const slider = [
                { title: 'left-spacer' },
                { title: 'Jumlah Transaksi', jumlah: data.length.toString(), satuan: 'Resi'},
                { title: 'Total Berat', jumlah: berat.toString(), satuan: 'Kg'},
                { title: 'Ongkir', jumlah: ongkir.toString(), satuan: 'Rupiah'},
                { title: 'PPN', jumlah: ppn.toString(), satuan: 'Rupiah'},
                { title: 'Transaksi KPC', jumlah: kpc.toString(), satuan: 'Resi'},
                { title: 'Transaksi Agenpos', jumlah: agenpos.toString(), satuan: 'Resi'},
                { title: 'Transaksi KPRK', jumlah: kprk.toString(), satuan: 'Resi'},
                { title: 'righ-spacer'}
            ]

            setslider(slider);
        }
    }, [data]);

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

    const handlePressDetail = () => {
        navigation.navigate('TableProduksiKiriman', {
            data
        })
    }

    const onSearch = async (payload) => {
        if(!loading) { setloading(true) }

        console.log(payload);

        try {
            const get = await service.produksikiriman.get(payload);
            setdata(get.data);
            //update date range for get current selected with another method 
            //like by office 
        } catch (error) {
            setdata([]);
            setslider(defaultslider);
            if(error.message){
                setMessage({ open: true, message: error.message });
            }else{
                setMessage({ open: true, message: 'Unknown Error' });
            }
        }

        setdaterange({ 
            startdate: payload.startdate,
            enddate: payload.enddate
        });

        setloading(false);
    }

    const handleChangeOffice = (office) => {
        setoffice(prev => ({ ...prev, ...office })); //kprk and regional
        onSearch({ ...office, status: '00', ...daterange });
    }

    return (
        <GradientLayout>
            <Loading open={loading} />
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

            { messagenotification.open && <AlertNotifaction 
                message={messagenotification.message}
                onClose={() => setMessage({ open: false, message: ''})}
            /> }

            <View style={styles.content}>
                <DateInput onDateChoosed={(daterange) => onSearch({ ...daterange, ...office })}>
                    <React.Fragment>
                        <View style={{marginTop: 11}}>
                            <OfficeDropdown
                                onError={(message) => setMessage({ open: true, message })}
                                onChoose={handleChangeOffice}
                            />
                            <SliderAnimation listitem={slider} onPressDetail={handlePressDetail}/>
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
                            { option.type === 'bar' && <Bar data={datapie} />}
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

ProduksiKiriman.propTypes = {
    setMessage: PropTypes.func.isRequired,
    messagenotification: PropTypes.object.isRequired,
}

function mapStateToProps(state){
    return {
        messagenotification: state.message
    }
}

export default connect(mapStateToProps, { setMessage })(ProduksiKiriman);