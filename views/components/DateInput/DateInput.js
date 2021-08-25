import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, LogBox, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AngleDown, ArrowForward, Calendar } from '../../../icons';
import { HP, INPUT_HEIGHT, WP } from '../../config/layout';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';

const lastoptions   = [{ title: "Last" }, { title: "Next" }];
const numberoptions = [{title: '1'}, {title: '5'}, {title: '15'}, {title: '30'}, {title: '50'}, {title: '100'}];
const periodoptions = [{title: 'Day'}, {title: 'Week'}, {title: 'Month'}, {title: 'Year'}];

const DateInput = ({ onDateChoosed, children }) => {
    const [open, setopen] = useState(false);
    const collapseHeight = useRef(new Animated.Value(0)).current;
    const [field, setfield] = useState({
        last: 0,
        number: 0,
        periode: 0,
        startdate: '',
        enddate: ''
    })
    const [daterange, setdaterange] = useState({
        label: `${lastoptions[0].title} ${numberoptions[0].title} ${periodoptions[0].title}`,
        value: ''
    })

    useEffect(() => {
        LogBox.ignoreLogs([
            'Animated: `useNativeDriver`',
            'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
            'componentWillReceiveProps has been renamed, and is not recommended for use.'
        ])
    }, []);

    useEffect(() => {
        if(open){
            Animated.timing(collapseHeight, { 
                toValue: 100,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start()
        }
    }, [open])

    useEffect(() => { 
        if(daterange.value && !open){
            //return as object
            const values = daterange.value.split('|');
            onDateChoosed({ startdate: values[0], enddate: values[1]});
        }
        //remove open render to set onchooseddate only when press apply button
    }, [daterange]);

    const renderListDropdown = (item) => {
        return(
            <View>
                <Text style={{fontFamily: 'Poppins-Regular'}}>{item.title}</Text>
            </View>
        )
    }

    const handleChangeDate = (date, name) => {
        setfield(prev => ({ ...prev, [name]: date }));
    }

    const handleChangeOptions = (index, name) => {
        setfield(prev => ({ 
            ...prev, 
            [name]: index,
            startdate: '', //reset start date
            enddate: '' //reset enddate
        }));
    }

    const collapsestyles =  {
        ...styles.collapse,
        transform: [
            {
                scaleY: collapseHeight.interpolate({
                    inputRange: [0, 25, 50, 75, 105],
                    outputRange: [0, .5, 0.75, 0.9, 1],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    const handleApply = () => {
        const { startdate, enddate, last, number, periode } = field;
        if(startdate === '' || enddate == ''){ //get select option
            const lastvalue = lastoptions[last];
            const numbervalue = numberoptions[number];
            const periodevalue = periodoptions[periode];
            
            const stringindate = convertToDateFromString(lastvalue, numbervalue, periodevalue);
            setdaterange({
                label: `${lastvalue.title} ${numbervalue.title} ${periodevalue.title}`,
                value: stringindate
            });
        }else{ //
            setdaterange({
                label: `${startdate} - ${enddate}`,
                value: `${startdate}|${enddate}`
            })
        }

        setopen(false);
    }

    const convertToDateFromString = (last, number, periode) => {
        const d             = new Date();
        let numberValue     = Number(number.title);

        if(last.title.toLowerCase() === 'last'){
            switch (periode.title.toLowerCase()) {
                case 'day':
                    d.setDate(d.getDate() - numberValue); break;
                case 'week':
                    d.setDate(d.getDate() - (numberValue * 7)); break;
                case 'month':
                    d.setMonth(d.getMonth() - numberValue); break;
                case 'year':
                    d.setFullYear(d.getFullYear() - numberValue); break;
                default:
                    break;
            }
        }else{
            switch (periode.title.toLowerCase()) {
                case 'day':
                    d.setDate(d.getDate() + numberValue); break;
                case 'week':
                    d.setDate(d.getDate() + (numberValue * 7)); break;
                case 'month':
                    d.setMonth(d.getMonth() + numberValue); break;
                case 'year':
                    d.setFullYear(d.getFullYear() + numberValue); break;
                default:
                    break;
            }
        }
        
        let defaultday     =  ("0" + (d.getDate())).slice(-2);
        let defaultmonth   = ("0" + (d.getMonth() + 1)).slice(-2);
        var defaultyear    = d.getFullYear();

        const currdate  = new Date();
        let currday     =  ("0" + (currdate.getDate())).slice(-2);
        let currmonth   = ("0" + (currdate.getMonth() + 1)).slice(-2);
        var curryear    = currdate.getFullYear();

        if(last.title.toLowerCase() === 'last'){
            return `${defaultday}-${defaultmonth}-${defaultyear}|${currday}-${currmonth}-${curryear}`;
        }else{
            return `${currday}-${currmonth}-${curryear}|${defaultday}-${defaultmonth}-${defaultyear}`;
        }
    }

    return(
        <View style={styles.root}>
            <View style={styles.inputroot}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => setopen(!open)}>
                    <Calendar />
                    <AngleDown />
                </TouchableOpacity>
                <View style={styles.borderright} />
                <TextInput 
                    placeholder='Select date'
                    style={styles.input}
                    placeholderTextColor='#ADADAD'
                    editable={false}
                    selectTextOnFocus={false}
                    value={daterange.label.toUpperCase()}
                />
            </View>
            { open && <Animated.View style={collapsestyles}>
                <View style={styles.arrowup} />
                <View style={styles.collapsecontent}>
                    <View style={styles.selectcontainer}>
                        <SelectDropdown
                            data={lastoptions}
                            onSelect={(selectedItem, index) => handleChangeOptions(index, 'last')}
                            defaultValueByIndex={field.last}
                            buttonStyle={styles.optionsbutton}
                            dropdownStyle={{borderRadius: 5, marginTop: 5}}
                            dropdownIconPosition='right'borderColor
                            renderDropdownIcon={() => <AngleDown size='small' color='#FA6A01' />}
                            renderCustomizedRowChild={renderListDropdown}
                            rowStyle={styles.rowdropdown}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title }}
                            rowTextForSelection={(item, index) => { return item }}
                            statusBarTranslucent={true}
                        />
                        <SelectDropdown
                            data={numberoptions}
                            onSelect={(selectedItem, index) => handleChangeOptions(index, 'number')}
                            defaultValueByIndex={field.number}
                            buttonStyle={styles.optionsbutton}
                            dropdownStyle={{borderRadius: 5, marginTop: 5}}
                            dropdownIconPosition='right'borderColor
                            renderDropdownIcon={() => <AngleDown size='small' color='#FA6A01' />}
                            renderCustomizedRowChild={renderListDropdown}
                            rowStyle={styles.rowdropdown}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title }}
                            rowTextForSelection={(item, index) => { return item }}
                            statusBarTranslucent={true}
                        />
                        <SelectDropdown
                            data={periodoptions}
                            onSelect={(selectedItem, index) => handleChangeOptions(index, 'periode')}
                            defaultValueByIndex={field.periode}
                            buttonStyle={styles.optionsbutton}
                            dropdownStyle={{borderRadius: 5, marginTop: 5}}
                            dropdownIconPosition='right'borderColor
                            renderDropdownIcon={() => <AngleDown size='small' color='#FA6A01' />}
                            renderCustomizedRowChild={renderListDropdown}
                            rowStyle={styles.rowdropdown}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title }}
                            rowTextForSelection={(item, index) => { return item }}
                            statusBarTranslucent={true}
                        />
                    </View>
                    <View style={styles.hr} />
                    <View style={{margin: 5}}>
                        <Text style={styles.linktitle}>Commonly used</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.linkcontainer}>
                                <TouchableOpacity style={styles.link}>
                                    <Text style={styles.linktext}>Today</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.link}>
                                    <Text style={styles.linktext}>Last 15 Hour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.link}>
                                    <Text style={styles.linktext}>Last 5 Day</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.linkcontainer}>
                                <TouchableOpacity style={styles.link}>
                                    <Text style={styles.linktext}>This week</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.link}>
                                    <Text style={styles.linktext}>Last 10 week</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.link}>
                                    <Text style={styles.linktext}>Last 1 year</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{ ...styles.hr, margin: 0, flex: 1}} />
                        <Text style={styles.or}>Or use custom date</Text>
                        <View style={{ ...styles.hr, margin: 0, flex: 1}} />
                    </View>
                    <View style={styles.daterange}>
                        <DatePicker
                            style={styles.startdate}
                            date={field.startdate}
                            mode="date"
                            placeholder="Start"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    width: 0,
                                    height: 0
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    flex: 1,
                                    height: '100%',
                                    borderWidth: 0
                                }
                            }}
                            onDateChange={(date) => handleChangeDate(date, 'startdate')}
                        />
                        <View style={styles.daterangeicon}>
                            <ArrowForward />
                        </View>
                        <DatePicker
                            style={styles.enddate}
                            date={field.enddate}
                            mode="date"
                            placeholder="End"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    width: 0,
                                    height: 0
                                },
                                dateInput: {
                                    marginLeft: 0,
                                    flex: 1,
                                    height: '100%',
                                    borderWidth: 0
                                }
                            }}
                            onDateChange={(date) => handleChangeDate(date, 'enddate')}
                        />
                    </View>
                    
                    <View style={styles.footer}>
                        <View style={styles.hr} />
                        <TouchableOpacity style={styles.buttonapply} activeOpacity={0.8} onPress={handleApply}>
                            <Text style={styles.apply}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>                
            </Animated.View> }
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }, 
    inputroot: {
        backgroundColor: '#FFF',
        height: INPUT_HEIGHT,
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: WP('15%')
    },
    borderright: {
        marginLeft: 10,
        marginRight: 10,
        borderRightWidth: 1,
        height: '100%',
        borderColor: '#ADADAD'
    },
    input: {
        height: '100%',
        flex: 1,
        color: '#ADADAD',
        fontSize: RFValue(14)
    },
    collapse: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        top: 0,
        marginTop: HP('5.6%'),
        zIndex: 2
        //height: COLLAPSE_HEIGHT
    },
    arrowup: {
        width: 0,
        height: 0,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderBottomWidth: 14,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FFF',
        marginLeft: 55     
    },
    collapsecontent: {
        backgroundColor: '#FFF',
        marginTop: -1,
        padding: 10,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 7,
        flex: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    selectcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionsbutton: {
        borderWidth: 0.7,
        borderRadius: 6,
        borderColor: '#FA6A01',
        backgroundColor: "#FFF",
        flex: 1,
        margin: 5
    },
    rowdropdown: {},
    hr: {
        height: 2,
        borderBottomWidth: 1,
        margin: 5,
        borderColor: "#ADADAD"
    },
    linktitle: {
        fontFamily: 'Poppins-Bold',
        color: '#ADADAD',
        fontSize: RFValue(14)
    },
    // linkcontainer: { marginTop: 5 },
    linktext: {
        color: '#1849F6',
        fontSize: RFValue(13)
    },
    link: { marginTop: 5, marginBottom: 5 },
    or: { 
        marginLeft: 10, 
        marginRight: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(13),
        color: "#ADADAD"
    },
    daterange: {
        flexDirection: 'row',
        marginTop: 5,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    startdate: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        height: HP('6%'),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FA6A01'
    },
    enddate: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        height: HP('6%'),
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FA6A01'
    },
    daterangeicon: {
        backgroundColor: '#FA6A01',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    footer:{
        padding: 0,
        marginLeft: -15,
        marginRight: -15,
        marginTop: 10
    },
    buttonapply: {
        backgroundColor: '#FA6A01',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        height: HP('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    apply: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(14)
    }
})

DateInput.propTypes = {
    onDateChoosed: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default DateInput;