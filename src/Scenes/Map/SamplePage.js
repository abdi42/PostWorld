import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { AsyncStorage,AlertIOS,StyleSheet,View } from "react-native"
import ProfileImage from '../../components/ProfileImage'

class SamplePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      user:{}
    }
  }

  clearStorage(){
    AsyncStorage.clear(() => {
      AlertIOS.alert(
        'Storage cleared!'
      );
    })
  }

  componentWillMount(){
    AsyncStorage.getItem('userToken',(err,result) => {
      if(result !== null){
        result = JSON.parse(result)

        this.setState({user:result})
      }
    })
  }

  render(){
    return (
      <Container>
        <Header style={{backgroundColor:"#617AF5"}} rounded>
          <Body>
            <Title style={{color:'white'}}>Header</Title>
          </Body>
        </Header>
        <Content style={styles.container}>
          <ProfileImage disableBadge={true} style={{width:100,height:100}}></ProfileImage>
          <Text style={styles.text}>{this.state.user.username}</Text>
          <Text style={styles.text}>Level 1 - noobasaurus</Text>
          <Button block onPress={this.clearStorage}>
            <Text>Clear Local Storage</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:25
  },
  text: {
    marginTop:10,
    marginBottom:10,
    fontSize:20
  }
})

export default SamplePage;
