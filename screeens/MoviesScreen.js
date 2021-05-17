import React,{useState,useCallback, useEffect} from 'react';
import {View,StyleSheet,FlatList, Alert,ScrollView,RefreshControl} from 'react-native';
import MovieGridTitle from '../components/MovieGridTitle';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from'../components/headerButtons';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "native-base";
import { SearchBar } from 'react-native-elements';
import {API,graphqlOperation } from 'aws-amplify';
import {listMovies} from '../src/graphql/queries';
import {onCreateMovie} from '../src/graphql/subscriptions';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const MoviesScreen = props=>{
    const [sortBy,setSortBy]=useState('');
    const [search,setSearch]=useState('');
    const [movies,setMovies]=useState([]);
    const [movieList,setMovieList]=useState([]);
    const [refreshing, setRefreshing] =useState(false);
    const onRefresh = useCallback(async() => {
      const moviesData= await API.graphql(
        graphqlOperation(listMovies)
      );
      setMovies([...moviesData.data.listMovies.items]);
      setMovieList([...moviesData.data.listMovies.items]);

      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
    try{
      useEffect(()=>{
        const fetchMovies= async () => {
      const moviesData= await API.graphql(
        graphqlOperation(listMovies)
      );
      setMovies([...moviesData.data.listMovies.items]);
      setMovieList([...moviesData.data.listMovies.items]);

        }
        fetchMovies();
      },[]);

      useEffect(() => {
        const subscription = API.graphql(
          graphqlOperation(onCreateMovie)
        ).subscribe({
          next: (data) => {
            const newMovie = data.value.data.onCreateMovie;
          setMovies([...movies,newMovie]);
          setMovieList([...movies,newMovie]);
          }
        });
        onRefresh();    
        return () => subscription.unsubscribe();
      }, [])

    }catch(e){
      console.log(e);
    }
    const searchMovies=(searchText)=>{
      setSearch(searchText);
      const selectedMovie = movieList.filter((item)=>item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      if(selectedMovie!==null){
      setMovies(selectedMovie);
      }else{
        setMovies(null);
      }

    }
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Add a movie",
      "want to add a movie",
      [
        {
          text: "Cancel",
          onPress: () => ("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => props.navigation.navigate('MovieCreate') }
      ]
    );
   
    const renderGridItem = (itemData)=>{
        const id = itemData.item.id; 
        return <MovieGridTitle  
        id={itemData.item.id}
        title={itemData.item.name}
        image={itemData.item.imageUri}
        release_date={itemData.item.releaseDate}
        language={itemData.item.language}
        overallRatingCount={itemData.item.ratingCount}
        overallRating={itemData.item.rating}
        onSelect={()=>{
            props.navigation.navigate('MovieDetails', { 
                movieId: id
              });
           }}
        />;
    
    };
   return(
       <ScrollView
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      } >
         <View style={{flexDirection:'row'}}>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={sortBy}
              onValueChange={(selectedSortBy)=>{setSortBy(selectedSortBy)}}
              style={{ width: 180,height:50,fontSize:10,color:'black' }}
              itemStyle={{  width: 180,fontSize: 18}}>
            <Picker.Item label="Sort By" value="" />
            <Picker.Item label="Overall Rating" value="Overall" />
            <Picker.Item label="Friends Rating" value="Friends" />
            <Picker.Item label="Comedy " value="Comedy" />
            <Picker.Item label="Drama " value="Drama" />
            <Picker.Item label="Romance " value="Romance" />
            <Picker.Item label="Action " value="Action" /> 
            <Picker.Item label="Thrill " value="Thrill" />
            <Picker.Item label="Horror " value="Horror" />  
          </Picker>
          <SearchBar
            lightTheme={true}
            containerStyle={{width:'50%',height:60,marginTop:0}}
            placeholder="Search Movies"
            onChangeText={(searchText)=>{searchMovies(searchText)}}
            value={search}
          />
         </View>
       <FlatList
       style={styles.flatListStyle}
       numColumns={2}
       keyExtractor={(item,index)=>item.id}
       data={movies} 
       renderItem={renderGridItem}
       />
       <View style={styles.addIcon}>
       <Ionicons name='ios-add-circle' size={72} color="grey" 
       onPress={createTwoButtonAlert}
       />
       </View>
       </ScrollView >
   );

};
MoviesScreen.navigationOptions = navData => {
  return{
    headerTitle: 'Parents-Child',
    headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={()=>{
            navData.navigation.toggleDrawer();
         }}/>
    </HeaderButtons>
    
    };
};

const styles=StyleSheet.create({
    addIcon:{
        alignSelf:'center',
        position:'absolute',
        bottom:60,
    },
    flatListStyle:{
      marginBottom:70
    }
})


export default MoviesScreen;