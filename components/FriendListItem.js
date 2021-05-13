import React, { useState } from 'react';
import {Text,View,StyleSheet, Image,TouchableWithoutFeedback} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 



const FriendsListItem = (props) =>{
       return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{uri:props.imageUri}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{props.name}</Text>
                </View>
            </View>
            <View>
                {props.page=='addFriends'?
                <Entypo name="add-user" size={32} color="black" />:
                <Entypo name="remove-user" size={32} color="black" />
                } 
            </View>
            </View>
        </TouchableWithoutFeedback>
        
       );

};

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        borderBottomWidth:0.5,
    },
    leftContainer:{
        flexDirection:'row',
    },
    midContainer:{
    justifyContent:'space-around',
    },
    username:{
        fontWeight:'bold',
        fontSize:16,
    },
    
    avatar:{
        height:50,
        width:50,
        marginHorizontal:15,
        borderRadius: 25,
    },
    status:{
        fontSize:14,
        color:'grey',
    },
});

export default FriendsListItem;