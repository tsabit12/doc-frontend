import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={{...styles.container}}>
            <Text style={styles.txt}>DIGITAL OPERATION {`\n`}CONTROL</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    txt: {
        fontFamily: 'Saira-Condensed',
        fontWeight: '400',
        lineHeight: 44,
        fontSize: 30,
        textAlign: 'center'
    }
  });
  

export default HomeScreen;