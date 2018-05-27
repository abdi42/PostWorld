import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { Container,List,ListItem, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Segment,Grid,Row,Fab } from 'native-base';
import PostCard from '../../components/PostCard';
import PostStore from '../../stores/Posts.js';
import { observer } from 'mobx-react';

const OPostCard = observer(PostCard);

@observer
class Feed extends Component {


  constructor(props){
    super(props);
    this.state ={ isLoading: true,seg:1,latitude:0,longitude:0}

  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.props.screenProps.postStore.fetchPosts();
  }

  showModal(){
    this.refs.modal.setModalVisible(true);
  }

  addPost(content){
    const {postStore} = this.props.screenProps;
    postStore.addPost(content);
  }

  _renderPosts= ({item,index}) => {
    const {postStore} = this.props.screenProps;
    const post = item;

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.props.navigation.navigate("FeedDetail",{post:post,index:index})}
        >
        <ListItem noBorder>
          <OPostCard
            post={post}
            goToGeo={() => this.props.navigation.navigate("MapScreen",{geo:post.geo})}
            onUpVote={() => postStore.upVote(index)}
            onDownVote={() => postStore.downVote(index)}></OPostCard>
        </ListItem>
      </TouchableWithoutFeedback>
    )
  }

  goToMap(){
    this.props.navigation.navigate("MapScreen",{geo:[this.state.longitude,this.state.latitude]});
  }

  render(){
    const { postStore } = this.props.screenProps

    return (
    <Container>
      <Header style={{backgroundColor:"#2ecc71"}} hasTabs rounded>
        <Left/>
        <Body>
          <Segment style={{backgroundColor:"#2ecc71"}}>
            <Button
              first
              style={{backgroundColor: this.state.seg === 1 ? "white" : "#2ecc71",borderColor: "white"}}
              active={this.state.seg === 1 ? true : false}
              small
              onPress={() => this.setState({ seg: 1 })}
              ><Text style={{color: this.state.seg === 1 ? "#2ecc71" : "white"}}>Hot</Text></Button>
            <Button
              last
              style={{backgroundColor: this.state.seg === 2 ? "white" : "#2ecc71",borderColor: "white"}}
              active={this.state.seg === 2 ? true : false}
              small
              onPress={() => this.setState({ seg: 2 })}
              ><Text style={{color: this.state.seg === 2 ? "#2ecc71" : "white"}}>New</Text></Button>
          </Segment>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.goToMap()}
            >
            <Icon style={{color:'white'}}name="ios-map-outline"/>
          </Button>
        </Right>
      </Header>
      <Content style={styles.main}>
        if(postStore.state == "Done"){
          <FlatList
            data={postStore.posts}
            renderItem={this._renderPosts}
            initialNumToRender={4}/>
        }
      </Content>
    </Container>
  )
  }
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:"#E7ECF0"
  }
})

export default Feed;
