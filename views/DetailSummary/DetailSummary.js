import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from 'prop-types';
import { HeaderLayout, OfficeDropdown } from "../components";
import defaultstyles from "../config/styles";
import { AngleLeft } from "../../icons";
import { connect } from "react-redux";
import { BarComponent } from "./components";

const getoptions = (filterfield) => {
     const { regional, kprk } = filterfield;

     let result = 'region';

     if(regional !== '00'){
          if(kprk === '00'){
               result = 'allkprk';
          }else{
               result = 'currentkprk';
          }
     }

     return result;
}

const DetailSummary = ({ navigation, route, region }) => {
     const { data, title } = route.params;

     const [filterfield, setfilterfield] = useState({
          regional: '00',
          kprk: '00'
     })
     const [chart, setchart] = useState([]);

     const optiontypes = getoptions(filterfield);

     useEffect(() => {
          setchart(calculateSum(optiontypes, data));
     }, [filterfield, optiontypes, data]);

     const calculateSum = (types, list) => {
          let groupedObject = {};

          if(types === 'region'){
               groupedObject = list.reduce((obj, keys) => {
                    const count = obj[keys['region']] || 0
                    return { ...obj, [keys['region']]: count + Number(keys.jumlah) }
               }, {});
          }else if(types === 'allkprk'){
               groupedObject = list.filter(row => row.region === filterfield.regional).reduce((obj, keys) => {
                    const count = obj[keys['nopend']] || 0
                    return { ...obj, [keys['nopend']]: count + Number(keys.jumlah) }
               }, {});
          }else{
               groupedObject = list.filter(row => row.nopend === filterfield.kprk).reduce((obj, keys) => {
                    const count = obj[keys['service']] || 0
                    return { ...obj, [keys['service']]: count + Number(keys.jumlah) }
               }, {});
          }
          

          return Object.entries(groupedObject).map((k, index) => ( { 
               key: index,
               name: `${k[0]}`,
               jumlah: k[1],
               svg: {
                   fill: 'rgba(241, 110, 0, 0.67)'
               }
          }));
     }
     

     return(
          <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
               <HeaderLayout 
                    title={<Text style={defaultstyles.headertitle}>{ title  }</Text>}
                    lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                         <AngleLeft />
                    </TouchableOpacity>} 
               />
               <View style={styles.container}>
                    <OfficeDropdown 
                         offices={region}
                         onChoose={(value) => setfilterfield(value)}
                    />
                    <View style={styles.content}>
                         <BarComponent data={chart} />
                    </View>
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          paddingHorizontal: 15
     },
     content: {
          flex: 1,
          backgroundColor: '#FFF',
          marginTop: 20,
          marginHorizontal: -15,
          paddingHorizontal: 15
     }
})

DetailSummary.propTypes = {
     route: PropTypes.shape({
          params: PropTypes.shape({
               title: PropTypes.string.isRequired,
               data: PropTypes.array.isRequired,
          }).isRequired,
     }).isRequired,
     region: PropTypes.array.isRequired,
}

function mapStateToProps(state){
     return {
          region: state.region
     }
}

export default connect(mapStateToProps, null)(DetailSummary);