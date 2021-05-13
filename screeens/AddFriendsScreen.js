import React,{useEffect} from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import users from '../data/Users';
import FriendListItem from '../components/FriendListItem'; 
import * as Contacts from 'expo-contacts'; 

const AddFriendsScreen=()=>{
    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers],
            });
    
            if (data.length > 0) {
              console.log(data);
            }
          }
        })();
      }, []);
    return (
        <View style={styles.container}>
        <FlatList
        style={{width:'100%'}}
         keyExtractor={users=>users.id}
         data={users}
         renderItem={({item})=>{
             return <FriendListItem
             page='addFriends'
             name={item.name}
             imageUri={item.imageUri} />
         }}/>
         </View>
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AddFriendsScreen;