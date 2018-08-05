import React from 'react'
import PropTypes from 'prop-types'

import { Animated, Easing,Text } from 'react-native'
import { StackNavigator,TabNavigator,SwitchNavigator,addNavigationHelpers } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

import MapScreen from './Scenes/Map/Map.js'
import FeedScreen from './Scenes/Feed/Feed.js'
import FeedDetail from './Scenes/Feed/FeedDetail.js'
import Tabs from './components/Tabs.js'
import AddPost from './Scenes/AddPost'
import SamplePage from './Scenes/Map/SamplePage'
import SignUp from './Scenes/Auth/SignUp'
import Prompt from './Scenes/Auth/Prompt'
import Welcome from './Scenes/Auth/Welcome'
import AuthLoadingScreen from './Scenes/Auth/AuthLoading'
import { connect } from 'react-redux'
import ImageUpload from './Scenes/Auth/ImageUpload'

// const FeedStack =  StackNavigator({
//   FeedScreen: { screen: FeedScreen },
//   FeedDetail: { screen: FeedDetail },
// }, {
//   header: null,
//   headerMode:'none',
// })
//
// FeedStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index == 1) {
//     tabBarVisible = false;
//   }
//
//   return {
//     tabBarVisible,
//   };
// };

const TabStack =  TabNavigator({
	Feed: { screen: FeedScreen },
	SamplePage: { screen:SamplePage }
},{
	tabBarPosition: 'bottom',
	animationEnabled:true,
	tabBarComponent: props => <Tabs {...props}/>
})

const AppStack = StackNavigator(
	{
		Tabs:TabStack,
		FeedDetail: { screen: FeedDetail },
		MapScreen: { screen: MapScreen}
	},
	{
		header: null,
		headerMode:'none',
	}
)

const AuthStack =  StackNavigator(
	{
		Welcome: { screen: Welcome },
		SignUp: { screen: SignUp },
		Prompt: { screen:Prompt },
		ImageUpload: { screen: ImageUpload },
	},
	{
		header: null,
		headerMode:'none',
	}
)


const AppNavigation =  SwitchNavigator(
	{
		AuthLoading:AuthLoadingScreen,
		App:AppStack,
		Auth:AuthStack
	},
	{
		initialRouteName: 'AuthLoading',
		animationEnabled:true,
	}
)

export default AppNavigation


// class Nav extends React.Component {
//   render() {
//     return (
//       <AppNavigation
//         navigation={addNavigationHelpers({
//           dispatch:this.props.dispatch,
//           state:this.props.navigation
//         })}></AppNavigation>
//     )
//   }
// }
//
// const mapStateToProps = state => ({
//   navigation: state.navigation,
// })
//
//
// export default connect(mapStateToProps)(Nav)
