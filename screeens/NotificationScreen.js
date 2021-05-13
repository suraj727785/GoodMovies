import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Platform, Button,FlatList,TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/color';





const NotificationScreen = (props)=>{
    let TouchableCmp =TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21){
        TouchableCmp=TouchableNativeFeedback; 
    }



    
    const [sendLocation,setSendLocation]= useState(false);

    return(
        <View>
          <View style={styles.borderTop}>
          <Text style={styles.note}>No new Notification! </Text>
          </View>

       </View>
    );
}



const styles = StyleSheet.create({
  product: {
    height: 50,
    margin: 3
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  result: {
    marginVertical: 2,
    marginHorizontal:2,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 28,
    color: '#789',
    paddingLeft:15,
  },
  header:{
    fontFamily:'open-sans',
    fontSize:19,
    color:Colors.accentColor
  },
  note:{
    fontSize:18,
    color:'#888',
  },
  borderTop:{
    marginBottom:5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  }

});

export default NotificationScreen;