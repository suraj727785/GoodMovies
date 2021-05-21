import React,{useEffect, useState} from 'react';
import {Text,View,StyleSheet,TextInput, ImageBackground,Alert} from 'react-native';
import { FontAwesome,Ionicons} from '@expo/vector-icons';
import {API,Auth,graphqlOperation,Storage} from 'aws-amplify';
import {getUser} from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';
import * as ImagePicker from 'expo-image-picker';

const ViewProfileScreen=()=>{
    const [nameEdit,setNameEdit]=useState(false);
    const [image,setImage]=useState('https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png');
    const [userId,setUserId]=useState('');
    const [userName,setUserName]=useState('');
    const [userMobNo,setUserMobNo]=useState();
    const [userEmail,setUserEmail]=useState('');
    useEffect(()=>{
        const fetchUser=async()=>{
            const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
            const userData= await API.graphql(
              graphqlOperation(getUser,{id: userInfo.attributes.sub})
            );
            setUserId(userData.data.getUser.id);
            setUserName(userData.data.getUser.name);
            setUserMobNo(userData.data.getUser.mobileNo);
            setUserEmail(userData.data.getUser.email);
            if(userData.data.getUser.imageUri!==''){
            const imageUri= await Storage.get(userData.data.getUser.imageUri);
            setImage(imageUri);
            }

        }
    fetchUser();
    },[]);
    const changeUserName=async()=>{
        await API.graphql(
            graphqlOperation(
                updateUser,
                {input:
                    {
                        id:userId,
                        name:userName  
                    }
                }
            ));

        setNameEdit(!nameEdit);
    }
    const editProfileImageAlert=()=>{
        Alert.alert(
            "Change profile picture",
            "Want to change your profile picture?",
            [
            {
                text: "Cancel",
                onPress: () => ("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => changeProfilePicture() }
            ]
        );
    }
    const changeProfilePicture=async()=>{
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
          });
    
          if (!result.cancelled) {
            setImage(result.uri);
          }
        let imageName='';
        if(image!==null){
            const response = await fetch(result.uri)
            const blob = await response.blob() // format the data for images
            const fileName = `${userId}${userName}.jpg`
            await Storage.put(fileName, blob, {
            contentType: 'image/jpeg',
            level: 'public'
            });
            imageName=`${userId}${userName}.jpg`;
        }
        await API.graphql(
            graphqlOperation(
                updateUser,
                {input:
                    {
                        id:userId,
                        imageUri:imageName  
                    }
                }
            ));

    }
    return (
        <View style={styles.container}>
            <View style={styles.profileImage}>
            <ImageBackground
            source={{uri:image}} 
            style={styles.profileImage}
            imageStyle={{ borderRadius: 125}}
            />
            <FontAwesome 
                style={styles.profileImageEdit} 
                name="edit" size={30} 
                color="black"
                onPress={editProfileImageAlert} 
            />
            </View>
            {nameEdit?
            <View style={styles.profileNameContainer}>
                <TextInput style={styles.profileName}
                placeholder='Your name'
                value={userName}
                onChangeText={(val)=>{setUserName(val)}}
                 />
                <Ionicons
                style={styles.profileNameEdit} 
                name="checkmark-done-circle" 
                size={30} 
                color="black" 
                onPress={changeUserName} 
                />
            </View>
            :
            <View style={styles.profileNameContainer}>
                <Text style={styles.profileName}>{userName}</Text>
                <FontAwesome 
                style={styles.profileNameEdit} 
                name="edit" size={30} 
                color="black"
                onPress={()=>{setNameEdit(!nameEdit)}} 
                />
            </View>
            }
            <View style={styles.contactsContainer}>
                <Text style={styles.contactsText}>{userEmail} | </Text>
                <Text style={styles.contactsText}>{userMobNo}</Text>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:10,

    },
    profileImage:{
        height:250,
        width:250,
        marginHorizontal:15,
        alignSelf:'center',
        position:'relative'
    },
    profileNameContainer:{
        alignSelf:'center',
        flexDirection:'row'
    },
    profileName:{
        fontSize:38,
        color:'grey',
    },
    profileNameEdit:{
        marginLeft:8,
        marginTop:13,
    },
    profileImageEdit:{
        position:'absolute',
        alignSelf:'flex-end',
        marginTop:40,
        paddingRight:30
    },
    contactsContainer:{
        flexDirection:'row',
        alignSelf:'center',
    },
    contactsText:{
        fontSize:18,
        color:'grey'
    }
})

export default ViewProfileScreen;