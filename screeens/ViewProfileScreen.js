import React,{useState} from 'react';
import {Text,View,StyleSheet,Image,TextInput} from 'react-native';
import { FontAwesome,Ionicons} from '@expo/vector-icons';

const ViewProfileScreen=()=>{
    const [nameEdit,setNameEdit]=useState(false);
    return (
        <View style={styles.container}>
            <Image 
            source={{uri:'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'}} 
            style={styles.profileImage}/>
            {nameEdit?
            <View style={styles.profileNameContainer}>
                <TextInput style={styles.profileName}
                placeholder={'Suraj Kumar'}
                value='Suraj Kumar' />
                <Ionicons
                style={styles.profileNameEdit} 
                name="checkmark-done-circle" 
                size={30} 
                color="black" 
                onPress={()=>{setNameEdit(!nameEdit)}} 
                />
            </View>
            :
            <View style={styles.profileNameContainer}>
                <Text style={styles.profileName}>Suraj Kumar</Text>
                <FontAwesome 
                style={styles.profileNameEdit} 
                name="edit" size={30} 
                color="black"
                onPress={()=>{setNameEdit(!nameEdit)}} 
                />
            </View>
            }
            <View style={styles.contactsContainer}>
                <Text style={styles.contactsText}>surajkr727785@gmail.com | </Text>
                <Text style={styles.contactsText}>9162741700</Text>
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
        borderRadius: 125,
        alignSelf:'center'
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