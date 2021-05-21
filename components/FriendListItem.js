import React, { useState,useEffect} from 'react';
import {Text,View,StyleSheet, Image,TouchableWithoutFeedback} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Auth,API,graphqlOperation,Storage } from 'aws-amplify';
import { createUserFriend,deleteUserFriend } from '../src/graphql/mutations';
import {onCreateUserFriend,onDeleteUserFriend} from '../src/graphql/subscriptions';



const FriendsListItem = (props) =>{
    const [userId,setUserId]=useState('');
    const [image,setImage]=useState('https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png');
    try{
        useEffect(()=>{
          const fetchUser= async () => {
            const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});   
            setUserId(userInfo.attributes.sub);
            if(props.imageUri!==''){
            const imageUri= await Storage.get(props.imageUri);
            setImage(imageUri);
            }
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
                        mobileNo:props.mobileNo,
                        imageUri:props.imageUri
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
                <Image source={{uri:image}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{props.name}</Text>
                    <Text numberOfLines={2} style={styles.mobileNo}>{props.mobileNo}</Text>
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
    mobileNo:{
        fontSize:14,
        color:'grey',
    },
});

export default FriendsListItem;