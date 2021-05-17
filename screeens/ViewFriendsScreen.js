import React,{useState,useEffect,useCallback} from 'react';
import {Text,View,StyleSheet,FlatList,ScrollView,RefreshControl} from 'react-native';
import FriendListItem from '../components/FriendListItem';
import {API,Auth,graphqlOperation} from 'aws-amplify';
import {listUserFriends} from '../src/graphql/queries';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const ViewFriendsScreen=()=>{
  const [friendList,setFriendList]=useState();
  const [refreshing, setRefreshing] =useState(false);

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
    const friendsData= await API.graphql(
      graphqlOperation(listUserFriends,{
        filter: 
        {userID: {contains: userInfo.attributes.sub}}
    })); 
  setFriendList(friendsData.data.listUserFriends.items); 
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(()=>{
    const fetchFriends=async()=>{
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
      const friendsData= await API.graphql(
        graphqlOperation(listUserFriends,{
          filter: 
          {userID: {contains: userInfo.attributes.sub}}
    })); 
    setFriendList(friendsData.data.listUserFriends.items);
    }
    fetchFriends();
  },[])
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
         data={friendList}
         renderItem={({item})=>{
             return <FriendListItem
             page='viewFriends'
             id={item.id}
             name={item.name}
             email={item.email}
             mobileNo={item.mobileNo}
             imageUri={item.imageUri}
             onRemoveFriend={onRefresh} />
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

export default ViewFriendsScreen;