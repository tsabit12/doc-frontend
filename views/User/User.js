import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { AddIcon, AngleLeft } from '../../icons';
import { GradientLayout, HeaderLayout } from '../components';
import defaultstyles from '../config/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getuser } from '../../actions/users';
import * as Progress from 'react-native-progress';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { setMessage } from '../../actions/message';
import { AlertNotifaction } from '../../components';
import { asseturl } from '../../config/service';

const User = ({ navigation, getuser, messagenotification, setMessage, sessions, listuser }) => {
     const { total, data } = listuser;

     const [progress, setprogress] = useState(0.2);
     const [showprogress, setshowprogress] = useState(true);
     const [paging, setpaging] = useState({
          limit: 10,
          activePage: 1
     })

     const { activePage, limit } = paging;

     const offsetValue = (activePage * limit) - limit;

     const defaultParams = {
          level: 'all',
          regional: '00',
          kprk: '00',
          offset: offsetValue,
          limit: limit,
          type: 'count'
     };
     
     useEffect(() => {
          setprogress(0.2);
          (async () => {
               try {
                    await getuser(defaultParams, 1);
                    setprogress(0.5)
                    await getuser({ ...defaultParams, type: 'data' }, 1); 
               } catch (error) {
                    if(error.message){
                         setMessage({ open: true, message: error.message });
                     }else{
                         setMessage({ open: true, message: 'Unknown Error' });
                     }
               }

               setprogress(1);
          })()
     }, []);

     useEffect(() => {
          if(progress === 1){
               setTimeout(() => {
                    setshowprogress(false);
               }, 1000);
          }else{
               setshowprogress(true);
          }
     }, [progress]);

     const userCard = ({ item }) => {
          return <View style={styles.container}>
               <Image 
                    source={item.image ? {uri: `${asseturl}/${item.image}`} : require('../../assets/images/profil.png')}
                    style={styles.image}
                    resizeMode='cover'
               /> 

               <View style={styles.cardright}>
                    <Text style={styles.fullname}>{item.fullname}</Text>
                    <Text style={styles.email}>{item.email}</Text>
               </View>
          </View>
     }

     const showmore = (page) => {
          const offset = (page * limit) - limit;
          
     }

     var pagesdata  = data[`page${activePage}`] ? data[`page${activePage}`] : [];
     let count      = Math.ceil(total / limit);
     let loadmoreactive = false;

     if(pagesdata.length > 0 && activePage <= count){
          loadmoreactive = true;
     }

     return(
          <GradientLayout>
               { messagenotification.open && <AlertNotifaction 
                    message={messagenotification.message}
                    onClose={() => setMessage({ open: false, message: ''})}
               /> }

               <HeaderLayout 
                    title={
                         <View style={{flex: 1}}>
                              <Text style={defaultstyles.headertitle}>User</Text>
                         </View>
                    }
                    lefticon={<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                         <AngleLeft />
                    </TouchableOpacity> } 
               />

               <View style={styles.root}>
                    { showprogress && <Progress.Bar 
                         progress={progress} 
                         width={widthPercentageToDP('100%')} 
                         style={{borderRadius: 0, position: 'absolute' }} 
                         borderWidth={0}
                    /> }

                    <TouchableOpacity style={styles.floatbutton} activeOpacity={0.8}>
                         <AddIcon />
                    </TouchableOpacity>
          
                    <FlatList 
                         data={pagesdata}
                         keyExtractor={(_, index) => index.toString()}
                         renderItem={userCard}
                         contentContainerStyle={{marginTop: 10}}
                         showsVerticalScrollIndicator={false}
                         ListFooterComponent={() => {
                              return <React.Fragment>
                                   { loadmoreactive && <View style={{alignItems: 'center', marginTop: 15}}>
                                        <TouchableOpacity style={styles.btnload} activeOpacity={0.8} onPress={() => showmore(activePage + 1)}>
                                             <Text style={{color: '#084CB1', textAlign: 'center'}}>Load more</Text>
                                        </TouchableOpacity>
                                   </View> }
                              </React.Fragment>
                         }}
                    />
               </View>
          </GradientLayout>
     )
}

const styles = StyleSheet.create({
     root: {
          backgroundColor: '#FFF',
          flex: 1,
     },
     container: {
          marginHorizontal: 15,
          marginVertical: 10,
          backgroundColor: '#FFF',
          height: heightPercentageToDP('10%'),
          borderRadius: 7,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 2,
          shadowOffset: {
               width: 0,
               height: 1
          },
          elevation: 2
     },
     image: {
          width: widthPercentageToDP('16%'),
          height: widthPercentageToDP('16%'),
          borderRadius: 5
     },
     cardright:{
          flex: 1,
          marginLeft: 10,  
          height: '60%', 
          justifyContent:'space-around'
     },
     fullname: {
          fontFamily: 'Poppins-Bold'
     },
     email: {
          fontFamily: 'Poppins-Regular'
     },
     btnload: {
          height: heightPercentageToDP('4%'),
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          borderWidth: 0.6,
          borderColor: '#084CB1',
     },
     floatbutton: {
          position: 'absolute',
          right: 0,
          bottom: 0,
          backgroundColor: '#FA6901',
          width: heightPercentageToDP('7%'),
          height: heightPercentageToDP('7%'),
          borderRadius: heightPercentageToDP('7%') / 2,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 5,
          shadowOffset: {
               width: 0,
               height: 0
          }
     }
})

User.propTypes = {
     getuser: PropTypes.func.isRequired,
     messagenotification: PropTypes.object.isRequired,
     setMessage: PropTypes.func.isRequired,
     sessions: PropTypes.object.isRequired,
     listuser: PropTypes.object.isRequired,
}

function mapStateToProps(state){
     return{
          messagenotification: state.message,
          sessions: state.sessions,
          listuser: state.users
     }
}

export default connect(mapStateToProps, { getuser, setMessage })(User);