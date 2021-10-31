import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AngleDown } from '../../../icons';
import { INPUT_HEIGHT } from '../../config/layout';
import SelectDropdown from 'react-native-select-dropdown';
import { useState, useEffect } from 'react';
import service from '../../../config/service';
import PropTypes from 'prop-types';

const OfficeDropdown = ({ onError, onChoose, offices, value={}, roleid }) => {
    const kprkRef = useRef({});
    const [field, setfield] = useState({
        regional: 0, //default value by index
        kprk: 0
    });
    const [kprk, setkprk] = useState([
        {title: 'SEMUA KPRK', value: '00'}
    ]);

    useEffect(() => {
        if(Object.keys(value).length > 0){
            const indexregional = offices.findIndex(row => row.value === value.regional);
            
            setfield(prev => ({ ...prev, regional: indexregional }));
        }
    }, [value]);

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

    useEffect(() => {
        if(kprk.length > 0){
            if(value.kprk !== '00'){
                const indexkprk = kprk.findIndex(row => row.value === value.kprk);

                setfield(prev => ({ ...prev, kprk: indexkprk }));
            }
        }
    }, [kprk]);

    const handleChange = (index, name) => {
        const params = {
            regional: '00',
            kprk: '00'
        }
        
        setfield(prev => ({ ...prev, [name]: index }))
        if(name === 'regional' && index === 0){ //nasional
            onChoose(params);
        }else{
            if(name === 'kprk'){ 
                params.regional = offices[field.regional].value; //get from state cause index is kprk
                params.kprk = kprk[index].value
                onChoose(params); //only when kprk choosed
            }
        }

    }

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
                onSelect={(selectedItem, index) => handleChange(index, 'regional')}
                defaultValueByIndex={field.regional}
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
                disabled={ roleid === '4' || roleid === '1' ? true : false }
            />

            { field.regional !== 0 && <SelectDropdown
                data={kprk}
                ref={kprkRef}
                onSelect={(selectedItem, index) => handleChange(index, 'kprk')}
                defaultValueByIndex={field.kprk}
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
                disabled={roleid === '1' ? true : false }
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
    onChoose: PropTypes.func.isRequired,
    offices: PropTypes.array.isRequired,
    value: PropTypes.object,
    roleid: PropTypes.string.isRequired,
}

export default OfficeDropdown;