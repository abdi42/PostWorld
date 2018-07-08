import React from 'react'
import PropTypes from 'prop-types'
import { View,StyleSheet } from 'react-native'
import { Container, Header, Content, Input, Item,Text,Button,Row,Grid,Col } from 'native-base';

class Welcome extends React.Component {
  render () {
    return (
      <Container contentContainerStyle={styles.container} style={{backgroundColor:"#fff"}}>
        <Content style={styles.body}>
          <Text style={{marginTop:25,fontSize:19,fontFamily:"Helvetica Neue"}}>Welcome to POSTWORLD! We are happy you are here. POSTWORLD is a place for people to share, collect, and discover the stories of their world. Posts are location specific, and public for all to see. Have a special note about a place, object, or aspect of your city? Share it! And as you travel this great planet you can collect other posts you enjoy as well.  We ask that all users be respectful of other posters. Anything offensive, inappropriate, or otherwise uncool will have you removed from the community.
          </Text>
          <Text style={{marginTop:25,fontSize:19,fontFamily:"Helvetica Neue"}}>
            As a guest, you will not be able to:
          </Text>
          <Text style={{marginTop:5,fontSize:19,fontFamily:"Helvetica Neue"}}>
            *Post
          </Text>
          <Text style={{marginTop:5,fontSize:19,fontFamily:"Helvetica Neue"}}>
            *Favorite/Collect Posts
          </Text>
          <Text style={{marginTop:5,fontSize:19,fontFamily:"Helvetica Neue"}}>
            *Have a profile
          </Text>
          <Text style={{marginTop:5,fontSize:19,fontFamily:"Helvetica Neue"}}>
            You are free to discover as much as you like however. Have fun!
          </Text>
          <Button
            style={{backgroundColor:"#A0F6A9",borderColor:"#979797",borderWidth:1,alignSelf:"center",marginTop:40,padding:0}}
            onPress={() => this.props.navigation.navigate("App")}>
            <Text style={{color:'black',padding:0,fontSize:20,marginLeft:12.5,marginRight:12.5}}>Lets try it</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    fontSize:45,
    textAlign:"center",
    color:"white",
    marginTop:100,
    marginBottom:100
  },
  body: {
    padding:25,
  }
})

export default Welcome;
