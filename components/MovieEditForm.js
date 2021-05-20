import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,TextInput,Button,Image,ScrollView,Alert} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {Auth,API,graphqlOperation,Storage} from 'aws-amplify';
import {updateMovie} from '../src/graphql/mutations';
import {getMovie} from '../src/graphql/queries';



const MovieEditForm=(props)=>{
    const [date, setDate] = useState(new Date(1598051730000));
    const [image,setImage]=useState(null);
    const [name,setName]=useState('');
    const [language,setLanguage]=useState('');
    const [cast,setCast] =useState('');
    const [aboutMovie,setAboutMovie]=useState('');
    const [userId,setUserId] = useState('');

    try{
        useEffect(()=>{
        const fetchMovie= async () => {
        const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true});
        setUserId(userInfo.attributes.sub);
        const movieData = await API.graphql(
            graphqlOperation(getMovie,{id: props.movieId })
        );
        const movieEditData= movieData.data.getMovie;
        let imageUri='';
        if(movieEditData.imageUri===''){
            imageUri ='https://st2.depositphotos.com/3687485/9010/v/600/depositphotos_90102796-stock-illustration-cinema-film-clapper-board-vector.jpg';
        }
        else{
            imageUri=await Storage.get(movieEditData.imageUri);
        }
        setImage(imageUri);
        setName(movieEditData.name);
        setLanguage(movieEditData.language);
        setDate(movieEditData.releaseDate);
        setCast(movieEditData.cast);
        setAboutMovie(movieEditData.aboutMovie);

          }
          fetchMovie();
        },[]);
      }catch(e){
        console.log(e);
      }
    const addMovie=async()=>{
        if(name=='' || language=='' || cast=='' || aboutMovie==''){
        Alert.alert('All field required except image');
        }else{
          let imageName='';
            if(image!==null){
              const response = await fetch(image)
              const blob = await response.blob() // format the data for images
              const fileName = `${userId}${name}.jpg`
              await Storage.put(fileName, blob, {
               contentType: 'image/jpeg',
               level: 'public'
              });
              imageName=`${userId}${name}.jpg`;
            }
            await API.graphql(
                graphqlOperation(
                  updateMovie,{
                    input:{
                      id:props.movieId,
                      userID:userId,
                      name:name,
                      aboutMovie:aboutMovie,
                      cast:cast,
                      language:language,
                      imageUri:imageName,
                      releaseDate:date,

                    }
                  }
                )
              );
        }
        props.addMovieCompleted();
    }
    const launchImagePicker=async()=>{
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    
          if (!result.cancelled) {
            setImage(result.uri);
          }
        };
    return(
        <ScrollView style={styles.container}>
            {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
            <View style={styles.textInputConatiner}>
                <TextInput
                 style={styles.textInput}
                 placeholder={"Movie Name"}
                 multiline
                 value={name}
                 onChangeText={setName}
                />
            </View>
            <View style={styles.textInputConatiner} >
                <Text style={styles.textInput}>Release Date:</Text>
            <DatePicker
                style={{width: 170}}
                date={date}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {setDate(date)}}
            />
            </View>
            <View style={styles.textInputConatiner}>
                <TextInput
                 style={styles.textInput}
                 placeholder={"Languages"}
                 multiline
                 value={language}
                 onChangeText={setLanguage}
                />
            </View>
            <Text style={styles.textInputInfo}>For multiple languages seperate with comma (',')</Text>
            <View style={styles.textInputConatiner}>
                <TextInput
                 style={styles.textInput}
                 placeholder={"Cast and Actors"}
                 multiline
                 value={cast}
                 onChangeText={setCast}
                />
            </View>
            <Text style={styles.textInputInfo}>For multiple Cast seperate with comma (',')</Text>
            <View style={styles.aboutMovieConatiner}>
                <TextInput
                 style={styles.aboutMovieInput}
                 placeholder={"About Movie..."}
                 multiline
                 numberOfLines={4}
                 value={aboutMovie}
                 onChangeText={setAboutMovie}
                />
            </View>
            <View style={styles.textInputConatiner}>
                <Text style={styles.textInput}>Select Image</Text>
                <Entypo onPress={launchImagePicker} style={styles.selectImageIcon} name="image" size={48} color="blue" />
            </View>
            <View style={styles.submitButtonContainer}>
              <Button 
              style={styles.submitButton}
              title="Add Movie"
              color="#841584"
              accessibilityLabel="Add Movie"
              onPress={addMovie}
              />
            </View>      
        </ScrollView>
        );
}
const styles=StyleSheet.create({
    container:{
        marginTop:10,
    },
    textInputConatiner:{
        marginTop:8,
        width:'90%',
        borderWidth:1,
        alignSelf:'center',
        flexDirection:'row',
    },
    textInput:{
        fontSize:24,
        marginLeft:10,
        paddingTop:4,
        color:'grey'
    },
    aboutMovieInput:{
        fontSize:24,
        marginLeft:10,
        color:'grey'
    },
    textInputInfo:{
        fontSize:16,
        marginLeft:3,
        paddingTop:4,
        color:'grey',
        width:'90%',
        alignSelf:'center',
    },
    aboutMovieConatiner:{
        marginTop:8,
        width:'90%',
        borderWidth:1,
        alignSelf:'center',
        flexDirection:'row',
    },
    
    submitButtonContainer:{
        marginTop:20,
        width:120,
        alignSelf:'center',
        marginBottom:10
      },
      submitButton:{
        borderRadius:30,
      },
      selectImageIcon:{
          marginLeft:20,
      },
      imageStyle:{
        width:'95%',
        alignSelf:'center',
        height:250,
      }
});

export default MovieEditForm;
