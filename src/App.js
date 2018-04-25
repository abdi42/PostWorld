/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Feed  from './screens/Feed.js';

import {
  Platform,
  StyleSheet,
  View,
  Image
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Feed></Feed>
    );
  }
}
