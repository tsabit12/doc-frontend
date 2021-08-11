import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const DetailScreen = ({ navigation }) => {
    return(
        <View style={{...styles.container, backgroundColor: '#AAAAAA'}}>
            <Text>Detail Screen</Text>
            <Button
                title="Back"
                onPress={() => navigation.goBack()}
            />
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
  });
  

export default DetailScreen;