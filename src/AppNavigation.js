import React from 'react'
import { Animated, Easing,Text } from 'react-native'
import { StackNavigator,TabNavigator } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import MapScreen from './Scenes/Map/Map.js';
import FeedScreen from "./Scenes/Feed/Feed.js";
import FeedDetail from "./Scenes/Feed/FeedDetail.js";
import Tabs from "./components/Tabs.js"
import AddPost from "./Scenes/AddPost"
import SamplePage from "./Scenes/Map/SamplePage"

const FeedNav = TabNavigator({
  FeedScreen: { screen: FeedScreen },
  SamplePage: { screen:SamplePage },
},{
   tabBarPosition: "bottom",
   animationEnabled:true,
   tabBarComponent: props => <Tabs {...props}/>
})

const MainStack = StackNavigator({
  TabsNav: FeedNav,
  FeedDetail: { screen: FeedDetail },
  MapScreen: { screen: MapScreen}
}, {
  header: null,
  headerMode:'none',
})


const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    AddPost: {
      screen: AddPost,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


export default RootStack
