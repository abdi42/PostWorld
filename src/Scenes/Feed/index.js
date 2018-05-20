import React from 'react'
import { StackNavigator,TabNavigator } from 'react-navigation'
import FeedScreen from "./Feed.js";
import FeedDetail from "./FeedDetail.js";
import Tabs from "../../components/Tabs.js"
import AddPost from '../../components/AddPost'



const Feed = StackNavigator({
  FeedScreen: { screen: FeedScreen },
  FeedDetail: { screen: FeedDetail }
}, {
  header:null,
  headerMode:'none'
})

const FeedStack = StackNavigator({
  Feed:Feed,
  AddPost:AddPost,
},{
  mode:'modal',
  headerMode:'none'
})


const FeedNav = TabNavigator({
  Feed:FeedStack
},{
   tabBarPosition: "bottom",
   animationEnabled:true,
   tabBarComponent: props => <Tabs addPost={() => { console.log("Add Post")}} navigation={props.navigation} navigationState={props.navigationState}/>
})

export default FeedNav;
