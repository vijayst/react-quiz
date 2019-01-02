import React from 'react';
import {
  AppRegistry
} from 'react-native';
import Home from './components/Home';
import firebase from 'react-native-firebase';

const admobId = 'ca-app-pub-2746031862127149~1651694180';
firebase.admob().initialize(admobId);

AppRegistry.registerComponent('ReactQuiz', () => Home);
