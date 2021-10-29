import React, { useEffect, useState } from "react";
import { Image, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import service, { asseturl } from "../../config/service";
import { HP } from "../config/layout";
import { AngleRight, Hourglass, StatisticIcon, TimeAlarm, TimeOver, TimeSleep } from "../../icons";
import { Bullets } from "react-native-easy-content-loader";
import { setMessage } from '../../actions/message';
import { rupiahNumber } from "../../utils";

const SPACING_HORIZONTAL = 15;
const SPACING = HP('2%');

const HomePageScreen = ({ navigation, sessions, setMessage }) => {
     const [refreshing, setrefreshing] = useState(true);
     const [data, setdata] = useState({
          summary: {
               jatuhtempo: 0,
               oversla: 0,
               ontime: 0,
               menginap: 0
          },
          all: []
     })
 
     useEffect(() => {
          getData();
     }, []);

     const { fullname, officeid, image, officename } = sessions;
     const firstname     = fullname.split(' ')[0];
     const imageurl      = image === null ? null : `${asseturl}/${image}`;

     const profileImage = () => {
          if(imageurl === null){
               return <Image 
                    source={require('../../assets/images/profil.png')}
                    resizeMode='cover'
                    style={styles.imageprofile}
               />
          }else{
               return <Image 
                    source={{ uri: imageurl }}
                    resizeMode='cover'
                    style={styles.imageprofile}
               />
          }
     }

     const getData = async () => {
          setrefreshing(true);

          const payload = {
               regional: '00',
               kprk: '00'
          }

          try {
               const { data } = await service.produksikiriman.jatuhtempo(payload);
               
               const { onTimeSwp, jatuhTempo, overSla, menginap } = data.reduce(({ 
                    onTimeSwp, 
                    jatuhTempo,
                    overSla,
                    menginap
                    }, item) =>
                    ({ 
                         onTimeSwp: item.types === 'ontime' ? onTimeSwp + Number(item.jumlah) : onTimeSwp, 
                         jatuhTempo: item.types === 'jatuhtempo' ? jatuhTempo + Number(item.jumlah) : jatuhTempo,
                         overSla: item.types === 'oversla' ? overSla + Number(item.jumlah) : overSla,
                         menginap: item.types === 'menginap' ? menginap + Number(item.jumlah) : menginap
                    })
               ,{ onTimeSwp: 0, jatuhTempo: 0, overSla: 0, menginap: 0 });

               setdata(prev => ({ 
                    ...prev, 
                    summary: {
                         jatuhtempo: jatuhTempo,
                         oversla: overSla,
                         ontime: onTimeSwp,
                         menginap
                    },
                    all: data
               }))

          } catch (error) {
               if(error.message){
                    setMessage({ open: true, message: error.message });
               }else{
                    setMessage({ open: true, message: 'Unknown error'});
               }
          }


          setrefreshing(false);
     }

     const handleRefresh = () => {
          getData();
     }

     return(
          <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
               <ScrollView 
                    contentContainerStyle={{flexGrow: 1, paddingHorizontal: SPACING_HORIZONTAL}}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                         <RefreshControl 
                              refreshing={refreshing}
                              onRefresh={handleRefresh}
                         />
                    }
               >
                    <Text style={styles.title}>DASHBOARD</Text>
                    <View style={styles.profilecard}>
                         <View style={{flex: 1, marginRight: 15}}>
                              <Text style={styles.textbold} numberOfLines={1}>Welcome back {firstname}!</Text>
                              <Text style={styles.text}>Let's check today's post</Text>
                         </View>
                         
                         { profileImage() }
                    </View>
                    <View style={{marginTop: SPACING, paddingHorizontal: 2}}>
                         <Text style={{ ...styles.textbold, color: '#FFF' }}>Reports up to today</Text>
                         <Text style={{ ...styles.text, color: '#FFF', opacity: 1 }}>
                              Displaying by your office ({officeid} - {officename})
                         </Text>
                    </View>
                    <View style={styles.content}>
                         { refreshing ? 
                              <Bullets 
                                   active 
                                   listSize={5} 
                                   loading={true} 
                                   aSize={45} 
                                   aShape='square' 
                                   containerStyles={{
                                        height: HP('9.6%'),
                                   }}
                                   tHeight={25}
                                   tWidth={300}
                              /> : 
                              <React.Fragment>
                                   <TouchableOpacity 
                                        style={styles.list}
                                        activeOpacity={0.8}
                                        onPress={() => navigation.navigate('DetailSummary', {
                                             title: 'Jatuh Tempo',
                                             data: data.all.filter(row => row.types === 'jatuhtempo')
                                        })}
                                   >
                                        <View style={{ ...styles.icon, backgroundColor: '#68B65C'}}>
                                             <Hourglass />
                                        </View>
                                        <View style={styles.listrightitem}>
                                             <View>
                                                  <Text style={styles.listtitletext}>Jatuh tempo</Text>
                                                  <Text style={styles.listsubtitletext}>{rupiahNumber(data.summary.jatuhtempo)} <Text style={{fontFamily: 'Poppins-Regular'}}>resi</Text></Text>
                                             </View>
                                             <AngleRight />
                                        </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity 
                                        style={styles.list}
                                        activeOpacity={0.8}
                                        onPress={() => navigation.navigate('DetailSummary', {
                                             title: 'Oversla',
                                             data: data.all.filter(row => row.types === 'oversla')
                                        })}
                                   >
                                        <View style={{ ...styles.icon, backgroundColor: '#256BAC'}}>
                                             <TimeOver />
                                        </View>
                                        <View style={styles.listrightitem}>
                                             <View>
                                                  <Text style={styles.listtitletext}>Oversla</Text>
                                                  <Text style={styles.listsubtitletext}>{rupiahNumber(data.summary.oversla)} <Text style={{fontFamily: 'Poppins-Regular'}}>resi</Text></Text>
                                             </View>
                                             <AngleRight />
                                        </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity 
                                        style={styles.list}
                                        activeOpacity={0.8}
                                        onPress={() => navigation.navigate('DetailSummary', {
                                             title: 'Menginap',
                                             data: data.all.filter(row => row.types === 'menginap')
                                        })}
                                   >
                                        <View style={{ ...styles.icon, backgroundColor: '#FF6644'}}>
                                             <TimeSleep />
                                        </View>
                                        <View style={styles.listrightitem}>
                                             <View>
                                                  <Text style={styles.listtitletext}>Menginap</Text>
                                                  <Text style={styles.listsubtitletext}>{rupiahNumber(data.summary.menginap)} <Text style={{fontFamily: 'Poppins-Regular'}}>resi</Text></Text>
                                             </View>
                                             <AngleRight />
                                        </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity 
                                        style={styles.list}
                                        activeOpacity={0.8}
                                        onPress={() => navigation.navigate('DetailSummary', {
                                             title: 'Ontime SWP',
                                             data: data.all.filter(row => row.types === 'ontime')
                                        })}
                                   >
                                        <View style={{ ...styles.icon, backgroundColor: '#7452AB'}}>
                                             <TimeAlarm />
                                        </View>
                                        <View style={styles.listrightitem}>
                                             <View>
                                                  <Text style={styles.listtitletext}>Ontime SWP</Text>
                                                  <Text style={styles.listsubtitletext}>{rupiahNumber(data.summary.ontime)} <Text style={{fontFamily: 'Poppins-Regular'}}>resi</Text></Text>
                                             </View>
                                             <AngleRight />
                                        </View>
                                   </TouchableOpacity>
                                   <TouchableOpacity 
                                        style={{ ...styles.list, borderBottomWidth: 0 }}
                                        activeOpacity={0.8}
                                        onPress={() => navigation.navigate('ProduksiKiriman', {
                                             title: 'Produksi Kiriman',
                                             subtitle: 'Pengawasan kiriman'
                                        })}
                                   >
                                        <View style={{ ...styles.icon, backgroundColor: '#978A8A'}}>
                                             <StatisticIcon />
                                        </View>
                                        <View style={styles.listrightitem}>
                                             <Text style={styles.listtitletext}>Produksi Kiriman</Text>
                                             <AngleRight />
                                        </View>
                                   </TouchableOpacity>
                              </React.Fragment>
                         }
                    </View>
               </ScrollView>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     root: {
          flex: 1
     },
     title: {
          color: '#FFF',
          fontFamily: 'Poppins-Bold',
          fontSize: 25
     },
     profilecard: {
          marginTop: Platform.OS === 'ios' ? SPACING : 0,
          backgroundColor: '#000',
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          height: HP('11%'),
          elevation: 2
     },
     textbold: {
          color: '#B0B0B0',
          fontSize: 15,
          fontFamily: 'Poppins-Bold',
     },
     text: {
          color: '#B0B0B0',
          opacity: 0.6
     },
     imageprofile: {
          height: HP('7%'),
          width: HP('7%'),
          borderRadius: HP('7%') / 2
     },
     content: {
          marginTop: SPACING, 
          flex: 1, 
          backgroundColor: '#FFF',
          marginHorizontal: -SPACING_HORIZONTAL,
     },
     list: {
          flexDirection: 'row',
          height: HP('11.7%'),
          alignItems: 'center',
          paddingHorizontal: SPACING_HORIZONTAL,
          paddingVertical: SPACING_HORIZONTAL - 5,
          borderBottomWidth: 0.7,
          borderColor: '#E3E3E3'
     },
     icon: {
          width: HP('6%'),
          height: HP('6%'),
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
     },
     listtitletext: {
          fontFamily: 'Poppins-Bold',
          fontSize: 15,
          color: '#646161',
          marginTop: 5
     },
     listsubtitletext: {
          fontFamily: 'Poppins-Regular',
          fontSize: 13,
          color: '#000',
          opacity: 0.7,
          marginTop: Platform.OS === 'android' ? -5 : 0
     },
     listrightitem: {
          flex: 1, 
          marginLeft: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
     }
})

HomePageScreen.propTypes = {
     sessions: PropTypes.object.isRequired,
     setMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state){
     return {
          sessions: state.sessions
     }
}

export default connect(mapStateToProps, { setMessage })(HomePageScreen);