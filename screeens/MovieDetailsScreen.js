import React,{useState,useEffect} from 'react';
import {View,Text,ScrollView,StyleSheet,Image,Button,Modal } from 'react-native';
import {Rating} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import {Auth,API,graphqlOperation,Storage } from 'aws-amplify';
import {getMovie,listReviews} from '../src/graphql/queries';
import {listUserFriends} from '../src/newQueries';
import {onCreateReview, onDeleteReview, onUpdateMovie, onUpdateReview} from '../src/graphql/subscriptions';
import RateAndReview from '../components/RateAndReview';
import EditRateAndReview from '../components/EditRateAndReview';
import moment from 'moment';


const MovieDetailsScreen = props=>{
    const movieId = props.navigation.getParam('movieId');
    const [selectedMovie,setSelectedMovie] = useState();
    const [imageUri,setImageUri] = useState('');
    const [addReviewModal, setAddReviewModal] = useState(false);
    const [editReviewModal, setEditReviewModal] = useState(false);
    const [myReview,setMyReview]=useState(null);
    const [reviewList,setReviewList]=useState(null);
    const [friendRating,setFriendRating]=useState({
      rating:0,
      count:0,
    });
    const [myReviewId,setMyReviewId]=useState('');
      useEffect(()=>{
        const fetchdata= async () => {
        const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
        const movieData= await API.graphql(
          graphqlOperation(getMovie,{id: movieId})
        );

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
            if(userFriend[i].review.items[j].movieID===movieId){
              rating+=userFriend[i].review.items[j].rating;
              ratingCount+=1;
            }
          }
        }
        if(rating!==0){
          rating=(rating/ratingCount).toFixed(2);
        }
        setFriendRating({
          rating:rating,
          ratingCount:ratingCount
        });
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
      setMyReview(myReviewData.data.listReviews.items[0]);
      setReviewList(allReviewData.data.listReviews.items);
      if(myReviewData.data.listReviews.items.length>0){
        setMyReviewId(myReviewData.data.listReviews.items[0].id);
      }
        }
        fetchdata();
      },[]);
      useEffect(() => {
        const subscription = API.graphql(
          graphqlOperation(onUpdateMovie)
        ).subscribe({
          next: (data) => {
            const updatedMovie = data.value.data.onUpdateMovie;
          setSelectedMovie(updatedMovie);
          }
        });
        return () => subscription.unsubscribe();
      }, []);
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
      }, []);
      useEffect(() => {
        const subscription = API.graphql(
          graphqlOperation(onUpdateReview)
        ).subscribe({
          next: (data) => {
            const newReview = data.value.data.onUpdateReview;
          setMyReview(newReview);
          }
        });
        return () => subscription.unsubscribe();
      }, []);
      useEffect(() => {
        const subscription = API.graphql(
          graphqlOperation(onDeleteReview)
        ).subscribe({
          next: (data) => {
          setMyReview();
          }
        });
        return () => subscription.unsubscribe();
      }, []);

   return(
    <ScrollView>
    <Modal
    animationType="slide"
    transparent={false}
    visible={addReviewModal}
    onRequestClose={() => {
      setAddReviewModal(!addReviewModal);
    }}>
    <RateAndReview 
    movieId={movieId}
    onChangeVisible={()=>{setAddReviewModal(!addReviewModal);}}/>
     </Modal>
     <Modal
    animationType="slide"
    transparent={false}
    visible={editReviewModal}
    onRequestClose={() => {
      setEditReviewModal(!editReviewModal);
    }}>
    <EditRateAndReview
    movieId={movieId}
    reviewId={myReviewId}
    onChangeVisible={()=>{setEditReviewModal(!editReviewModal);}}/>
     </Modal>
     {
        selectedMovie===undefined?
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        <Image style={{width:500,height:400,marginTop:150}} source={{ uri: 'https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif' }} /> 
        </View>:
    <View>
    <Image source={{uri: imageUri}} style={styles.image}/>
    <View>
         <Text style={styles.title}>{selectedMovie.name}</Text>
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Release Date:</Text>
            <Text style={styles.detailsVal}>{moment(selectedMovie.releaseDate).format(" DD-MMM-YYYY")}</Text>
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
            /> {friendRating.rating} ({friendRating.ratingCount})</Text>
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
        <Text style={styles.rateAndReviewTitle}>Rate and Review</Text>
        {myReview===null || myReview===undefined ? <View style={styles.rateAndReviewContainer}>
            <View style={styles.submitButtonContainer}>
              <Button 
              style={styles.submitButton}
              onPress={()=>{setAddReviewModal(!addReviewModal);}}
              title="Give Ratings and Review"
              color="#841584"
              accessibilityLabel="Submit Review"/>
            </View>    
        </View>:
        <View style={styles.reviewContainer}>
        <View style={styles.ratingDisplayContainer}>
          <Text style={styles.ratingDisplayTitle}>My Review <FontAwesome onPress={()=>{setEditReviewModal(!editReviewModal);}} style={{marginLeft:5}} name="edit" size={20} color="#4a148c" /></Text>
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
          marginBottom:10,
      },
      detailsTitle:{
          fontWeight:'bold',
          fontSize:18
      },
      detailsVal:{
          marginLeft:5,
          fontSize:18,
      },
      description:{
        marginLeft:5,
        fontSize:14,
        marginRight:3
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
        borderRadius:5,
        width:"93%",
        borderColor:'black',
        borderBottomWidth:0.7,
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
      rateAndReviewContainer:{
        marginBottom:10,
        marginLeft:10,
      },
      rateAndReviewTitle:{
          fontSize:18,
          marginLeft:20,
          fontWeight:'bold'
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
      editMovieContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
      }
    });



export default MovieDetailsScreen;