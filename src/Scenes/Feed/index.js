import React from 'react'
import { StackNavigator,TabNavigator } from 'react-navigation'
import FeedScreen from "./Feed.js";
import FeedDetail from "./FeedDetail.js";
import Tabs from "../../components/Tabs.js"


const Feed = StackNavigator({
  FeedScreen: { screen: FeedScreen },
  FeedDetail: { screen: FeedDetail }
}, {
  header:null,
  headerMode:'none'
})


const FeedNav = TabNavigator({
  Feed:Feed
},{
   tabBarPosition: "bottom",
   animationEnabled:true,
   tabBarComponent: props => <Tabs {...props}/>
})

export default FeedNav;
