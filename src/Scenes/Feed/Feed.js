import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { Container,List,ListItem, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Segment,Grid,Row,Fab } from 'native-base';
import PostCard from '../../components/PostCard';
import PostStore from '../../stores/Posts.js';
import { observer } from 'mobx-react';
import AddPost from '../../components/AddPost'

const OPostCard = observer(PostCard);

@observer
class Feed extends Component {


  constructor(props){
    super(props);
    this.state ={ isLoading: true}

  }

  componentDidMount(){
    this.props.screenProps.postStore.fetchPosts();
  }

  showModal(){
    this.refs.modal.setModalVisible(true);
  }

  addPost(content){
    console.log(this.props)
    const {postStore} = this.props.screenProps;
    postStore.addPost(content);
  }

  renderPosts() {
    const {postStore} = this.props.screenProps;
    const {posts} = postStore;

    if(postStore.state == 'done'){
      return (
        <List>
          {
            posts.map((post,index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => this.props.navigation.navigate("FeedDetail",{post:post,index:index})}
                  >
                  <ListItem noBorder>
                    <OPostCard
                      post={post}
                      onUpVote={() => postStore.upVote(index)}
                      onDownVote={() => postStore.downVote(index)}></OPostCard>
                  </ListItem>
                </TouchableWithoutFeedback>
              );
            })
          }
        </List>
      )
    }

    return <List noBorder>{posts}</List>
  }
  render(){
    const { postStore } = this.props.screenProps

    return (
    <Container>
      <Header style={{backgroundColor:"#343434"}} hasTabs>
        <Left/>
        <Body>
          <Title style={{color:"white"}}>Feed</Title>
        </Body>
        <Right>
          <Button
            style={{top:2}}
            transparent
            onPress={() => this.props.navigation.navigate("MapStack")}
            >
            <Icon style={{color:'white'}}name="ios-map-outline"/>
          </Button>
        </Right>
      </Header>
      <Content style={styles.main}>
        {this.renderPosts()}
      </Content>
    </Container>
  )
  }
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:"#343434"
  }
})

export default Feed;
