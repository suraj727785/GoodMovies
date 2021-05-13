import React from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import users from '../data/Users';
import FriendListItem from '../components/FriendListItem';

const ViewFriendsScreen=()=>{
    return (
        <View style={styles.container}>
        <FlatList
        style={{width:'100%'}}
         keyExtractor={users=>users.id}
         data={users}
         renderItem={({item})=>{
             return <FriendListItem
             page='viewFriends'
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

export default ViewFriendsScreen;