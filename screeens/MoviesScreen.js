import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import MovieGridTitle from "../components/MovieGridTitle";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/headerButtons";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "native-base";
import { SearchBar } from "react-native-elements";
import { API, graphqlOperation } from "aws-amplify";
import { listMovies, listReviews } from "../src/graphql/queries";
import { deleteMovie, deleteReview } from "../src/graphql/mutations";
import { onCreateMovie } from "../src/graphql/subscriptions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const MoviesScreen = (props) => {
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    const moviesData = await API.graphql(graphqlOperation(listMovies));
    setMovies([...moviesData.data.listMovies.items]);
    setMovieList([...moviesData.data.listMovies.items]);

    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  try {
    useEffect(() => {
      const fetchMovies = async () => {
        const moviesData = await API.graphql(graphqlOperation(listMovies));
        setMovies([...moviesData.data.listMovies.items]);
        setMovieList([...moviesData.data.listMovies.items]);
      };
      fetchMovies();
    }, []);

    useEffect(() => {
      const subscription = API.graphql(
        graphqlOperation(onCreateMovie)
      ).subscribe({
        next: (data) => {
          const newMovie = data.value.data.onCreateMovie;
          setMovies([...movies, newMovie]);
          setMovieList([...movies, newMovie]);
        },
      });
      onRefresh();
      return () => subscription.unsubscribe();
    }, []);
  } catch (e) {
    console.log(e);
  }
  const searchMovies = (searchText) => {
    setSearch(searchText);
    const selectedMovie = movieList.filter(
      (item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    if (selectedMovie !== null) {
      setMovies(selectedMovie);
    } else {
      setMovies(null);
    }
  };
  const addMovieAlert = () =>
    Alert.alert("Add a movie", "want to add a movie?", [
      {
        text: "Cancel",
        onPress: () => "Cancel Pressed",
        style: "cancel",
      },
      { text: "OK", onPress: () => props.navigation.navigate("MovieCreate") },
    ]);
  const sortMovies = (li, crieteria) => {
    switch (crieteria) {
      case "Drama":
        return li.sort((a, b) => b.Drama - a.Drama);
      case "Comedy":
        return li.sort((a, b) => b.comedy - a.comedy);
      case "Romance":
        return li.sort((a, b) => b.romance - a.romance);
      case "Action":
        return li.sort((a, b) => b.Action - a.Action);
      case "Thrill":
        return li.sort((a, b) => b.Thrill - a.Thrill);
      case "Horror":
        return li.sort((a, b) => b.horror - a.horror);
      default:
        return li.sort((a, b) => b.rating - a.rating);
    }
  };
  const deleteMovieFun = async (id) => {
    await API.graphql(graphqlOperation(deleteMovie, { input: { id: id } }));
    await API.graphql(graphqlOperation(deleteMovie, { input: { id: id } }));
    const reviewData = await API.graphql(
      graphqlOperation(listReviews, {
        filter: { movieID: { contains: id } },
      })
    );
    const reviewList = reviewData.data.listReviews.items;
    let reviewCount = reviewList.length;
    let i = 0;
    while (i < reviewCount) {
      await API.graphql(
        graphqlOperation(deleteReview, { input: { id: reviewList[i].id } })
      );
    }
  };
  const onClickEditAlert = (id) => {
    Alert.alert("Edit movie", "want to Edit this movie?", [
      {
        text: "Cancel",
        onPress: () => "Cancel Pressed",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          props.navigation.navigate("MovieEdit", {
            movieId: id,
          }),
      },
    ]);
  };
  const onClickDeleteAlert = (id) => {
    Alert.alert("Delete movie", "Want to delete this movie?", [
      {
        text: "Cancel",
        onPress: () => "Cancel Pressed",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteMovieFun(id) },
    ]);
  };
  const renderGridItem = (itemData) => {
    const id = itemData.item.id;
    return (
      <MovieGridTitle
        id={itemData.item.id}
        sortBy={sortBy}
        onSelect={() => {
          props.navigation.navigate("MovieDetails", {
            movieId: id,
          });
        }}
        onClickEdit={(id) => {
          onClickEditAlert(id);
        }}
        onClickDelete={(id) => {
          onClickDeleteAlert(id);
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Picker
          mode="dropdown"
          placeholder="Select One"
          placeholderStyle={{ color: "#2874F0" }}
          note={false}
          selectedValue={sortBy}
          onValueChange={(val) => {
            setSortBy(val);
          }}
          style={{
            width: 180,
            height: 50,
            fontSize: 10,
            color: "black",
            marginTop: 7,
          }}
          itemStyle={{ width: 180, fontSize: 18 }}
        >
          <Picker.Item label="Sort By" value="Nothing" />
          <Picker.Item label="Overall Rating" value="Simple" />
          <Picker.Item label="Comedy " value="Comedy" />
          <Picker.Item label="Drama " value="Drama" />
          <Picker.Item label="Romance " value="Romance" />
          <Picker.Item label="Action " value="Action" />
          <Picker.Item label="Thrill " value="Thrill" />
          <Picker.Item label="Horror " value="Horror" />
        </Picker>
        <SearchBar
          lightTheme={true}
          containerStyle={{ width: "50%", height: 60, marginTop: 7 }}
          placeholder="Search Movies"
          onChangeText={(searchText) => {
            searchMovies(searchText);
          }}
          value={search}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          style={styles.flatListStyle}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
          data={sortMovies(movies, sortBy)}
          renderItem={renderGridItem}
        />
      </ScrollView>
      <View style={styles.addIcon}>
        <Ionicons
          style={styles.addIcon}
          name="ios-add-circle"
          size={72}
          color="grey"
          onPress={addMovieAlert}
        />
      </View>
    </View>
  );
};
MoviesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Parents-Child",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  addIcon: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  flatListStyle: {
    marginBottom: 20,
  },
});

export default MoviesScreen;
