/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AppNavigation from './AppNavigation.js'
import { Root } from "native-base";
import {
  Platform,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Provider } from 'react-redux'
import store from './store'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

type Props = {

};

export default class App extends Component<Props> {
  render() {

    return (
      <Provider store={store}>
        <Root>
          <AppNavigation></AppNavigation>
        </Root>
      </Provider>
    );
  }
}
