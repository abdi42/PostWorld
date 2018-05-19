/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AppNavigation from './AppNavigation.js'
import PostStore from './stores/Posts.js';
import {
  Platform,
  StyleSheet,
  View,
  Image,
} from 'react-native';


type Props = {

};

export default class App extends Component<Props> {
  render() {

    const screenProps = {
      postStore:PostStore
    }

    return (
      <AppNavigation screenProps={screenProps} persistenceKey={"NavigationState"}></AppNavigation>
    );
  }
}
