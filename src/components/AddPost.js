import React, {Component} from 'react';
import {Text, TouchableHighlight, View,StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card,CardItem,Form,Textarea } from 'native-base';
import Modal from "react-native-modal";

class AddPost extends Component {
  constructor(props){
    super(props);
    this.state ={ modalVisible: false,content:''}
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  submit(){
    this.props.onSubmit(this.state.content)
    this.setModalVisible(false);
  }

  render() {
    return (
      <Modal
        hideModalContentWhileAnimating={true}
        animationType="slide"
        isVisible={this.state.modalVisible}
        style={{margin:0,padding:0}}
        transparent={false}>
        <Header noShadow style={{borderBottomWidth:0,backgroundColor:"#4F6EFD"}}>
          <Right>
            <Button
              onPress={() => this.setModalVisible(false)}
              transparent>
              <Icon name="md-close" style={{color:"white"}}></Icon>
            </Button>
          </Right>
        </Header>
        <Container style={{flex:1,backgroundColor:"#4F6EFD"}}>
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
              style={{alignSelf: 'flex-end',marginTop:20,marginRight:15,paddingLeft:40,paddingRight:40,borderRadius:10,backgroundColor:"#96F49F",borderColor:"black",borderWidth:0.5}}  small>
              <Text style={{fontSize:18,paddingBottom:22,color:'black',padding:0}}>Post</Text>
            </Button>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#4F6EFD',
    padding:10,
    borderRadius:10,
    marginTop:15,
    marginLeft:10,
    marginRight:10,
    paddingBottom:25
  },
})


export default AddPost;