import React, { useState,useEffect} from 'react';
import {Text,View,StyleSheet, Image,TouchableWithoutFeedback} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Auth,API,graphqlOperation } from 'aws-amplify';
import { createUserFriend,deleteUserFriend } from '../src/graphql/mutations';
import {onCreateUserFriend,onDeleteUserFriend} from '../src/graphql/subscriptions';
import { listUserFriends } from '../src/graphql/queries';



const FriendsListItem = (props) =>{
    const [userId,setUserId]=useState('');
    try{
        useEffect(()=>{
          const fetchUser= async () => {
            const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});   
            setUserId(userInfo.attributes.sub)     
          }
          fetchUser();
        },[]);
        
    useEffect(() => {
        const createFriendsubscription = API.graphql(
          graphqlOperation(onCreateUserFriend)
        ).subscribe({
          next: (data) => {
          }
        }); 
        return () => createFriendsubscription.unsubscribe();
      }, []);

      useEffect(() => {
        const deleteFriendsubscription = API.graphql(
          graphqlOperation(onDeleteUserFriend)
        ).subscribe({
          next: (data) => {
          }
        }); 
        return () => deleteFriendsubscription.unsubscribe();
      }, []);

      }catch(e){
        console.log(e);
      }
    const addFriend=async()=>{
        await API.graphql(
            graphqlOperation(
                createUserFriend,{
                    input:{
                        userID:userId,
                        friendUserID:props.id,
                        name:props.name,
                        email:props.email,
                        mobileNo:props.mobileNo
                    }
                }
            )
        );
        props.onAddFriend();
    }
    const removeFriend=async()=>{
        await API.graphql(
            graphqlOperation(
                deleteUserFriend,{
                    input:{
                        id:props.id,
                    }
                }
            )
        );
        props.onRemoveFriend();
    }
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
                <Entypo onPress={addFriend} name="add-user" size={32} color="black" />:
                <Entypo onPress={removeFriend} name="remove-user" size={32} color="black" />
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