import React from "react";
import { Text,TouchableOpacity,StyleSheet} from 'react-native'
import {Footer,FooterTab,Button,Icon,View} from 'native-base';

class Tabs extends React.Component {
  render() {
    let homeColor = ""
    let settingColor = ""


    if(this.props.navigationState.index === 0){
      homeColor = "#2ecc71";
    }else {
      homeColor = "#AAAAAA";;
    }

    if(this.props.navigationState.index === 1){
      settingColor = "#2ecc71";
    }else {
      settingColor = "#AAAAAA";;
    }

    return (
      <Footer style={{backgroundColor:"#fff"}}>
        <FooterTab>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("FeedScreen")}
          >
            <Icon style={{color:homeColor}} active={this.props.navigationState.index === 0} name="ios-home" />
            <Text style={{color:homeColor}} >Home</Text>
          </Button>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddPost")}
            style={{ width:75,height:75}}>
            <View
               style={styles.roundedButton}>
               <Icon style={{color:"white",fontSize:30,marginTop:20,marginLeft:5}} active={this.props.navigationState.index === 1} name="md-create" />
            </View>
          </TouchableOpacity>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("SamplePage")}
          >
            <Icon style={{color:settingColor}}  active={this.props.navigationState.index === 2} name="ios-cog" />
            <Text style={{color:settingColor}} >Settings</Text>
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
    backgroundColor:'#2ecc71',
    borderRadius:40,
    borderWidth: 1,
    borderColor: '#2ecc71',
  },

  TextStyle:{
      color:'#fff',
      textAlign:'center',
  }

});

export default Tabs;
