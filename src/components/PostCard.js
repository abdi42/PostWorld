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

  isGeoPost(post){
    if(post.geo.length > 0){
      return (
        <Button small transparent style={{paddingBottom:0}} onPress={() => this.props.goToGeo()}>
          <Image source={require('../resources/earth-globe.png')} style={{width:20,height:20}} />
        </Button>
      )
    }
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
        <CardItem style={{backgroundColor:"#fff"}} >
          <Left>
            <Thumbnail source={{uri: uri}} />
            <Body>
              <Text>{post.username}</Text>
              <Text style={{color:"#7f8c8d",fontSize:14}}>Sub Header</Text>
            </Body>
            <Right >
              <TouchableOpacity
                transparent
                hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                onPress={() => this.props.onUpVote()}
                vertical>
                <Icon active name="arrow-up" style={{fontSize:35,lineHeight:0,letterSpacing:0,color: post.userVoted === "up" ? "#2ecc71" : "#AAAAAA"}} />
              </TouchableOpacity>
              <Text style={{marginRight:votesMargin}}>{post.voteCount}</Text>
              <TouchableOpacity
                transparent
                hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                onPress={() => this.props.onDownVote()}
                vertical>
                <Icon active name="arrow-down" style={{fontSize:35,lineHeight:0,letterSpacing:0,color: post.userVoted === "down" ? "#2ecc71" : "#AAAAAA"}} />
              </TouchableOpacity>
            </Right>
          </Left>
        </CardItem>
        <CardItem style={{backgroundColor:"#fff"}}>
          <Body>
            <Text>{post.content}</Text>
          </Body>
        </CardItem>
        <CardItem style={{backgroundColor:"#fff",flex: 1, flexShrink:1, flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}} footer >
          <Text style={{color:"#7f8c8d",fontSize:14}}>{post.time} - {post.distance}</Text>
          {this.isGeoPost(post)}
          <Icon name="ios-more" style={{textAlign:'center',paddingTop:6}}></Icon>
          <Text style={{paddingLeft:8,color:"#AAAAAA",fontSize:15}}>{post.comments.length} replies</Text>
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
