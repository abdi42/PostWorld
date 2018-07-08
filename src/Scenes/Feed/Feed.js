import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Container,List,ListItem, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Segment,Grid,Row,Fab,Spinner } from 'native-base';
import FeedView from '../../components/FeedView'
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions'
import Post from '../../components/Post';
import Modal from '../../components/Modal'
const {height: screenHeight} = Dimensions.get('window');

class Feed extends Component {


  constructor(props){
    super(props);
    this.state ={
      isLoading: true,seg:1,latitude:0,longitude:0,
      data:[]
    }

  }

  componentWillMount(){
    this.props.fetchPosts();
  }

  goToMap(){
    this.props.navigation.navigate("MapScreen",{});
  }

  _keyExtractor = (item, index) => item.id;


  _renderPosts= (data) => {
    const post = data.item;
    return (
      <TouchableWithoutFeedback
        key={data.index}
        onPress={() => this.props.navigation.navigate("FeedDetail",{post:post,index:data.index,postId:post.id})}>
        <View style={{margin:0}}>
          <Post post={post} navigation={this.props.navigation} style={{margin:0}}>
          </Post>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  render(){

    let feedView =  (
      <View style={styles.body}>
        <Spinner color='black' />
      </View>
    )
    if(this.props.posts.length > 0){
      feedView =  (
        <FlatList
          style={styles.main}
          data={this.props.posts}
          renderItem={this._renderPosts.bind(this)}
          >
        </FlatList>
      )
    }

    return (
    <Container>
      <Header style={{backgroundColor:"#FAFAFA"}} hasTabs rounded>
        <Left/>
          <Segment style={{backgroundColor:"#FAFAFA"}}>
            <Button
              first
              style={{backgroundColor: this.state.seg === 1 ? "#617AF5" : "white",borderColor: "black",borderTopLeftRadius:0,borderBottomLeftRadius:0}}
              active={this.state.seg === 1 ? true : false}
              small
              onPress={() => this.setState({ seg: 1 })}
              ><Text style={{color: this.state.seg === 1 ? "white" : "black"}}>Hot</Text></Button>
            <Button
              last
              style={{backgroundColor: this.state.seg === 2 ? "#617AF5" : "white",borderColor: "black",borderTopRightRadius:0,borderBottomRightRadius:0}}
              active={this.state.seg === 2 ? true : false}
              small
              onPress={() => this.setState({ seg: 2 })}
              ><Text style={{color: this.state.seg === 2 ? "white" : "black"}}>New</Text></Button>
          </Segment>
        <Right>
          <Button
            transparent
            onPress={() => this.goToMap()}
            >
            <Icon style={{color:'#617AF5'}}name="ios-map-outline"/>
          </Button>
        </Right>
      </Header>
      <Content style={{backgroundColor:"#FAFAFA"}}>
        {feedView}
      </Content>
    </Container>
  )
  }
}

const styles = StyleSheet.create({
  main:{

  },
  body: {
    flex:1,
    height: screenHeight/2,
    justifyContent: 'center',
    alignItems: 'center',
    padding:25,
    paddingTop:25
  }
})

const mapStateToProps = state => {
  let storedPosts = state.posts.items.map(post => ({key:post.id, ...post}))
  return {
    posts: storedPosts,
    newPost:state.posts.item
  }
}

export default connect(mapStateToProps, { fetchPosts })(Feed);

/*        <FeedView postStore={postStore} posts={this.props.posts} navigate={this.props.navigation.navigate}></FeedView> */
