import React,{useState,useEffect} from 'react';
import {View,Text,ScrollView,StyleSheet,Image,TextInput, Button,Modal } from 'react-native';
import {Rating} from 'react-native-elements';
import {Auth,API,graphqlOperation,Storage } from 'aws-amplify';
import {getMovie,listReviews} from '../src/graphql/queries';
import {onCreateReview} from '../src/graphql/subscriptions';
import RateAndReview from '../components/RateAndReview';

const MovieDetailsScreen = props=>{
    const movieId = props.navigation.getParam('movieId');
    const [selectedMovie,setSelectedMovie] = useState();
    const [imageUri,setImageUri] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [myReview,setMyReview]=useState(null);
    const [reviewList,setReviewList]=useState(null);
      useEffect(()=>{
        const fetchdata= async () => {
        const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
        const movieData= await API.graphql(
          graphqlOperation(getMovie,{id: movieId})
        );
      // console.log(movieData.data.getMovie);
      setSelectedMovie(movieData.data.getMovie);
      let image='';
      if(movieData.data.getMovie.imageUri===''){
        image ='https://st2.depositphotos.com/3687485/9010/v/600/depositphotos_90102796-stock-illustration-cinema-film-clapper-board-vector.jpg';
      }
      else{
        image=await Storage.get(movieData.data.getMovie.imageUri);
      }
      setImageUri(image);
      const myReviewData= await API.graphql(
        graphqlOperation(
          listReviews,{
            filter: 
            {movieID: {contains: movieId}, and: {userID: {contains: userInfo.attributes.sub}}
        }
      })
      );
      const allReviewData= await API.graphql(
        graphqlOperation(
          listReviews,{
            filter: 
            {movieID: {contains: movieId}, and: {userID: {notContains: userInfo.attributes.sub}}
        }
      })
      );
      console.log(myReviewData.data.listReviews.items[0]);
      setMyReview(myReviewData.data.listReviews.items[0]);
      setReviewList(allReviewData.data.listReviews.items);
        }
        fetchdata();
      },[]);
      
      useEffect(() => {
        const subscription = API.graphql(
          graphqlOperation(onCreateReview)
        ).subscribe({
          next: (data) => {
            const newReview = data.value.data.onCreateReview;
          setMyReview(newReview);
          }
        });
    
        return () => subscription.unsubscribe();
      }, [])

   return(
    <ScrollView>
      {
        selectedMovie==null?<Image source={{uri: 'https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg'}} style={styles.loadingImage}/> 
    :<View>
    <Modal
    animationType="slide"
    transparent={false}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <RateAndReview 
    movieId={movieId}
    onChangeVisible={()=>{setModalVisible(!modalVisible);}}/>
     </Modal>
    <Image source={{uri: imageUri}} style={styles.image}/>
    <View>
         <Text style={styles.title}>{selectedMovie.name}</Text>
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Release Date:</Text>
            <Text style={styles.detailsVal}>{selectedMovie.releaseDate}</Text>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Language:</Text>
            <Text style={styles.detailsVal}>{selectedMovie.language}</Text>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Cast:</Text>
            <Text style={styles.detailsVal}>{selectedMovie.cast}</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={styles.detailsTitle}>About Movie:</Text>
            <Text style={styles.description}>{selectedMovie.aboutMovie}</Text>
        </View> 
        <View style={styles.ratingsContainer}>
            <Text style={styles.ratingText}>Overall Rating: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> {selectedMovie.rating}({selectedMovie.ratingCount})</Text>
            <Text style={styles.ratingText}>Friends Rating: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> 7.8(5)</Text>
        </View>
        <View style={styles.genreRatingsContainer}>
            <Text style={styles.genreRatingsTitle}>Ratings on different Genre:</Text>
            <Text style={styles.genreRatingText}>Comedy: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> {selectedMovie.comedy}({selectedMovie.comedyCount})</Text>
            <Text style={styles.genreRatingText}>Romance: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> {selectedMovie.romance}({selectedMovie.romanceCount})</Text>
            <Text style={styles.genreRatingText}>Drama: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> {selectedMovie.Drama}({selectedMovie.DramaCount})</Text>
            <Text style={styles.genreRatingText}>Action: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> {selectedMovie.Action}({selectedMovie.ActionCount})</Text>
            <Text style={styles.genreRatingText}>Thriller: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> {selectedMovie.Thrill}({selectedMovie.ThrillCount})</Text>
            <Text style={styles.genreRatingText}>Horror: <Image 
            style={styles.ratingImage} 
            source={require('../assets/images/star-filled.png')} 
            /> {selectedMovie.horror}({selectedMovie.horrorCount})</Text>
        </View>
        {myReview===null || myReview===undefined ? <View style={styles.rateAndReviewContainer}>
            <Text style={styles.rateAndReviewTitle}>Rate and Review</Text>
            <View style={styles.submitButtonContainer}>
              <Button 
              style={styles.submitButton}
              onPress={()=>{setModalVisible(!modalVisible);}}
              title="Give Ratings and Review"
              color="#841584"
              accessibilityLabel="Submit Review"/>
            </View>    
        </View>:
        <View style={styles.reviewContainer}>
        <View style={styles.ratingDisplayContainer}>
          <Text style={styles.ratingDisplayTitle}>My Review</Text>
            <Rating readonly type='custom' tintColor="#e4ebed" style={{marginTop:8}} ratingCount={10} startingValue={myReview.rating} imageSize={26}/>
         </View>
         <Text style={styles.reviewText}>{myReview.reviewContent}</Text>
         </View>
        }
        {reviewList!==null && reviewList.length!==0 &&
        reviewList.map(rev => <View style={styles.reviewContainer}>
        <View style={styles.ratingDisplayContainer}>
          <Text style={styles.ratingDisplayTitle}>{rev.userName}</Text>
          <Rating readonly type='custom' tintColor="#e4ebed" style={{marginTop:8}} ratingCount={10} startingValue={rev.rating} imageSize={26}/>
         </View>
         <Text style={styles.reviewText}>{rev.reviewContent}</Text>
        </View>
        )
        }
    </View>
    </View>
}
    </ScrollView>
   );

};

