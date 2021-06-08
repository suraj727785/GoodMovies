import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { SafeAreaView, Button, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MoviesScreen from "../screeens/MoviesScreen";
import MovieDetailsScreen from "../screeens/MovieDetailsScreen";
import MovieCreateScreen from "../screeens/MovieCreateScreen";
import MovieEditScreen from "../screeens/MovieEditScreen";
import ViewFriendsScreen from "../screeens/ViewFriendsScreen";
import AddFriendsScreen from "../screeens/AddFriendsScreen";
import ViewProfileScreen from "../screeens/ViewProfileScreen";
import Colors from "../constants/color";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Auth } from "aws-amplify";
const defaultStackNav = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTintColor: "white",
};
const Navigator = createStackNavigator(
  {
    Movies: {
      screen: MoviesScreen,
      navigationOptions: {
        headerTitle: "Good Movies",
      },
    },
    MovieDetails: {
      screen: MovieDetailsScreen,
      navigationOptions: {
        headerTitle: "Movies",
      },
    },
    MovieCreate: {
      screen: MovieCreateScreen,
      navigationOptions: {
        headerTitle: "Create New Movie",
      },
    },
    MovieEdit: {
      screen: MovieEditScreen,
      navigationOptions: {
        headerTitle: "Edit Movie",
      },
    },
    ViewFriend: {
      screen: ViewFriendsScreen,
      navigationOptions: {
        headerTitle: "Friends",
      },
    },
    AddFriend: {
      screen: AddFriendsScreen,
      navigationOptions: {
        headerTitle: "Add Friends",
      },
    },
    Profile: {
      screen: ViewProfileScreen,
      navigationOptions: {
        headerTitle: "Profile",
      },
    },
  },
  { defaultNavigationOptions: defaultStackNav }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Navigator,
    },
    ViewFriend: {
      screen: ViewFriendsScreen,
      navigationOptions: {
        drawerLabel: "View Your Friends",
      },
    },
    AddFriend: {
      screen: AddFriendsScreen,
      navigationOptions: {
        drawerLabel: "Add Friends",
      },
    },
    Profile: {
      screen: ViewProfileScreen,
      navigationOptions: {
        drawerLabel: "Profile",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      async function handleLogout() {
        await Auth.signOut();
      }
      return (
        <View style={{ paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                handleLogout();
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);
const FinalNavigator = createSwitchNavigator({
  Main: MainNavigator,
});

export default createAppContainer(FinalNavigator);
