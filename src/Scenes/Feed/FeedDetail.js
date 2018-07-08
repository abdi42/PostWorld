import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { Container,List,ListItem, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Footer,FooterTab,Form,Item,Input} from 'native-base';
import PostCard from '../../components/PostCard'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CommentCard from '../../components/CommentCard';
import { connect } from 'react-redux';
import { addComment,commentVote,getPost } from '../../actions/postActions'
import { NavigationActions } from 'react-navigation';
import Post from '../../components/Post'

class FeedDetail extends Component {

  constructor(props){
    super(props);
    this.state ={ comment:''}
  }

  componentWillMount(){
    const setParamsAction = NavigationActions.setParams({
      params: {hideTabBar: true}
    });
    this.props.navigation.dispatch(setParamsAction);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.post){
      this.props.post.comments = nextProps.post.comments
    }
  }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    this.props.getPost(params.postId)
  }

  renderPost(){
    if(this.props.post.id){
      return (
        <FlatList
          data={this.props.post.comments}
          renderItem={this._renderComment.bind(this)}
          initialNumToRender={4}
          ListHeaderComponent={this._header.bind(this)}
          />
      )
    }
  }


  _header(){
    const { params } = this.props.navigation.state;
    const post = params.post

    return (
      <View style={{backgroundColor:"#E7ECF0",paddingBottom:5}}>
        <Post post={this.props.post} navigation={this.props.navigation} style={{}}></Post>
      </View>
    )
  }

  commentVote(post,dir,item){
    AsyncStorage.getItem('userToken',(err,result) => {
      if(result == null){
        this.props.navigation.navigate("Prompt")
      } else {
        this.props.commentVote(post,dir,item)
      }
    })
  }

  _renderComment = ({item,index}) => {
    const { params } = this.props.navigation.state;
    const post = params.post

    return (
      <CommentCard
        comment={item}
        onUpVote={() => this.commentVote(post,"up",item)}
        onDownVote={() => this.commentVote(post,"down",item)}></CommentCard>
    )
  }

  addComment(index){
    AsyncStorage.getItem('userToken',(err,result) => {
      if(result == null){
        this.props.navigation.navigate("Prompt")
      } else {
        const { params } = this.props.navigation.state;
        const post = params.post

        const comment = this.state.comment;

        this.props.addComment("John Doe",comment,post)

        this._textInput.setNativeProps({text: ''});

        Keyboard.dismiss();
      }
    })
  }

  render(){
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    const { params } = this.props.navigation.state;
    const post = params.post
    const index = params.index;

    return (
      <Container style={{backgroundColor:"#E7ECF0"}}>
        <Header style={{backgroundColor:"#617AF5"}} hasTabs>
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
        <Content style={{backgroundColor:"#fff"}}>
          {this.renderPost()}
        </Content>
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

const mapStateToProps = state => ({
  post: state.posts.item
})

export default connect(mapStateToProps, { addComment,commentVote,getPost })(FeedDetail)
