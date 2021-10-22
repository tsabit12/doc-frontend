import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import PropTypes from 'prop-types';
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { AngleDown, CloseOutlined, EmailIcon, Eyeclose, Eyeopen, Person } from "../../../../icons";
import { HP, WP } from "../../../config/layout";
import SelectDropdown from "react-native-select-dropdown";
import service from "../../../../config/service";

const getOffice = (role, office) => {
     switch (role) {
          case '4':
               return office;
          case '1':
               return office;
          default:
               return '40005';
     }
}

const OfficeOptions = ({ role, listregion, onChangeregion }) => {
     const [kprk, setkprk] = useState([]);
     const regionRef = useRef();

     useEffect(() => {
          if(role === '4' || role === '1'){
               setkprk([]);
               regionRef.current.reset();
          }
     }, [role]);

     const renderListDropdown = (item) => {
          return <Text style={{fontFamily: 'Poppins-Regular'}} numberOfLines={1}>{item.title}</Text>
     }

     const handleChangeRegion = async (index) => {
          if(role === '4'){
               onChangeregion(listregion[index].value);
          }else{
               setkprk([]);
               try {
                    const kprklist = await service.referensi.kprk({ regional: listregion[index].value });
                    setkprk(kprklist);
               } catch (error) {
                    alert('GET KPRK FAILED');
               }
          }
     }

     const handleChangeKprk = (index) => onChangeregion(kprk[index].value)
     

     if(role === '4' || role === '1'){
          return <View style={{flexDirection: 'row'}}> 
                    <SelectDropdown
                         data={listregion}
                         onSelect={(selectedItem, index) => handleChangeRegion(index)}
                         //defaultValueByIndex={1}
                         ref={regionRef}
                         defaultButtonText='Select regional'
                         buttonStyle={styles.inputselect}
                         buttonTextStyle={{fontSize: RFValue(13)}}
                         dropdownStyle={{borderRadius: 5, marginTop: 5}}
                         dropdownIconPosition='right'
                         renderDropdownIcon={() => <AngleDown size='small' color='#696969' />}
                         renderCustomizedRowChild={renderListDropdown}
                         buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title }}
                         rowTextForSelection={(item, index) => { return item }}
                         statusBarTranslucent={true}
                         
                    />
                    { role === '1' && kprk.length > 0 && 
                         <SelectDropdown
                              data={kprk}
                              onSelect={(selectedItem, index) => handleChangeKprk(index)}
                              //defaultValueByIndex={1}
                              defaultButtonText='Select kprk'
                              buttonStyle={styles.inputselect}
                              buttonTextStyle={{fontSize: RFValue(13)}}
                              dropdownStyle={{borderRadius: 5, marginTop: 5}}
                              dropdownIconPosition='right'
                              renderDropdownIcon={() => <AngleDown size='small' color='#696969' />}
                              renderCustomizedRowChild={renderListDropdown}
                              buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.title }}
                              rowTextForSelection={(item, index) => { return item }}
                              statusBarTranslucent={true}
                              
                         /> 
                    }
               </View>
     }else{
          return null;
     }
}

OfficeOptions.propTypes = {
     role: PropTypes.string,
     listregion: PropTypes.array.isRequired,
     onChangeregion: PropTypes.func.isRequired,
}

