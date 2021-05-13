import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Platform, TouchableNativeFeedback,Image} from 'react-native';
import Card from './card';
const MovieGridTitle =(props)=>{
    let TouchableCmp =TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21){
        TouchableCmp=TouchableNativeFeedback;
    }
    return <Card style={styles.product}>
        <TouchableCmp onPress={props.onSelect}>
      <View style={styles.touchable}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.ratingText}>Overall Rating: <Image style={styles.ratingImage} source={require('../assets/images/star-filled.png')} />{props.overallRating}</Text>
              <Text style={styles.ratingText}>Friends Rating: <Image style={styles.ratingImage} source={require('../assets/images/star-filled.png')} /> 7.8</Text>            
            </View>
          </View>
        
      </View>
      </TouchableCmp>
    </Card>
    ;


}


const styles = StyleSheet.create({
    product: {
      height: 250,
      marginVertical: 8,
      marginHorizontal:5,
      width:'47%',
    },
    touchable: {
      borderRadius: 10,
      overflow: 'hidden'
    },
    imageContainer: {
      width: '100%',
      height: '70%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      alignItems: 'center',
      height: '22%',
    },
    title: {
      fontWeight:'bold',
      fontSize: 15,
      marginTop: 2,
      marginBottom:4,
      marginLeft:2
    },
    ratingImage:{
      width:13,
      height:12,
      alignSelf:'flex-start'
    },
    ratingText:{
      fontSize: 14,
      marginLeft:5,
      alignSelf:'flex-start'
    }
  });

export default MovieGridTitle;