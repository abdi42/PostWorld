import React, {Component} from 'react';
import {Text, TouchableHighlight,TouchableOpacity, View,StyleSheet} from 'react-native';
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
      <Modal
        hideModalContentWhileAnimating={true}
        animationType="slide"
        isVisible={this.props.visible}
        style={{top:50}}
        transparent={true}
        backdropOpacity={0}>
        <Container>
          <Content contentContainerStyle={styles.modalContent}>
            <Row>
              <Right>
                <Button
                  onPress={() => this.props.closePost()}
                  transparent>
                  <Icon name="md-close" style={{color:"white"}}></Icon>
                </Button>
              </Right>
            </Row>
            {this.props.children}
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
    marginRight:10
  },
})


export default PostModal;
