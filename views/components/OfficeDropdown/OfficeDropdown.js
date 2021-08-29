import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AngleDown } from '../../../icons';
import { INPUT_HEIGHT } from '../../config/layout';
import SelectDropdown from 'react-native-select-dropdown';
import { useState, useEffect } from 'react';
import service from '../../../config/service';
import PropTypes from 'prop-types';

const offices = [
    {title: 'NASIONAL', value: '00'},
    {title: 'REGIONAL MEDAN', value: '20004'},
    {title: 'REGIONAL PADANG', value: '25004'},
    {title: 'REGIONAL PALEMBANG', value: '30004'},
    {title: 'REGIONAL JAKARTA', value: '10004'},
    {title: 'REGIONAL BANDUNG', value: '40004'},
    {title: 'REGIONAL SEMARANG', value: '50004'},
    {title: 'REGIONAL SURABAYA', value: '60004'},
    {title: 'REGIONAL DENPASAR', value: '80004'},
    {title: 'REGIONAL BANJARBARU', value: '70704'},
    {title: 'REGIONAL MAKASAR', value: '90004'},
    {title: 'REGIONAL JAYAPURA', value: '99004'},
];

const OfficeDropdown = ({ onError }) => {
    const kprkRef = useRef({});
    const [field, setfield] = useState({
        regional: 0, //default value by index
        kprk: 0
    });
    const [kprk, setkprk] = useState([
        {title: 'SEMUA KPRK', value: '00'}
    ]);

    useEffect(() => {
        if(field.regional != 0){
            setfield(prev => ({ ...prev, kprk: 0 })); //reset kprk
            (async () => {
                const regional = offices[field.regional].value;
                try {
                    const kprk = [{title: 'SEMUA KPRK', value: '00'}];
                    const getkprk = await service.referensi.kprk({ regional })
                    getkprk.forEach(row => {
                        kprk.push({title: row.title, value: row.value });
                    });

                    setkprk(kprk);

                    kprkRef.current.reset();
                } catch (error) {
                    if(error.global){
                        onError(error.global);
                    }else{
                        onError('Internal server error');
                    }
                }
            })();
        }
    }, [field.regional])

    const renderListDropdown = (item) => {
        return(
            <View>
                <Text style={{fontFamily: 'Poppins-Regular'}}>{item.title}</Text>
            </View>
        )
    }
    
    return(
        <View style={styles.root}>
            <SelectDropdown
                data={offices}
                onSelect={(selectedItem, index) => setfield(prev => ({ ...prev, regional: index }))}
                defaultValueByIndex={0}
                buttonStyle={styles.button}
                dropdownStyle={{borderRadius: 5, marginTop: 5 }}
                dropdownIconPosition='right'
                buttonTextStyle={{color: '#ADADAD', textAlign: 'left' }}
                renderDropdownIcon={() => <AngleDown />}
                renderCustomizedRowChild={renderListDropdown}
                rowStyle={styles.rowdropdown}
                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title }}
                rowTextForSelection={(item, index) => { return item }}
                statusBarTranslucent={true}
            />

            { field.regional !== 0 && <SelectDropdown
                data={kprk}
                ref={kprkRef}
                onSelect={(selectedItem, index) => setfield(prev => ({ ...prev, kprk: index }))}
                defaultValueByIndex={0}
                buttonStyle={{ ...styles.button, marginRight: 5}}
                dropdownStyle={{borderRadius: 5, marginTop: 5 }}
                dropdownIconPosition='right'
                buttonTextStyle={{color: '#ADADAD', textAlign: 'left' }}
                renderDropdownIcon={() => <AngleDown />}
                renderCustomizedRowChild={renderListDropdown}
                rowStyle={styles.rowdropdown}
                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title }}
                rowTextForSelection={(item, index) => { return item }}
                statusBarTranslucent={true}
            /> }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#FFF',
        height: INPUT_HEIGHT,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 7,
        flex: 1,
        width: 30
    },
    rowdropdown: {}
})

OfficeDropdown.propTypes = {
    onError: PropTypes.func.isRequired,
}

export default OfficeDropdown;