const styles =StyleSheet.create({
    image:{
         width:'100%',
         height:250
    },
      title: {
        alignSelf:'center',
        fontWeight:'bold',
        fontSize: 28,
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
        fontWeight:'bold',
        fontSize: 16,
        marginRight:10,
        alignSelf:'flex-start'
      },
      genreRatingText:{
        fontWeight:'bold',
        fontSize: 16,
        marginRight:10,
        marginBottom:8,
        alignSelf:'flex-start'
      },
      genreRatingsTitle:{
        fontWeight:'bold',
        fontSize: 18,
        marginBottom:6,
      },
      releaseDate:{
          fontSize:18,
          alignSelf:'flex-start',
          marginLeft:10,
          marginBottom:10
      },
      detailsContainer:{
          flexDirection:'row',
          alignSelf:'flex-start',
          marginLeft:10,
          marginBottom:10
      },
      detailsTitle:{
          fontWeight:'bold',
          fontSize:18
      },
      detailsVal:{
          marginLeft:5,
          fontSize:18
      },
      description:{
        marginLeft:5,
        fontSize:14
      },
      descriptionContainer:{
        alignSelf:'flex-start',
          marginLeft:10,
          marginBottom:10  
      },
      ratingsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:10,
        marginBottom:10
      },
      genreRatingsContainer:{
        marginLeft:10,
        marginBottom:10
      },

      reviewContainer:{
        padding:10,
        marginTop:15,
        borderRadius:5,
        width:"93%",
        borderColor:'black',
        borderTopWidth:0.7,
        alignSelf:'center'
      },
      ratingDisplayContainer:{
        flexDirection:'row',
        marginBottom:4,
        justifyContent:'space-between',
        marginRight:20,
      },
      ratingDisplayTitle:{
        fontSize:16,
        marginTop:10,
        marginRight:5,
      },
      reviewText:{
        fontSize:15,
      },
      loadingImage:{
        height:'100%',
        width:'100%',
        alignSelf:'center',
        justifyContent:'center'
      },
      rateAndReviewContainer:{
        marginBottom:10,
        marginLeft:10,
      },
      rateAndReviewTitle:{
          fontSize:18,
          
      },
      submitButtonContainer:{
        marginTop:10,
        justifyContent:'space-between',
        marginRight:12,
        flexDirection:'row'
      },
      submitButton:{
        borderRadius:30,
        marginRight:30
      },
    });



export default MovieDetailsScreen;