import React from 'react';
import {Text,View,StyleSheet,TextInput,Button} from 'react-native';
import {Rating} from 'react-native-elements';
const RateAndReview = (props) =>{
       return (
        <View style={styles.rateAndReviewContainer}>
            <Text style={styles.rateAndReviewTitle}>Rate and Review</Text>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Overall Rating:</Text>
            <Rating style={{marginTop:8}} ratingCount={10} startingValue={0} imageSize={26}/>
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Comedy:</Text>
            <Rating style={{marginTop:8}} ratingCount={10} startingValue={0} imageSize={26}/>
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Romance:</Text>
            <Rating style={{marginTop:8}} ratingCount={10} startingValue={0} imageSize={26}/>
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Drama:</Text>
            <Rating style={{marginTop:8}} ratingCount={10} startingValue={0} imageSize={26}/>
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Action:</Text>
            <Rating style={{marginTop:8}} ratingCount={10} startingValue={0} imageSize={26}/>
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Thriller:</Text>
            <Rating style={{marginTop:8}} ratingCount={10} startingValue={0} imageSize={26}/>
            </View>
            <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingInputTitle}>Horror:</Text>
            <Rating style={{marginTop:8}} ratingCount={10} startingValue={0} imageSize={26}/>
            </View>
            
            <View style={styles.reviewInputContainer}>
                    <TextInput 
                    style={styles.reviewInput}
                    placeholder={"What do you think about this movie"}
                    multiline
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