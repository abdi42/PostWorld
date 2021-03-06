import React, {Component} from 'react';
import {Text, TouchableHighlight, View,StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card,CardItem,Form,Textarea } from 'native-base';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions'

class AddPost extends Component {
  constructor(props){
    super(props);
    this.state ={ content:''}
  }

  submit(){
    const { params } = this.props.navigation.state;

    if(params.geo)
      this.props.createPost(this.state.content,params.geo)
    else
      this.props.createPost(this.state.content);

    this.props.navigation.goBack()
  }

  render() {
    return (
      <Container style={{flex:1,backgroundColor:"#4F6EFD"}}>
        <Header noShadow style={{borderBottomWidth:0,backgroundColor:"#4F6EFD"}}>
          <Right>
            <Button
              onPress={() => this.props.navigation.goBack()}
              transparent>
              <Icon name="md-close" style={{color:"white"}}></Icon>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.modalContent}>
          <Card style={{borderRadius: 5, }}>
            <CardItem style={{borderRadius: 5, }}>
              <Body>
                <Form>
                  <Textarea autoFocus={true} style={{height:200,fontSize:20}} placeholder="Create a new post" onChangeText={(content) => this.setState({content})}/>
                </Form>
              </Body>
            </CardItem>
          </Card>
          <Button
            onPress={() => this.submit()}
            style={{alignSelf: 'flex-end',marginTop:20,marginRight:15,padding:15,paddingLeft:40,paddingRight:40,borderRadius:3,backgroundColor:"#96F49F",borderColor:"black",borderWidth:0.5}}  small>
            <Text style={{fontSize:18,paddingBottom:22,color:'black',padding:0}}>Post</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#4F6EFD',
    padding:10,
    borderRadius:10,
    marginLeft:10,
    marginRight:10,
    paddingBottom:25
  },
})


export default connect(null, { createPost })(AddPost)
