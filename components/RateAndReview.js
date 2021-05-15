import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,TextInput,Button} from 'react-native';
import {Rating} from 'react-native-elements';
import {Auth,API,graphqlOperation} from 'aws-amplify';
import {createReview,updateMovie} from '../src/graphql/mutations';
import {getMovie} from '../src/graphql/queries';
const RateAndReview = (props) =>{
  const movieId=props.movieId;
  const [movieDetails,setMovieDetails]=useState(null);
  const [userId,setUserId]=useState('');
  const [userName,setUserName]=useState('');
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
          const fetchUser= async () => {
        const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
        console.log(userInfo);
        setUserId(userInfo.attributes.sub);
        setUserName(userInfo.username);
        const movie = await API.graphql(
        graphqlOperation(getMovie,{id: movieId})
        );
        setMovieDetails(movie.data.getMovie);
          }
          fetchUser();
        },[]);
      }catch(e){
        console.log(e);
      }
  const completeRatingAndReview=async()=>{
    await API.graphql(
      graphqlOperation(
        createReview,{
          input:{
            userID:userId,
            userName:userName,
            movieID:movieId,
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
    if(comedy!==0){
      movieDetails.comedy=((movieDetails.comedy*movieDetails.comedyCount)+comedy)/(movieDetails.comedyCount+1);
      movieDetails.comedy=movieDetails.comedy.toFixed(2);
      movieDetails.comedyCount=movieDetails.comedyCount+1;
    }
    if(horror!==0){
      movieDetails.horror=((movieDetails.horror*movieDetails.horrorCount)+horror)/(movieDetails.horrorCount+1);
      movieDetails.horror=movieDetails.horror.toFixed(2);
      movieDetails.horrorCount=movieDetails.horrorCount+1;
    }
    if(rating!==0){
      movieDetails.rating=((movieDetails.rating*movieDetails.ratingCount)+comedy)/(movieDetails.ratingCount+1);
      movieDetails.rating=movieDetails.rating.toFixed(2);
      movieDetails.ratingCount=movieDetails.ratingCount+1;
    }
    if(action!==0){
      movieDetails.Action=((movieDetails.Action*movieDetails.ActionCount)+action)/(movieDetails.ActionCount+1);
      movieDetails.Action=movieDetails.Action.toFixed(2);
      movieDetails.ActionCount=movieDetails.ActionCount+1;
    }
    if(drama!==0){
      movieDetails.Drama=((movieDetails.Drama*movieDetails.DramaCount)+drama)/(movieDetails.DramaCount+1);
      movieDetails.Drama=movieDetails.Drama.toFixed(2);
      movieDetails.DramaCount=movieDetails.DramaCount+1;
    }
    if(thrill!==0){
      movieDetails.Thrill=((movieDetails.Thrill*movieDetails.ThrillCount)+thrill)/(movieDetails.ThrillCount+1);
      movieDetails.Thrill=movieDetails.Thrill.toFixed(2);
      movieDetails.ThrillCount=movieDetails.ThrillCount+1;
    }
    if(romance!==0){
      movieDetails.romance=((movieDetails.romance*movieDetails.romanceCount)+romance)/(movieDetails.romanceCount+1);
      movieDetails.romance=movieDetails.romance.toFixed(2);
      movieDetails.romanceCount=movieDetails.romanceCount+1;
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
       return (
        <View style={styles.rateAndReviewContainer}>
            <Text style={styles.rateAndReviewTitle}>Rate and Review</Text>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Overall Rating:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={0} 
            imageSize={26}
            onFinishRating={(val)=>{setRating(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Comedy:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={0} 
            imageSize={26}
            onFinishRating={(val)=>{setComedy(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Romance:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={0} 
            imageSize={26}
            onFinishRating={(val)=>{setRomance(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Drama:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={0} 
            imageSize={26}
            onFinishRating={(val)=>{setDrama(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Action:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={0} 
            imageSize={26}
            onFinishRating={(val)=>{setAction(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Thriller:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={0} 
            imageSize={26}
            onFinishRating={(val)=>{setThrill(val)}}
            />
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Horror:</Text>
            <Rating 
            style={{marginTop:8}} 
            ratingCount={10} 
            startingValue={0} 
            imageSize={26}
            onFinishRating={(val)=>{setHorror(val)}}
            />
            </View>
            
            <View style={styles.reviewInputContainer}>
                    <TextInput 
                    style={styles.reviewInput}
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
            onPress={completeRatingAndReview}
            style={styles.submitButton}
            title="Submit"
            color="#841584"
            accessibilityLabel="Submit Review"/>
            </View>      
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
});

export default RateAndReview;