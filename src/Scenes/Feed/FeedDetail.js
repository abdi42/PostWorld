import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Container,List,ListItem, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Footer,FooterTab,Form,Item,Input} from 'native-base';
import PostCard from '../../components/PostCard'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CommentCard from '../../components/CommentCard';
import { observer } from 'mobx-react';

const OCommentCard = observer(CommentCard);
const OPostCard = observer(PostCard);

class FeedDetail extends Component {

  constructor(props){
    super(props);
    this.state ={ comment:''}
  }

  _header(){
    const { params } = this.props.navigation.state;
    const { postStore } = this.props.screenProps
    const post = params.post

    return (
      <View>
        <OPostCard
          post={post}
          goToGeo={() => this.props.navigation.navigate("MapScreen",{geo:post.geo})}
          onUpVote={() => postStore.upVote(params.index)}
          onDownVote={() => postStore.downVote(params.index)}></OPostCard>
      </View>
    )
  }
  _renderComment = ({item,index}) => {
    const { params } = this.props.navigation.state;
    const { postStore } = this.props.screenProps

    return (
      <OCommentCard
        comment={item}
        onUpVote={() => postStore.upVoteComment(params.index,index)}
        onDownVote={() => postStore.downVoteComment(params.index,index)}></OCommentCard>
    )
  }

  addComment(index){
    const comment = this.state.comment;
    const {postStore} = this.props.screenProps;

    postStore.addComment(index,"John Doe",comment);

    this.setState({
      comment:""
    })

    this._textInput.setNativeProps({text: ''});

    Keyboard.dismiss();
  }

  render(){
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    const { params } = this.props.navigation.state;
    const { postStore } = this.props
    const post = params.post
    const index = params.index;

    return (
      <Container style={{backgroundColor:"#E7ECF0"}}>
        <Header style={{backgroundColor:"#2ecc71"}} hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
              >
              <Icon name="arrow-back" style={{color:"white"}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:"white"}}>Post</Title>
          </Body>
          <Right/>
        </Header>
        <FlatList
          data={post.comments}
          renderItem={this._renderComment.bind(this)}
          initialNumToRender={4}
          ListHeaderComponent={this._header.bind(this)}
          />
        <Footer>
          <FooterTab style={{backgroundColor:"#E7ECF0"}}>
            <Input style={{backgroundColor:'white',borderRadius:5,marginLeft:15,marginTop:7,marginRight:25,height:40}}  ref={component => this._textInput = component} placeholder='Add a comment' value={this.state.comment} onSubmitEditing={() => this.addComment(index)}  onChangeText={(comment) => this.setState({comment})}/>
            <TouchableOpacity
              transparent
              hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
              vertical
              onPress={() => this.addComment(index)}>
              <Icon active name='ios-arrow-forward-outline' style={{color:"#4589F3",marginTop:10,marginRight:20}}/>
            </TouchableOpacity>
          </FooterTab>
        </Footer>
        <KeyboardSpacer/>
      </Container>
    )
  }
}

export default FeedDetail;
