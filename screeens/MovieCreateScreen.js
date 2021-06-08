import React from "react";
import { View, StyleSheet } from "react-native";
import MovieCreateForm from "../components/MovieCreateForm";
const MovieCreateScreen = (props) => {
  return (
    <View>
      <MovieCreateForm
        addMovieCompleted={() => {
          props.navigation.navigate("Movies");
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default MovieCreateScreen;
