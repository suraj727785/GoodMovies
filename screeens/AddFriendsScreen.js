import React,{useEffect, useState,useCallback} from 'react';
import {View,StyleSheet,FlatList,ScrollView,RefreshControl} from 'react-native';
import FriendListItem from '../components/FriendListItem'; 
import * as Contacts from 'expo-contacts'; 
import {API,Auth,graphqlOperation} from 'aws-amplify';
import {listUsers,listUserFriends} from '../src/graphql/queries';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const AddFriendsScreen=()=>{
  const [users,setUsers]=useState();
  const [refreshing, setRefreshing] =useState(false);
  const onRefresh = useCallback(async() => {
    setRefreshing(true);
        const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});  
        const usersData= await API.graphql(
          graphqlOperation(listUsers,{
            filter: 
            {id: {notContains: userInfo.attributes.sub}}
      }));
      const allUsers=usersData.data.listUsers.items;
      const friendsData= await API.graphql(
        graphqlOperation(listUserFriends,{
          filter: 
          {userID: {contains: userInfo.attributes.sub}}
    }));
      const friendUser = friendsData.data.listUserFriends.items;
        // console.log(allUsers);
        // console.log(friendUser);
        const addFriendsList=allUsers.filter(function(obj) {
          return !friendUser.some(function(obj2) {
              return obj.id == obj2.friendUserID;
          });
      });
      // console.log(addFriendsList);

        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
              const filterUser=[];
              for (var i = 0; i < addFriendsList.length; i++) {
                for (var j = 0; j < data.length; j++) {
                  if(data[j].phoneNumbers){
                    if (addFriendsList[i].mobileNo.replace(/\s+/g, '').includes(data[j].phoneNumbers[0].number.replace(/\s+/g, ''))) {
                      filterUser.push(addFriendsList[i]);
                    }
                  }
                }
            };   
            setUsers(filterUser);
          };
    wait(2000).then(() => setRefreshing(false));
  }, []);

    useEffect(()=>{
      const fetchFriends= async () => {
        const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});  
        const usersData= await API.graphql(
          graphqlOperation(listUsers,{
            filter: 
            {id: {notContains: userInfo.attributes.sub}}
      }));
      const allUsers=usersData.data.listUsers.items;
      const friendsData= await API.graphql(
        graphqlOperation(listUserFriends,{
          filter: 
          {userID: {contains: userInfo.attributes.sub}}
    }));
      const friendUser = friendsData.data.listUserFriends.items;
        // console.log(allUsers);
        // console.log(friendUser);
        const addFriendsList=allUsers.filter(function(obj) {
          return !friendUser.some(function(obj2) {
              return obj.id == obj2.friendUserID;
          });
      });
      // console.log(addFriendsList);

        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
              const filterUser=[];
              for (var i = 0; i < addFriendsList.length; i++) {
                for (var j = 0; j < data.length; j++) {
                  if(data[j].phoneNumbers){
                    if (addFriendsList[i].mobileNo.replace(/\s+/g, '').includes(data[j].phoneNumbers[0].number.replace(/\s+/g, ''))) {
                      filterUser.push(addFriendsList[i]);
                    }
                  }
                }
            };   
            setUsers(filterUser);
          };
          }
          fetchFriends();
    },[]);
    return (
        <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
        } >
        <FlatList
        style={{width:'100%'}}
         keyExtractor={users=>users.id}
         data={users}
         renderItem={({item})=>{
             return <FriendListItem
             page='addFriends'
             id={item.id}
             name={item.name}
             email={item.email}
             mobileNo={item.mobileNo}
             imageUri={item.imageUri}
             onAddFriend={onRefresh}
              />
         }}/>
         </ScrollView>
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