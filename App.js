import React, { useEffect } from "react";
import Navigator from "./navigation/Navigator";
import { LogBox } from "react-native";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
import config from "./src/aws-exports";
Amplify.configure(config);

function App() {
  LogBox.ignoreAllLogs();
  // run this snippet only after first time app is mounted

  try {
    useEffect(() => {
      const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        if (userData.data.getUser) {
          console.log("User is already registered in database");
          return;
        }
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          email: userInfo.attributes.email,
          mobileNo: userInfo.attributes.phone_number,
          imageUri: "",
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      };
      fetchUser();
    }, []);
  } catch (e) {
    console.log(e);
  }
  return <Navigator />;
}
export default withAuthenticator(App);
