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
import { Container,List,ListItem, Header, Title, Content,Spinner, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Footer,FooterTab,Form,Item,Input} from 'native-base';
import PostCard from '../../components/PostCard'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CommentCard from '../../components/CommentCard';
import { connect } from 'react-redux';
import { addComment,commentVote,getPost,postVote } from '../../actions/postActions'
import { NavigationActions } from 'react-navigation';
import Post from '../../components/Post'
import DismissKeyboard from 'dismissKeyboard';

class InputForm extends Component {

  constructor(props){
    super(props);
    this.state ={}

    this.onChanged = this.onChanged.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  onChanged(comment) {
    this.setState({comment})
  }

  onAdd(){
    DismissKeyboard()

    this.props.addComment(this.state.comment)
    this.setState({comment:''})
  }

  render() {
    return (
      <FooterTab style={{backgroundColor:"#E7ECF0"}}>
        <Input style={{backgroundColor:'white',borderRadius:5,marginLeft:15,marginTop:7,marginRight:25,height:40}}  placeholder='Add a comment' onSubmitEditing={this.onAdd}  onChangeText={this.onChanged}>{this.state.comment}</Input>
        <TouchableOpacity
          transparent
          hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
          vertical
          onPress={this.onAdd}>
          <Icon active name='ios-arrow-forward-outline' style={{color:"#4589F3",marginTop:10,marginRight:20}}/>
        </TouchableOpacity>
      </FooterTab>
    )
  }
}

class FeedDetail extends Component {

  constructor(props){
    super(props);
    this.state ={ post: null }
    this._header = this._header.bind(this);
    this.onChanged = this.onChanged.bind(this)
    this.addComment = this.addComment.bind(this)
    this.onCommentVote = this.onCommentVote.bind(this)
  }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    const setParamsAction = NavigationActions.setParams({
      params: {hideTabBar: true}
    });
    this.props.navigation.dispatch(setParamsAction);
  }

  onCommentVote(commentId,dir){
    this.props.commentVote(this.props.post.id,commentId,dir)
  }

  _keyExtractor(item){
    return item
  };

  renderPost(){
    const { params } = this.props.navigation.state;
    if(this.props.post && this.props.post.comments){
      return (
        <FlatList
          ref={(ref) => { this.flatListRef = ref }}
          data={this.props.post.comments.allIds}
          renderItem={this._renderComment.bind(this)}
          initialNumToRender={4}
          ListHeaderComponent={this._header.bind(this)}
          keyExtractor={this._keyExtractor}
          />
      )
    } else {
      return (
        <View style={styles.body}>
          <Spinner color='black' />
        </View>
      )
    }
  }


  _header(){
    const { params } = this.props.navigation.state;
    const post = params.post

    return (
      <View style={{flex:1,backgroundColor:"#E7ECF0",paddingBottom:5}}>
        {
          <PostCard
            style={{margin:0}}
            post={this.props.post}
            geoDisabled={this.props.post.map}
            goToGeo={() => this.props.navigation.navigate('MapScreen',{geo:this.props.post.geo.coordinates,prevPost:this.props.post._id})}
            onVote={this.props.postVote}>

          </PostCard>
				}
      </View>
    )
  }

  commentVote(post,dir,index,comment,commentIndex){
    if(comment.votes.length > 0){
      return
    }
    this.props.commentVote(post,dir,index,comment,commentIndex)
  }

  _renderComment = ({item,index}) => {
    const { params } = this.props.navigation.state;
    const post = this.props.post
    const comment = this.props.post.comments.byId[item];

    return (
      <CommentCard
        key={item}
        comment={comment}
        onVote={this.onCommentVote}></CommentCard>
    )
  }

  addComment(content){
    const { params } = this.props.navigation.state;
    const post = params.post

    const comment = content;

    const allIds = this.props.post.comments.allIds
    let lastIndex = this.props.post.comments.allIds.length

    if(lastIndex > 0)
      lastIndex -= 1

    this.props.addComment("John Doe",comment,post,content,() => {
      this.flatListRef.scrollToIndex({animated: true,index:lastIndex,viewPosition:0.75})
    })
  }

  onChanged(comment) {
    this.setState({comment})
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
        <View style={{flex:1}}>
          {this.renderPost()}
        </View>
        <Footer>
          <InputForm addComment={this.addComment}></InputForm>
        </Footer>
        <KeyboardSpacer/>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  body: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:25,
  }
})

const mapStateToProps = state => {

  return {
    post: state.posts.byId[state.posts.item],
    isFetching: state.posts.isFetching
  }
}

export default connect(mapStateToProps, { addComment,commentVote,getPost,postVote })(FeedDetail)
