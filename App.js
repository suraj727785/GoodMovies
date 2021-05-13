import React from 'react';
import Navigator from './navigation/Navigator';
import { LogBox } from "react-native";
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from 'aws-amplify';
import config from './src/aws-exports'
Amplify.configure(config)

function App(){
  LogBox.ignoreAllLogs();
  return ( 
    <Navigator/>
  );
}
export default withAuthenticator(App);
