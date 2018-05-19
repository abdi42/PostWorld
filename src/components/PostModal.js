import React, {Component} from 'react';
import {Text, TouchableHighlight,TouchableOpacity, View,StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Right,Row,Button, Icon, Title,Content,Card,CardItem,Form,Textarea,Thumbnail } from 'native-base';
import Modal from "react-native-modal";

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
    const { post } = this.props;
    let votesMargin = 0;

    if(post.votes.length < 10){
      votesMargin = 5;
    }
    else {
      votesMargin = 1;
    }


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
            <Card >
              <CardItem style={{backgroundColor:"#FDF9F0"}} >
                <Left>
                  <Thumbnail source={{uri: uri}} />
                  <Body>
                    <Text>{post.username}</Text>
                    <Text note>GeekyAnts</Text>
                  </Body>
                  <Right >
                    <TouchableOpacity
                      transparent
                      hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                      onPress={() => this.props.onUpVote()}
                      vertical>
                      <Icon active name="arrow-up" style={{fontSize:35,lineHeight:0,letterSpacing:0}} />
                    </TouchableOpacity>
                    <Text style={{marginRight:votesMargin}}>{post.voteCount}</Text>
                    <TouchableOpacity
                      transparent
                      hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                      onPress={() => this.props.onDownVote()}
                      vertical>
                      <Icon active name="arrow-down" style={{fontSize:35,lineHeight:0,letterSpacing:0}} />
                    </TouchableOpacity>
                  </Right>
                </Left>
              </CardItem>
              <CardItem style={{backgroundColor:"#FDF9F0"}}>
                <Body>
                  <Text>{post.content}</Text>
                </Body>
              </CardItem>
              <CardItem style={{backgroundColor:"#FDF9F0"}} >
                <Left>
                  <Text style={{color:"#7f8c8d"}}>{post.distance}</Text>
                </Left>
                <Body style={styles.buttons}>
                  <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems: 'center'}} transparent small>
                    <Icon active name="chatbubbles" style={{color:'#4286f4'}} />
                    <Text style={{paddingLeft:10,color:"#7f8c8d"}}>{post.comments.length}</Text>
                  </TouchableOpacity>
                </Body>
                <Right style={styles.buttons}>
                  <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems: 'center'}} transparent small>
                    <Icon active name="heart" style={{color:"#e74c3c"}} />
                    <Text style={{paddingLeft:10,color:"#7f8c8d"}}>{post.likes} Likes</Text>
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
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
