import React from 'react'
import PropTypes from 'prop-types'
import { View,StyleSheet } from 'react-native'
import { Container, Header, Content, Input, Item,Text,Button,Row,Grid,Col } from 'native-base';

class Prompt extends React.Component {
  render () {
    return (
      <Container contentContainerStyle={styles.container} style={{backgroundColor:"#617AF5"}}>
        <Content style={styles.body}>
          <Text style={{color:"white",marginTop:50,fontSize:19,fontFamily:"Helvetica Neue"}}>Welcome to <Text style={{color:"#A0F6A9",fontSize:19,fontFamily:"Helvetica Neue"}}>POSTWORLD!</Text> It looks like you are trying to <Text style={{color:"#FFE347",fontSize:19,fontFamily:"Helvetica Neue"}}>make a post</Text>. Cool! Before you do that let us show you how this thing works with a quick tutorial.</Text>
          <Text style={{color:"white",marginTop:25,fontSize:19,fontFamily:"Helvetica Neue"}}>Afterwards we will have you create a <Text style={{color:"#FFE347",fontSize:19,fontFamily:"Helvetica Neue"}}>username</Text> and then you will be good to go!</Text>

          <Button
            style={{backgroundColor:"#A0F6A9",borderColor:"#979797",borderWidth:1,alignSelf:"center",marginTop:40,padding:0}}
            onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={{color:'black',padding:0,fontSize:20,marginLeft:12.5,marginRight:12.5}}>Ok, Fine</Text>
          </Button>
          <Button
            style={{backgroundColor:"#FFE347",borderColor:"#979797",borderWidth:1,alignSelf:"center",marginTop:20,padding:0}}
            onPress={() => this.props.navigation.pop()}>
            <Text style={{color:'black',padding:0,fontSize:20,marginLeft:15,marginRight:15}}>Not yet</Text>
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
    color:"white",
    padding:25,
  }
})

export default Prompt;
