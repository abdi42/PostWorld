import React from 'react'
import { Animated, Easing,Text } from 'react-native'
import { StackNavigator,TabNavigator, DrawerNavigator } from 'react-navigation'
import FeedScreen from "./Scenes/Feed/Feed.js";
import FeedDetail from "./Scenes/Feed/FeedDetail.js";
import SideBar from "./components/Sidebar.js";
import {Footer,FooterTab,Button,Icon} from 'native-base';

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
}, {
  gesturesEnabled: false,
  transitionConfig: noTransitionConfig,
  header: null,
  headerMode:'none'
})

const TabStack = TabNavigator({
  FeedStack: FeedStack
}, {
  tabBarPosition: "bottom",
  gesturesEnabled: false,
  transitionConfig: noTransitionConfig,
  header: null,
  tabBarComponent: props => {
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={props.navigationState.index === 0}
            onPress={() => props.navigation.navigate("LucyChat")}>
            <Icon name="bowtie" />
            <Text>Lucy</Text>
          </Button>
          <Button
            vertical
            active={props.navigationState.index === 1}
            onPress={() => props.navigation.navigate("JadeChat")}>
            <Icon name="briefcase" />
            <Text>Nine</Text>
          </Button>
          <Button
            vertical
            active={props.navigationState.index === 2}
            onPress={() => props.navigation.navigate("NineChat")}>
            <Icon name="headset" />
            <Text>Jade</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
})

// drawer stack
const DrawerStack = StackNavigator(  {
  TabStack: TabStack,
  FeedDetail: { screen: FeedDetail },
}, {
  gesturesEnabled: false,
  contentComponent: props => <SideBar {...props} />,
  transitionConfig: noTransitionConfig,
  header: null,
  headerMode:'none'
})





export default DrawerStack