const ModalAdd = ({ open, onClose, regions, userid, add }) => {
     const [isecure, setisecure] = useState(true);
     const [field, setfield] = useState({
          role: '',
          office: '',
          username: '',
          fullname: '',
          email: '',
          password: '',
          confirm: ''
     })
     const [loading, setloading] = useState(false);

     useEffect(() => {
          if(!open){
               setfield({
                    role: '',
                    office: '',
                    username: '',
                    fullname: '',
                    email: '',
                    password: '',
                    confirm: ''
               });
               setisecure(true);
          }
     }, [open]);

     const handleChangeRole = (value) => setfield(prev => ({ ...prev, role: value }));

     const handleChange = (value, name) => {
          setfield(prev => ({ ...prev, [name]: value }));
     }

     const onSubmit = async () => {
          const errors = validate(field);
          if(Object.keys(errors).length === 0){
               setloading(true);
               
               const payload = {
                    fullname: field.fullname,
                    username: field.username,
                    roleid: field.role,
                    office: getOffice(field.role, field.office),
                    password: field.password,
                    created_by: userid,
                    email: field.email
               }

               try {
                    await add(payload);
                    onClose();
               } catch (error) {
                    if(error.message){
                         alert(error.message);
                    }else{
                         alert("Unknown message");
                    }
               }

               
               setloading(false);
          }else{
               const firstMessageKey = Object.keys(errors)[0];
               const message = errors[firstMessageKey];
               alert(message);
          }
     }

     const validate = (values) => {
          const error = {};
          if(!values.username) error.username = "Username belum diisi";
          if(!values.fullname) error.fullname = "Nama lengkap belum diisi";
          if(!values.email) error.email = "Email belum diisi";
          if(!values.role) error.role = "Role belum dipilih";
          if(values.role){
               if(values.role === '4'){ //regional
                    if(!values.office) error.role = "Regional belum dipilih";
                    if(values.office.length > 1) error.role = "Regional tidak valid";
               }else if(values.role === '1'){ //kprk
                    if(!values.office) error.role = "Kprk belum dipilih";
                    if(values.office.length <= 2) error.role = "Kprk belum dipilih";
               }
          }
          if(values.email){
               const mailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
               if(!mailregex.test(values.email)) error.email = "Email tidak valid";
          }
          if(!values.password) error.password = "Password belum diisi";
          if(values.password){
               if(!values.confirm){
                    error.password = "Konfirmasi password harus diisi";
               }else{
                    if(values.password !== values.confirm) error.password = "Password tidak valid";
               }
          }
          return error;
     }

     return (
          <Modal
               visible={open}
               animationType='slide'
               onRequestClose={onClose}
               transparent={true}
          >
               <View style={{flex: 1, backgroundColor: '#FFF'}}>
                    <KeyboardAvoidingView behavior='height' style={{flex: 1}}>
                         <ScrollView showsVerticalScrollIndicator={false}>
                              <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
                                   <View style={styles.header}>
                                        <View>
                                             <Text style={styles.title}>Add User</Text>
                                             <Text
                                                  style={{
                                                       ...styles.title,
                                                       fontSize: RFValue(13),
                                                       color: '#6e6e6e',
                                                       opacity: 1,
                                                       marginTop: -5
                                                  }}
                                             >
                                                  Tambah pengguna DOC
                                             </Text>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.4} onPress={onClose}>
                                             <CloseOutlined color="#6e6e6e" />
                                        </TouchableOpacity>
                                   </View> 
                                   <View style={styles.container}>
                                        <View style={styles.formcontrol}>
                                             <Text>Username</Text>
                                             <View style={styles.inputicon}>
                                                  <Person />
                                                  <TextInput 
                                                       placeholder='Enter username'
                                                       style={styles.input}
                                                       value={field.username}
                                                       onChangeText={(text) => handleChange(text, 'username')}
                                                  />
                                             </View>
                                        </View>

                                        <View style={styles.formcontrol}>
                                             <Text>Fullname</Text>
                                             <View style={styles.inputicon}>
                                                  <Person />
                                                  <TextInput 
                                                       placeholder='Enter fullname'
                                                       style={styles.input}
                                                       value={field.fullname}
                                                       onChangeText={(text) => handleChange(text, 'fullname')}
                                                  />
                                             </View>
                                        </View>

                                        <View style={styles.formcontrol}>
                                             <Text>Email</Text>
                                             <View style={styles.inputicon}>
                                                  <EmailIcon />
                                                  <TextInput 
                                                       placeholder='Enter email'
                                                       style={styles.input}
                                                       value={field.email}
                                                       onChangeText={(text) => handleChange(text, 'email')}
                                                  />
                                             </View>
                                        </View>

                                        <View style={styles.formcontrol}>
                                             <Text>Select Role</Text>
                                             <View style={styles.optionscontainer}>
                                                  <TouchableOpacity 
                                                       style={{ 
                                                            ...styles.optionsbutton,
                                                            backgroundColor: field.role === '5' ? '#FA6901' : '#FFF'
                                                       }} 
                                                       activeOpacity={0.8}
                                                       onPress={() => handleChangeRole('5')}
                                                  >
                                                       <Text style={{ color: field.role === '5' ? '#FFF' : '#000' }}>Admin</Text>
                                                  </TouchableOpacity>

                                                  <TouchableOpacity 
                                                       style={{ 
                                                            ...styles.optionsbutton,
                                                            backgroundColor: field.role === '2' ? '#FA6901' : '#FFF'
                                                       }} 
                                                       activeOpacity={0.8}
                                                       onPress={() => handleChangeRole('2')}
                                                  >
                                                       <Text style={{ color: field.role === '2' ? '#FFF' : '#000' }}>Pusat</Text>
                                                  </TouchableOpacity>

                                                  <TouchableOpacity 
                                                       style={{ 
                                                            ...styles.optionsbutton,
                                                            backgroundColor: field.role === '4' ? '#FA6901' : '#FFF'
                                                       }} 
                                                       activeOpacity={0.8}
                                                       onPress={() => handleChangeRole('4')}
                                                  >
                                                       <Text style={{ color: field.role === '4' ? '#FFF' : '#000' }}>Regional</Text>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity 
                                                       style={{ 
                                                            ...styles.optionsbutton,
                                                            backgroundColor: field.role === '1' ? '#FA6901' : '#FFF'
                                                       }} 
                                                       activeOpacity={0.8}
                                                       onPress={() => handleChangeRole('1')}
                                                  >
                                                       <Text style={{ color: field.role === '1' ? '#FFF' : '#000' }}>Kprk</Text>
                                                  </TouchableOpacity>
                                             </View>
                                        </View>

                                        <OfficeOptions 
                                             role={field.role} 
                                             listregion={regions} 
                                             onChangeregion={(value) => 
                                                  setfield(prev => ({ ...prev, office: value }))
                                             }
                                        />

                                        <View style={styles.formcontrol}>
                                             <Text>Password</Text>
                                             <View style={styles.inputicon}>
                                                  <TextInput 
                                                       placeholder='Enter password'
                                                       style={{ ...styles.input, marginLeft: 5 }}
                                                       value={field.password}
                                                       onChangeText={(text) => handleChange(text, 'password')}
                                                       secureTextEntry={isecure}
                                                  />
                                                  <TouchableOpacity 
                                                       style={{marginRight: 5}}
                                                       activeOpacity={0.7}
                                                       onPress={() => setisecure(!isecure)}
                                                  >
                                                       { isecure ? <Eyeclose color='#696969' /> : <Eyeopen color='#696969' /> }  
                                                  </TouchableOpacity>
                                             </View>
                                        </View>
                                        <View style={styles.formcontrol}>
                                             <Text>Konfirmasi Password</Text>
                                             <View style={styles.inputicon}>
                                                  <TextInput 
                                                       placeholder='Confirm password'
                                                       style={{ ...styles.input, marginLeft: 5 }}
                                                       value={field.confirm}
                                                       secureTextEntry={true}
                                                       onChangeText={(text) => handleChange(text, 'confirm')}
                                                  />
                                             </View>
                                        </View>

                                        <TouchableOpacity 
                                             style={{
                                                  ...styles.button,
                                                  backgroundColor: loading ? '#5c5c5c' : '#FA6901'
                                             }}
                                             activeOpacity={0.8} 
                                             onPress={onSubmit}
                                             disabled={loading}
                                        >
                                             <Text style={{color: '#FFF'}}>{ loading ? 'LOADING...' : 'SIMPAN'}</Text>
                                        </TouchableOpacity>
                                   </View> 
                              </SafeAreaView>
                         </ScrollView>
                    </KeyboardAvoidingView>  
               </View>
          </Modal>
     )
}

