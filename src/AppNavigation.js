import React from 'react'
import { Animated, Easing,Text } from 'react-native'
import { StackNavigator,TabNavigator, DrawerNavigator } from 'react-navigation'
import FeedScreen from "./Scenes/Feed/Feed.js";
import FeedDetail from "./Scenes/Feed/FeedDetail.js";
import SideBar from "./components/Sidebar.js";
import Mapscreen from './Scenes/Map/Map.js';
import Tabs from "./components/Tabs.js"
import FeedNav from "./Scenes/Feed/"

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
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
  TabsNav: FeedNav,
  MapStack: MapStack,
}, {
  header: null,
  headerMode:'none'
})





export default DrawerStack
