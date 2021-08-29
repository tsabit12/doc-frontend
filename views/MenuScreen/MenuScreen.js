import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { 
    CloseOutlined as CloseOutlinedIcon, 
    Search as SearchIcon,
    Book as BookIcon
} from '../../icons';
import { GradientLayout, HeaderLayout } from '../components';
import { HP, WP } from '../config/layout';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const menus = [
    { id: '1', title: 'Produksi Kiriman', subtitle: 'Pengawasan Produksi Kiriman', route: 'ProduksiKiriman'},
    { id: '5', title: 'Kiriman Jatuh Tempo', subtitle: '', route: 'JatuhTempo'},
    { id: '3', title: 'Kiriman Menginap', subtitle: 'Pengendalian Kiriman Potensi Menginap', route: 'Irregulaity' },
    { id: '4', title: 'Kiriman Terbuka', subtitle: 'Pengendalian Kiriman Terbuka', route: 'ProduksiKiriman'},
    { id: '6', title: 'Kiriman Irregularitas', subtitle: 'Pengendalian kiriman irregularitas', route: 'Irregulaity'},
]

const MenuScreen = ({ navigation, sessions }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.listcontent} 
            activeOpacity={0.8}
            onPress={() => navigation.replace(item.route, { 
                title: item.title,
                subtitle: item.subtitle
            })}
        >
            <BookIcon />
            <View style={styles.list}>
                <Text style={styles.title}>{item.title}</Text>
                { item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : <React.Fragment /> }
            </View>
        </TouchableOpacity>
    );

    const header = () => (
        <React.Fragment>
            <HeaderLayout 
                title={ <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CloseOutlinedIcon />
                    </TouchableOpacity> }
            />
            <View style={styles.profile}>
                <Image 
                    source={require('../../assets/images/profile.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.fullname} numberOfLines={1}>{ sessions.fullname }</Text>
            </View>
            <View style={styles.center}>
                <View style={styles.inputbutton}>
                    <TextInput 
                        placeholder='Search menu...'
                        placeholderTextColor='#AEABAB'
                        style={{ height: '100%', flex: 1}}
                    />
                    <View style={{marginLeft: 5}}>
                        <SearchIcon />
                    </View>
                </View>
            </View>
        </React.Fragment>
    )

    return(
        <GradientLayout>
            <View style={styles.content}>
                <FlatList
                    data={menus}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={header}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={styles.footer}>
                        <Text style={styles.version}>Current version { Constants.manifest.version }</Text>
                    </View>}
                />
            </View>            
        </GradientLayout>
    )
}

const styles = StyleSheet.create({
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },  
    image: {
        width: WP('25%'),
        height: WP('25%')
    },
    fullname: {
        marginTop: 8,
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: RFValue(20)
    },
    content: {
        flex: 1
    },
    inputbutton: {
        backgroundColor: '#FFF',
        height: HP('6%'),
        alignItems: 'center',
        flexDirection: 'row',
        width: WP('75%'),
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 4,
        marginTop: 10,
        marginBottom: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    listcontent: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    list: {
        marginLeft: 10
    },
    title: {
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(15)
    },
    subtitle: {
        color: "#FFF",
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(11)
    },
    footer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    version: {
        color: '#FFF',
        textAlign: 'center'
    }
})

MenuScreen.propTypes = {
    sessions: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
}

function mapStateToProps(state){
    return {
        sessions: state.sessions
    }
}

export default connect(mapStateToProps, null)(MenuScreen);