const styles = StyleSheet.create({
     root: {
          flex: 1,
          padding: 10,
          paddingBottom: -20
     },
     title: {
          fontFamily: 'Poppins-Bold',
          fontSize: RFValue(17),
          opacity: 0.7
     },
     header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
     },
     container: {
          flex: 1,
          marginVertical: 10
     },
     formcontrol: {
          height: HP('10%'),
          justifyContent: 'space-around',
          marginHorizontal: 5,
          marginVertical: 8
     },
     inputicon: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFF',
          elevation: 2,
          flex: 1,
          marginTop: 5,
          borderRadius: 5,
          paddingHorizontal: 5
     },
     input: {
          //height: '100%'
          flex: 1,
          marginLeft: 10
     },
     inputselect: {
          flex: 1,
          borderRadius: 5,
          backgroundColor: '#FFF',
          elevation: 3,
          marginTop: 8,
          width: '97%',
          justifyContent: 'flex-start',
          marginHorizontal: 5
     },        
     optionscontainer: {
          flexDirection: 'row',
          marginHorizontal: -5
     },
     optionsbutton: {
          backgroundColor: '#FFF',
          padding: 10,
          borderRadius: 5,
          elevation: 3,
          width: WP('21%'),
          marginHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center'
     },
     button: {
          backgroundColor: '#FA6901',
          justifyContent: 'center',
          alignItems: 'center',
          height: HP('7%'),
          borderRadius: 5,
          marginTop: 10,
          marginHorizontal: 3,
          elevation: 2
     }
})

ModalAdd.propTypes = {
     open: PropTypes.bool.isRequired,
     onClose: PropTypes.func.isRequired,
     regions: PropTypes.array.isRequired,
     add: PropTypes.func.isRequired,
     userid: PropTypes.string.isRequired,
}

export default ModalAdd;