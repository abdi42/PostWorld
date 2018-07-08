import React from "react";
import { Text,TouchableOpacity,StyleSheet,AsyncStorage} from 'react-native'
import {Footer,FooterTab,Button,Icon,View,Thumbnail} from 'native-base';
import PostModal from './PostModal'
import Add from './Add'
import { NavigationActions } from 'react-navigation';
import ProfileImage from './ProfileImage'

class Tabs extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      visible:false,
      loggedIn:null,
      user:{}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.showPost = this.showPost.bind(this)
  }

  onSubmit(){
    this.setState({visible:false})
  }

  showPost(){
    this.setState({visible:true})
  }

  render() {
    let homeColor = ""
    let settingColor = ""
    let index = this.props.navigationState.index;

    if(this.props.navigationState.index === 0){
      homeColor = "#2ecc71";
    }else {
      homeColor = "#AAAAAA";;
    }

    if(this.props.navigationState.index === 1){
      settingColor = "#2ecc71";
    }else {
      settingColor = "#AAAAAA";
    }

    return (
      <Footer style={{backgroundColor:"#FAFAFA"}}>
        <PostModal closePost={() => this.setState({visible:false})} style={{top:20}} visible={this.state.visible} opacity={1}>
          <Add onSubmit={this.onSubmit} navigate={this.props.navigation.navigate}></Add>
        </PostModal>
        <FooterTab>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("Feed")}
            style={{paddingTop:0,paddingBottom:0}}
          >
            <Icon style={{color:index === 0 ? "#617AF5" : "#AAAAAA",fontSize:37}} active={this.props.navigationState.index === 0} name="ios-home" />
          </Button>
          <TouchableOpacity
            onPress={this.showPost}
            style={{ width:75,height:75}}>
            <View
               style={styles.roundedButton}>
               <Icon style={{color:"white",fontSize:30,marginTop:20,marginLeft:5}} active={this.props.navigationState.index === 1} name="md-create" />
            </View>
          </TouchableOpacity>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("SamplePage")}
            style={{paddingTop:0,paddingBottom:0}}
          >
            <ProfileImage></ProfileImage>
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
    top:-9,
    flex:1,
    alignItems:'center',
    //marginTop:10,
    //paddingTop:15,
    //paddingBottom:15,
    width:75,
    height:75,
    backgroundColor:'#617AF5',
    borderRadius:35,
    borderWidth: 1,
    borderColor: '#617AF5',
  },

  TextStyle:{
      color:'#fff',
      textAlign:'center',
  }

});

export default Tabs;
