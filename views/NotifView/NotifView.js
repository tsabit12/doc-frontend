import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GradientLayout } from "../components";
import { HP, WP } from "../config/layout";

const NotifView = () => {
     return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E7E7E7'}}>
               <Image 
                    source={require('../../assets/images/no_notif.png')}
                    style={styles.image}
                    resizeMode='contain'
               />
               <Text>No Notification yet!</Text>
               <Text style={{marginTop: 5}}>"We'll notify you once we have something for you"</Text>
          </View>
     )
}

const styles = StyleSheet.create({
     image: {
          width: WP('70%'),
          height: HP('20%')
     }
})

export default NotifView;