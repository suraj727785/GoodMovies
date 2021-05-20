import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,TextInput,Button,TouchableOpacity,Alert} from 'react-native';
import {Rating} from 'react-native-elements';
import {API,graphqlOperation} from 'aws-amplify';
import {deleteReview, updateMovie,updateReview} from '../src/graphql/mutations';
import {getMovie, getReview} from '../src/graphql/queries';
const EditRateAndReview = (props) =>{
  const movieId=props.movieId;
  const [movieDetails,setMovieDetails]=useState(null);
  const [reviewDetails,setReviewDetails]=useState();
  const [rating,setRating]=useState(0);
  const [comedy,setComedy]=useState(0);
  const [romance,setRomance]=useState(0);
  const [action,setAction]=useState(0);
  const [thrill,setThrill]=useState(0);
  const [drama,setDrama]=useState(0);
  const [horror,setHorror]=useState(0);
  const [review,setReview]=useState('');
      try{
        useEffect(()=>{
          const fetchReview= async () => {
        const movie = await API.graphql(
        graphqlOperation(getMovie,{id: movieId})
        );
        const reviewData = await API.graphql(
          graphqlOperation(getReview,{id: props.reviewId})
        );
        setRating(reviewData.data.getReview.rating);
        setComedy(reviewData.data.getReview.comedy);
        setAction(reviewData.data.getReview.Action);
        setThrill(reviewData.data.getReview.Thrill);
        setHorror(reviewData.data.getReview.horror);
        setRomance(reviewData.data.getReview.romance);
        setDrama(reviewData.data.getReview.Drama);
        setReview(reviewData.data.getReview.reviewContent);
        setMovieDetails(movie.data.getMovie);
        setReviewDetails(reviewData.data.getReview);
          }
          fetchReview();
        },[]);
      }catch(e){
        console.log(e);
      }
  const updateRatingAndReview=async()=>{
    await API.graphql(
      graphqlOperation(
        updateReview,{
          input:{
            id:props.reviewId,
            rating:rating,
            comedy:comedy,
            romance:romance,
            Action:action,
            Thrill:thrill,
            horror:horror,
            Drama:drama,
            reviewContent:review
          }
        }
      )
    );
    if(reviewDetails.comedy===0){    
    if(comedy!==0){
      movieDetails.comedy=((movieDetails.comedy*movieDetails.comedyCount)+comedy)/(movieDetails.comedyCount+1);
      movieDetails.comedy=movieDetails.comedy.toFixed(2);
      movieDetails.comedyCount=movieDetails.comedyCount+1;
    }}else{
      if(comedy!==0){
        movieDetails.comedy=((movieDetails.comedy*movieDetails.comedyCount)-reviewDetails.comedy+comedy)/(movieDetails.comedyCount);
        movieDetails.comedy=movieDetails.comedy.toFixed(2);
      }else{
        movieDetails.comedy=((movieDetails.comedy*movieDetails.comedyCount)-reviewDetails.comedy)/(movieDetails.comedyCount-1);
        movieDetails.comedy=movieDetails.comedy.toFixed(2);
        movieDetails.comedyCount=movieDetails.comedyCount-1;
      } 
    }
    if(reviewDetails.horror===0){    
      if(horror!==0){
        movieDetails.horror=((movieDetails.horror*movieDetails.horrorCount)+horror)/(movieDetails.horrorCount+1);
        movieDetails.horror=movieDetails.horror.toFixed(2);
        movieDetails.horrorCount=movieDetails.horrorCount+1;
      }}else{
        if(horror!==0){
          movieDetails.horror=((movieDetails.horror*movieDetails.horrorCount)-reviewDetails.horror+horror)/(movieDetails.horrorCount);
          movieDetails.horror=movieDetails.horror.toFixed(2);
        }else{
          movieDetails.horror=((movieDetails.horror*movieDetails.horrorCount)-reviewDetails.horror)/(movieDetails.horrorCount-1);
          movieDetails.horror=movieDetails.horror.toFixed(2);
          movieDetails.horrorCount=movieDetails.horrorCount-1;
        } 
    }
    if(reviewDetails.rating===0){    
      if(rating!==0){
        movieDetails.rating=((movieDetails.rating*movieDetails.ratingCount)+rating)/(movieDetails.ratingCount+1);
        movieDetails.rating=movieDetails.rating.toFixed(2);
        movieDetails.ratingCount=movieDetails.ratingCount+1;
      }}else{
        if(rating!==0){
          movieDetails.rating=((movieDetails.rating*movieDetails.ratingCount)-reviewDetails.rating+rating)/(movieDetails.ratingCount);
          movieDetails.rating=movieDetails.rating.toFixed(2);
        }else{
          movieDetails.rating=((movieDetails.rating*movieDetails.ratingCount)-reviewDetails.rating)/(movieDetails.ratingCount-1);
          movieDetails.rating=movieDetails.rating.toFixed(2);
          movieDetails.ratingCount=movieDetails.ratingCount-1;
        } 
    }
    if(reviewDetails.Action===0){    
      if(action!==0){
        movieDetails.Action=((movieDetails.Action*movieDetails.ActionCount)+action)/(movieDetails.ActionCount+1);
        movieDetails.Action=movieDetails.Action.toFixed(2);
        movieDetails.ActionCount=movieDetails.ActionCount+1;
      }}else{
        if(action!==0){
          movieDetails.Action=((movieDetails.Action*movieDetails.ActionCount)-reviewDetails.Action+action)/(movieDetails.ActionCount);
          movieDetails.Action=movieDetails.Action.toFixed(2);
        }else{
          movieDetails.Action=((movieDetails.Action*movieDetails.ActionCount)-reviewDetails.Action)/(movieDetails.ActionCount-1);
          movieDetails.Action=movieDetails.Action.toFixed(2);
          movieDetails.ActionCount=movieDetails.ActionCount-1;
        } 
    }
    if(reviewDetails.Drama===0){    
      if(drama!==0){
        movieDetails.Drama=((movieDetails.Drama*movieDetails.DramaCount)+drama)/(movieDetails.DramaCount+1);
        movieDetails.Drama=movieDetails.Drama.toFixed(2);
        movieDetails.DramaCount=movieDetails.DramaCount+1;
      }}else{
        if(drama!==0){
          movieDetails.Drama=((movieDetails.Drama*movieDetails.DramaCount)-reviewDetails.Drama+drama)/(movieDetails.DramaCount);
          movieDetails.Drama=movieDetails.Drama.toFixed(2);
        }else{
          movieDetails.Drama=((movieDetails.Drama*movieDetails.DramaCount)-reviewDetails.Drama)/(movieDetails.DramaCount-1);
          movieDetails.Drama=movieDetails.Drama.toFixed(2);
          movieDetails.DramaCount=movieDetails.DramaCount-1;
        } 
    }
    if(reviewDetails.Thrill===0){    
      if(thrill!==0){
        movieDetails.Thrill=((movieDetails.Thrill*movieDetails.ThrillCount)+thrill)/(movieDetails.ThrillCount+1);
        movieDetails.Thrill=movieDetails.Thrill.toFixed(2);
        movieDetails.ThrillCount=movieDetails.ThrillCount+1;
      }}else{
        if(thrill!==0){
          movieDetails.Thrill=((movieDetails.Thrill*movieDetails.ThrillCount)-reviewDetails.Thrill+thrill)/(movieDetails.ThrillCount);
          movieDetails.Thrill=movieDetails.Thrill.toFixed(2);
        }else{
          movieDetails.Thrill=((movieDetails.Thrill*movieDetails.ThrillCount)-reviewDetails.Thrill)/(movieDetails.ThrillCount-1);
          movieDetails.Thrill=movieDetails.Thrill.toFixed(2);
          movieDetails.ThrillCount=movieDetails.ThrillCount-1;
        } 
    }
    if(reviewDetails.romance===0){    
      if(romance!==0){
        movieDetails.romance=((movieDetails.romance*movieDetails.romanceCount)+romance)/(movieDetails.romanceCount+1);
        movieDetails.romance=movieDetails.romance.toFixed(2);
        movieDetails.romanceCount=movieDetails.romanceCount+1;
      }}else{
        if(romance!==0){
          movieDetails.romance=((movieDetails.romance*movieDetails.romanceCount)-reviewDetails.romance+romance)/(movieDetails.romanceCount);
          movieDetails.romance=movieDetails.romance.toFixed(2);
        }else{
          movieDetails.romance=((movieDetails.romance*movieDetails.romanceCount)-reviewDetails.romance)/(movieDetails.romanceCount-1);
          movieDetails.romance=movieDetails.romance.toFixed(2);
          movieDetails.romanceCount=movieDetails.romanceCount-1;
        } 
    }
    await API.graphql(
      graphqlOperation(
        updateMovie,{
          input:{
          id:movieId,
          rating:movieDetails.rating,
          comedy:movieDetails.comedy,
          romance:movieDetails.romance,
          Action:movieDetails.Action,
          Thrill:movieDetails.Thrill,
          Drama:movieDetails.Drama,
          horror:movieDetails.horror,
          ratingCount:movieDetails.ratingCount,
          comedyCount:movieDetails.comedyCount,
          romanceCount:movieDetails.romanceCount,
          horrorCount:movieDetails.horrorCount,
          ActionCount:movieDetails.ActionCount,
          ThrillCount:movieDetails.ThrillCount,
          DramaCount:movieDetails.DramaCount
          }
        })
    );
    props.onChangeVisible();
  }
  const onDeleteReview=async()=>{
    await API.graphql(
      graphqlOperation(deleteReview,
        {input:{id: props.reviewId}}
        ));
    if(reviewDetails.comedy!==0){
      movieDetails.comedy=((movieDetails.comedy*movieDetails.comedyCount)-reviewDetails.comedy)/(movieDetails.comedyCount-1);
      movieDetails.comedy=movieDetails.comedy.toFixed(2);
      movieDetails.comedyCount=movieDetails.comedyCount-1;
    }
    if(reviewDetails.horror!==0){
      movieDetails.horror=((movieDetails.horror*movieDetails.horrorCount)-reviewDetails.horror)/(movieDetails.horrorCount-1);
      movieDetails.horror=movieDetails.horror.toFixed(2);
      movieDetails.horrorCount=movieDetails.horrorCount-1;
    }
    if(reviewDetails.rating!==0){
      movieDetails.rating=((movieDetails.rating*movieDetails.ratingCount)-reviewDetails.rating)/(movieDetails.ratingCount-1);
      movieDetails.rating=movieDetails.rating.toFixed(2);
      movieDetails.ratingCount=movieDetails.ratingCount-1;
    }
    if(reviewDetails.Action!==0){
      movieDetails.Action=((movieDetails.Action*movieDetails.ActionCount)-reviewDetails.Action)/(movieDetails.ActionCount-1);
      movieDetails.Action=movieDetails.Action.toFixed(2);
      movieDetails.ActionCount=movieDetails.ActionCount-1;
    }
    if(reviewDetails.Drama!==0){
      movieDetails.Drama=((movieDetails.Drama*movieDetails.DramaCount)-reviewDetails.Drama)/(movieDetails.DramaCount-1);
      movieDetails.Drama=movieDetails.Drama.toFixed(2);
      movieDetails.DramaCount=movieDetails.DramaCount-1;
    }
    if(reviewDetails.Thrill!==0){
      movieDetails.Thrill=((movieDetails.Thrill*movieDetails.ThrillCount)-reviewDetails.Thrill)/(movieDetails.ThrillCount-1);
      movieDetails.Thrill=movieDetails.Thrill.toFixed(2);
      movieDetails.ThrillCount=movieDetails.ThrillCount-1;
    }
    if(reviewDetails.romance!==0){
      movieDetails.romance=((movieDetails.romance*movieDetails.romanceCount)-reviewDetails.romance)/(movieDetails.romanceCount-1);
      movieDetails.romance=movieDetails.romance.toFixed(2);
      movieDetails.romanceCount=movieDetails.romanceCount-1;
    }
        await API.graphql(
          graphqlOperation(
            updateMovie,{
              input:{
              id:movieId,
              rating:movieDetails.rating,
              comedy:movieDetails.comedy,
              romance:movieDetails.romance,
              Action:movieDetails.Action,
              Thrill:movieDetails.Thrill,
              Drama:movieDetails.Drama,
              horror:movieDetails.horror,
              ratingCount:movieDetails.ratingCount,
              comedyCount:movieDetails.comedyCount,
              romanceCount:movieDetails.romanceCount,
              horrorCount:movieDetails.horrorCount,
              ActionCount:movieDetails.ActionCount,
              ThrillCount:movieDetails.ThrillCount,
              DramaCount:movieDetails.DramaCount
              }
            })
        );
        props.onChangeVisible();
     }
     const ondeleteReviewAlert=()=>{
      Alert.alert(
        "Delete Review",
        "Want to delete your review?",
        [
          {
            text: "Cancel",
            onPress: () => ("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => onDeleteReview() }
        ]
      );  
    }
       return (
        <View style={styles.rateAndReviewContainer}>
            <Text style={styles.rateAndReviewTitle}>Rate and Review</Text>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Overall Rating:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={rating} 
            imageSize={26}
            onFinishRating={(val)=>{setRating(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Comedy:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={comedy} 
            imageSize={26}
            onFinishRating={(val)=>{setComedy(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Romance:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={romance} 
            imageSize={26}
            onFinishRating={(val)=>{setRomance(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Drama:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={drama} 
            imageSize={26}
            onFinishRating={(val)=>{setDrama(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Action:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={action} 
            imageSize={26}
            onFinishRating={(val)=>{setAction(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Thriller:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={thrill} 
            imageSize={26}
            onFinishRating={(val)=>{setThrill(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Horror:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={horror} 
            imageSize={26}
            onFinishRating={(val)=>{setHorror(val)}}
            />
            </View>
            
            <View style={styles.reviewInputContainer}>
                    <TextInput 
                    style={styles.reviewInput}
                    value={review}
                    placeholder={"What do you think about this movie"}
                    multiline
                    onChangeText={(val)=>{setReview(val)}}
                    />
                </View>
            <View style={styles.submitButtonContainer}>
            <Button 
            onPress={()=>{props.onChangeVisible()}}
            style={styles.submitButton}
            title="Close"
            color="#841584"
            accessibilityLabel="Close Review"/>
            <Button 
            onPress={updateRatingAndReview}
            style={styles.submitButton}
            title="Update"
            color="#841584"
            accessibilityLabel="Update Review"/>
            </View>
          <TouchableOpacity onPress={ondeleteReviewAlert} style={styles.deleteReviewContainer}>
            <Text style={styles.deleteReviewText}>Delete this Review</Text>
          </TouchableOpacity>   
        </View> 
        
       );

};

const styles=StyleSheet.create({
    rateAndReviewContainer:{
        marginBottom:10,
        marginLeft:10,
      },
      rateAndReviewTitle:{
          fontSize:18,
          
      },
      reviewInput:{
        fontSize:18,
      },
      reviewInputContainer:{
        padding:10,
        marginTop:15,
        borderRadius:5,
        height:120,
        width:"93%",
        borderColor:'black',
        borderWidth:0.7,
        alignSelf:'center'
      },
      ratingInputContainer:{
        flexDirection:'row',
        marginBottom:8,
        justifyContent:'space-between',
        marginRight:20,
      },
      ratingInputTitle:{
        fontSize:15,
        marginTop:10,
        marginRight:5,
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
      closeButton:{
        width:120,

      },
      deleteReviewContainer:{
        alignItems:'center',
        marginTop:60
      },
      deleteReviewText:{
        fontSize:22,
        color:'red',
        fontWeight:'bold'
      }
});

export default EditRateAndReview;