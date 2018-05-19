import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Container,List,ListItem, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class PostCard extends Component {
  constructor(props){
    super(props);
  }

  render(){
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
            <Button transparent small>
              <Icon active name="chatbubbles" />
              <Text>{post.comments.length}</Text>
            </Button>
          </Body>
          <Right style={styles.buttons}>
            <Button transparent small>
              <Icon active name="heart" style={{color:"#e74c3c"}} />
              <Text style={{color:"#7f8c8d"}}>{post.likes} Likes</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
  )
  }
}

const styles = StyleSheet.create({
  buttons:{
    flex:1,
    flexDirection: 'row'
  }
})

export default PostCard;
