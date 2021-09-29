import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AngleLeft } from '../../icons';
import { DateInput, DropDown, GradientLayout, HeaderLayout, OfficeDropdown, SliderAnimation } from '../components';
import { HP } from '../config/layout';
import defaultstyles from '../config/styles';
import { PieChart } from 'react-native-svg-charts';
import { RFValue } from 'react-native-responsive-fontsize';
import { generateColor } from '../../utils';
import defaultslider from '../../json/kiriman.json';
import { setMessage } from '../../actions/message';
import PropTypes from 'prop-types';
import { Bar } from './components';
import service from '../../config/service';
import { connect } from 'react-redux';
import { AlertNotifaction, Loading } from '../../components';

const options = [
    { title: 'Jumlah Transaksi', type: 'bar', keys: 'total' },
    { title: 'Berat', type: 'bar', keys: 'berat' },
    { title: 'Ongkir', type: 'bar', keys: 'ongkir' }
]

const ProduksiKiriman = ({ navigation, route, setMessage, messagenotification, region }) => {
    const { params } = route;
    const [loading, setloading] = useState(true);
    const [option, setoption] = useState({
        value: 0,
        type: 'bar',
        data: []
    });

    const [data, setdata] = useState([]);
    const [slider, setslider] = useState(defaultslider);
    const [office, setoffice] = useState({
        regional: '00',
        kprk: '00'
    })
    const [daterange, setdaterange] = useState({
        startdate: '',
        enddate: ''
    })

    useEffect(() => {

        let yourDate = new Date();
        const offset    = yourDate.getTimezoneOffset()
        yourDate  = new Date(yourDate.getTime() - (offset*60*1000))
        yourDate  = yourDate.toISOString().split('T')[0];

        const payload = {
            startdate: yourDate,
            enddate: yourDate,
            ...office
        }
        
        onSearch(payload);
    }, []);

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
            data={option.data}
            spacing={0}
            outerRadius={'95%'}
        />
    )

    const handlePressDetail = () => {
        navigation.navigate('TableProduksiKiriman', {
            data,
            slider: []
        })
    }

    const onSearch = async (payload) => {
        if(!loading) { setloading(true) }

        try {
            const get = await service.produksikiriman.get(payload);
            const { berat, ongkir, total } = get.data.reduce(({ 
                berat, 
                ongkir, 
                total, 
            }, item) =>
                ({ 
                    berat: berat + Number(item.berat), 
                    ongkir: ongkir + Number(item.ongkir),
                    total: total + Number(item.total)
                })
            ,{ berat: 0, ongkir: 0, total: 0});

            const slider = [
                { title: 'left-spacer' },
                { title: 'Jumlah Transaksi', jumlah: total.toString(), satuan: 'Resi'},
                { title: 'Total Berat', jumlah: berat.toString(), satuan: 'Kg'},
                { title: 'Ongkir', jumlah: ongkir.toString(), satuan: 'Rupiah'},
                { title: 'righ-spacer'}
            ]

            setslider(slider);
            setdata(get.data);

            //passing data to render pie/bar data not from state
            chooseGrafik(0, get.data, { regional: payload.regional, kprk: payload.kprk }); 
        } catch (error) {
            console.log(error);
            setdata([]);
            chooseGrafik(0, []); 
            setslider(defaultslider);
            if(error.message){
                setMessage({ open: true, message: error.message });
            }else{
                setMessage({ open: true, message: 'Unknown Error' });
            }
        }

        //update date range for get current selected with another method 
        //like by office     
        setdaterange({ 
            startdate: payload.startdate,
            enddate: payload.enddate
        });

        setloading(false);
    }

    const handleChangeOffice = (office) => {
        setoffice(prev => ({ ...prev, ...office })); //kprk and regional
        onSearch({ ...office, ...daterange });
    }

    const chooseGrafik = (index, defaultdata=data, defaultoffice=office) => {
        let option = 'region';
        const type  = options[index].type;
        const keysval  = options[index].keys;


        if(defaultoffice.regional !== '00' && defaultoffice.kprk === '00') option = 'location_code';
        if(defaultoffice.kprk !== '00') option = 'connote_service';

        const groupedObject = defaultdata.reduce((obj, keys) => {
            const count = obj[keys[option]] || 0
            return { ...obj, [keys[option]]: count + Number(keys[keysval]) }
        }, {});
    
        let arr = Object.entries(groupedObject).map((k, index) => ( { 
            key: index,
            name: `${k[0]}`,
            jumlah: k[1],
            svg: {
                fill: type === 'pie' ? generateColor() : 'rgba(134, 65, 244, 0.8)'
            }
        } ));
        
        setoption(prev => ({ 
            ...prev, 
            value: index,
            type,
            data: arr
        }))
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
                                offices={region}
                            />
                            <SliderAnimation listitem={slider} onPressDetail={handlePressDetail}/>
                        </View>
                        <View style={styles.card}>
                            <DropDown 
                                indexvalue={option.value}
                                options={options}
                                onChoose={(index) => chooseGrafik(index)}
                            />

                            { option.type === 'pie' && <React.Fragment>
                                { renderPie() }
                                <FlatList 
                                    data={option.data}
                                    keyExtractor={(item) => item.name}
                                    renderItem={renderDot}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{marginTop: 10}}
                                />
                            </React.Fragment> }
                            { option.type === 'bar' && <Bar data={option.data} />}
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
    region: PropTypes.array.isRequired,
}

function mapStateToProps(state){
    return {
        messagenotification: state.message,
        region: state.region
    }
}

export default connect(mapStateToProps, { setMessage })(ProduksiKiriman);