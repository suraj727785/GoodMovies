import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Platform, TouchableNativeFeedback,Image} from 'react-native';
import Card from './card';
import {Storage} from 'aws-amplify';
import {Auth,API,graphqlOperation } from 'aws-amplify';
import {listUserFriends} from '../src/newQueries';
const MovieGridTitle =(props)=>{
    const [imageUri,setImageUri]=useState('');
    const [friendRating,setFriendRating]=useState({
      rating:0,
      count:0,
    });
    let TouchableCmp =TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21){
        TouchableCmp=TouchableNativeFeedback;
    }
    useEffect(()=>{
      const fetchImage= async () => {
      let image='';
      if(props.image===''){
        image ='https://st2.depositphotos.com/3687485/9010/v/600/depositphotos_90102796-stock-illustration-cinema-film-clapper-board-vector.jpg';
      }
      else{
        image=await Storage.get(props.image);
      }
      setImageUri(image);
      
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
      const userFriendData = await API.graphql(
        graphqlOperation(
          listUserFriends,{
          filter: {userID: {contains: userInfo.attributes.sub}}
          }
        )
      );
      const userFriend=userFriendData.data.listUserFriends.items;
      var rating=0,ratingCount=0;
      for (var i=0;i<userFriend.length;i++){
        for(var j=0;j<userFriend[i].review.items.length;j++){
          if(userFriend[i].review.items[j].movieID===props.id){
            rating+=userFriend[i].review.items[j].rating;
            ratingCount+=1;
          }
        }
      }
      if(rating!==0){
        rating=rating/ratingCount.toFixed(2);
      }
      setFriendRating({
        rating:rating,
        ratingCount:ratingCount
      });

      }
      fetchImage();
    },[]);

    return <Card style={styles.product}>
        <TouchableCmp onPress={props.onSelect}>
      <View style={styles.touchable}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: imageUri }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.ratingText}>Overall Rating: <Image style={styles.ratingImage} source={require('../assets/images/star-filled.png')} />{props.overallRating} ({props.overallRatingCount})</Text>
              <Text style={styles.ratingText}>Friends Rating: <Image style={styles.ratingImage} source={require('../assets/images/star-filled.png')} /> {friendRating.rating} ({friendRating.ratingCount})</Text>            
            </View>
          </View>
        
      </View>
      </TouchableCmp>
    </Card>
    ;


}


const styles = StyleSheet.create({
    product: {
      height: 250,
      marginVertical: 8,
      marginHorizontal:5,
      width:'47%',
    },
    touchable: {
      borderRadius: 10,
      overflow: 'hidden'
    },
    imageContainer: {
      width: '100%',
      height: '70%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      alignItems: 'center',
      height: '22%',
    },
    title: {
      fontWeight:'bold',
      fontSize: 15,
      marginTop: 2,
      marginBottom:4,
      marginLeft:2
    },
    ratingImage:{
      width:13,
      height:12,
      alignSelf:'flex-start'
    },
    ratingText:{
      fontSize: 14,
      marginLeft:5,
      alignSelf:'flex-start'
    }
  });

export default MovieGridTitle;