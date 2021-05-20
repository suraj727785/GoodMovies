import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Platform, TouchableNativeFeedback,Image,ImageBackground} from 'react-native';
import Card from './card';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {Storage} from 'aws-amplify';
import {Auth,API,graphqlOperation } from 'aws-amplify';
import {listUserFriends} from '../src/newQueries';
import {getMovie} from '../src/graphql/queries';
const MovieGridTitle =(props)=>{
    const [userId,setUserId]=useState('');
    const [imageUri,setImageUri]=useState('');
    const [movie,setMovie]=useState();
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
        const movieData=await API.graphql(
          graphqlOperation(getMovie,{id: props.id})
        );
        const newMovieData=movieData.data.getMovie;
        setMovie(newMovieData);
      let image='';
      if(newMovieData.imageUri===''){
        image ='https://st2.depositphotos.com/3687485/9010/v/600/depositphotos_90102796-stock-illustration-cinema-film-clapper-board-vector.jpg';
      }
      else{
        image=await Storage.get(newMovieData.imageUri);
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
      setUserId(userInfo.attributes.sub);
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
   {movie===undefined?
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: 'https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif' }} />
        </View>:
        <TouchableCmp onPress={props.onSelect}>
      <View style={styles.touchable}>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground style={styles.image} source={{ uri: imageUri }} />
              {userId===movie.userID && 
              <View style={styles.editMovieContainer}>
                <FontAwesome onPress={()=>{props.onClickEdit(props.id)}} style={{marginLeft:5}} name="edit" size={35} color="#4a148c" />
                <MaterialIcons onPress={()=>{props.onClickDelete(props.id)}} style={{marginLeft:110}}  name="delete" size={35} color="#4a148c" />
             </View>
             }
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{movie.name}</Text>
              <Text style={styles.ratingText}>Overall Rating: <Image style={styles.ratingImage} source={require('../assets/images/star-filled.png')} />{movie.rating} ({movie.ratingCount})</Text>

              {
              props.sortBy==='Comedy'?
              <Text 
              style={styles.ratingText}
              >Comedy: <Image 
               style={styles.ratingImage} 
               source={require('../assets/images/star-filled.png')} 
               /> {movie.comedy} ({movie.comedyCount})
               </Text>:
               props.sortBy==='Romance'?
               <Text 
               style={styles.ratingText}
               >Romance: <Image 
                style={styles.ratingImage} 
                source={require('../assets/images/star-filled.png')} 
                /> {movie.romance} ({movie.romanceCount})
                </Text>:
                props.sortBy==='Action'?
                <Text 
                style={styles.ratingText}
                >Action: <Image 
                 style={styles.ratingImage} 
                 source={require('../assets/images/star-filled.png')} 
                 /> {movie.Action} ({movie.ActionCount})
                 </Text>:
                 props.sortBy==='Drama'?
                 <Text 
                 style={styles.ratingText}
                 >Drama: <Image 
                  style={styles.ratingImage} 
                  source={require('../assets/images/star-filled.png')} 
                  /> {movie.Drama} ({movie.DramaCount})
                  </Text>:
                  props.sortBy==='Thrill'?
                  <Text 
                  style={styles.ratingText}
                  >Thrill: <Image 
                   style={styles.ratingImage} 
                   source={require('../assets/images/star-filled.png')} 
                   />{movie.Thrill} ({movie.ThrillCount})
                   </Text>:
                   props.sortBy==='Horror'?
                   <Text 
                   style={styles.ratingText}
                   >Horror: <Image 
                    style={styles.ratingImage} 
                    source={require('../assets/images/star-filled.png')} 
                    /> {movie.horror} ({movie.horrorCount})
                    </Text>:
                    <Text 
                    style={styles.ratingText}
                    >Friends Rating: <Image 
                     style={styles.ratingImage} 
                     source={require('../assets/images/star-filled.png')} 
                     /> {friendRating.rating} ({friendRating.ratingCount})
                     </Text>
               }      
            </View>
          </View>
        
      </View>
      </TouchableCmp>
    }
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
      position: 'relative',
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
    },
    editMovieContainer:{
      position:'absolute',
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between'
    }
  });

export default MovieGridTitle;