import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import MovieEditForm from '../components/MovieEditForm';
const MovieEditScreen=(props)=>{
    const movieId = props.navigation.getParam('movieId');
    return(
        <View>
            <MovieEditForm 
            movieId={movieId}
            addMovieCompleted={()=>{props.navigation.navigate('Movies')}}
            />
        </View>
        );
}
const styles=StyleSheet.create({});

export default MovieEditScreen;