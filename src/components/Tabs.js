import React from "react";
import { Text,TouchableOpacity,StyleSheet} from 'react-native'
import {Footer,FooterTab,Button,Icon,View} from 'native-base';

class Tabs extends React.Component {
  render() {
    return (
      <Footer style={{backgroundColor:"#343434"}}>
        <FooterTab>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("FeedScreen")}
          >
            <Icon style={{color:"white"}} active={this.props.navigationState.index === 0} name="ios-home" />
            <Text style={{color:"white"}} >Home</Text>
          </Button>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddPostModal")}
            style={{ width:100,height:100}}>
            <View
               style={styles.roundedButton}>
               <Icon style={{color:"white",fontSize:40,marginTop:20,marginLeft:5}} active={this.props.navigationState.index === 1} name="ios-create-outline" />
            </View>
          </TouchableOpacity>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("FeedScreen")}
          >
            <Icon style={{color:"white"}}  active={this.props.navigationState.index === 2} name="ios-cog" />
            <Text style={{color:"white"}} >Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

  roundedButton: {
    top:-10,
    flex:1,
    alignItems:'center',
    //marginTop:10,
    //paddingTop:15,
    //paddingBottom:15,
    width:100,
    height:100,
    backgroundColor:'#3270CE',
    borderRadius:100,
    borderWidth: 1,
    borderColor: '#3270CE',
  },

  TextStyle:{
      color:'#fff',
      textAlign:'center',
  }

});

export default Tabs;
