import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const DetailScreen = ({ navigation }) => {
    return(
        <LinearGradient
            style={styles.container}
            colors={['#FA6901', '#FA6901', '#D81919']}
        >
            <Text>Detail Screen</Text>
            <Button
                title="Back"
                onPress={() => navigation.goBack()}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default DetailScreen;