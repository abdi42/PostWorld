import React from 'react'
import { Animated, Easing,Text } from 'react-native'
import { StackNavigator,TabNavigator, DrawerNavigator } from 'react-navigation'
import FeedScreen from "./Scenes/Feed/Feed.js";
import FeedDetail from "./Scenes/Feed/FeedDetail.js";
import SideBar from "./components/Sidebar.js";
import {Footer,FooterTab,Button,Icon} from 'native-base';
import Mapscreen from './Scenes/Map/Map.js';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})


const drawerButton = (navigation) =>
  <Text
    style={{padding: 5, color: 'white'}}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  }>Menu</Text>


const FeedStack = StackNavigator({
  FeedScreen: { screen: FeedScreen },
  FeedDetail: { screen: FeedDetail },
}, {
  header: null,
  headerMode:'none'
})

const MapStack = StackNavigator({
  Mapscreen: { screen:Mapscreen }
}, {
  initialRouteName:'Mapscreen',
  header:null,
  headerMode:'none'
})


// drawer stack
const DrawerStack = StackNavigator({
  FeedStack: FeedStack,
  MapStack: MapStack,
}, {
  contentComponent: props => <SideBar {...props} />,
  header: null,
  headerMode:'none'
})





export default DrawerStack
