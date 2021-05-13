import React from 'react';
import { View, StyleSheet,Text,Image } from 'react-native';

const RatingStar =()=>{
    return (
        <View style={styles.ratingStarContainer}>
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
            <Image 
            style={styles.ratingStarImage} 
            source={require('../assets/images/star-unfilled.png')} 
            />
        </View>       
    );
}
const styles =StyleSheet.create({
    ratingStarContainer:{
        flexDirection:'row',
        marginTop:10,
      },
      ratingStarImage:{
        width:22,
        height:22,
        marginHorizontal:1.5,
      },
});
export default RatingStar;

