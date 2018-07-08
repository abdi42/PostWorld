import React, {Component} from 'react';
import {Text, TouchableHighlight,TouchableOpacity, View,StyleSheet,AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Right,Row,Button, Icon, Title,Content,Card,CardItem,Form,Textarea,Thumbnail } from 'native-base';
import Modal from "react-native-modal";
import PostCard from "./PostModal";

class PostModal extends Component {
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
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";


    return (
      <View>
        <Modal
          animationType="slide"
          animationOut="slideOutDown"
          isVisible={this.props.visible}
          style={[styles.modal,this.props.style]}
          backdropOpacity={this.props.opacity}
          backdropColor="#4F6EFD"
          transparent={true}>
          <Container>
            <Content contentContainerStyle={styles.modalContent}>
              <Row>
                <Right>
                  <Button
                    onPress={() => this.props.closePost()}
                    transparent>
                    <Icon name="md-close" style={{color:"#fff"}}></Icon>
                  </Button>
                </Right>
              </Row>
              {this.props.children}
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal:{
    top:10,
    flex:1,
    margin:10,
  },
  modalContent: {
    borderRadius:10,
    backgroundColor:"#4F6EFD",
    padding:10,
    paddingBottom:25
  },
})


export default PostModal;
