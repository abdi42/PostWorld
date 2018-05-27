import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Container,List,ListItem, Header, Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class CommentCard extends Component {

  render(){
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    const { comment } = this.props;

    if(comment.votes.length < 10){
      votesMargin = 5;
    }
    else {
      votesMargin = 1;
    }

    return (
      <View>
        <CardItem style={{backgroundColor:"#fff"}} >
          <Left>
            <Thumbnail source={{uri: uri}} />
            <Body>
              <Text>{comment.username}</Text>
              <Text style={{color:"#7f8c8d",fontSize:14}}>{comment.time} - {comment.distance}</Text>
            </Body>
            <Right >
              <TouchableOpacity
                transparent
                hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                onPress={() => this.props.onUpVote()}
                vertical>
                <Icon active name="arrow-up" style={{fontSize:35,lineHeight:0,letterSpacing:0,color: comment.userVoted === "up" ? "#2ecc71" : "#AAAAAA"}} />
              </TouchableOpacity>
              <Text style={{marginRight:votesMargin}}>{comment.votes}</Text>
              <TouchableOpacity
                transparent
                hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                onPress={() => this.props.onDownVote()}
                vertical>
                <Icon active name="arrow-down" style={{fontSize:35,lineHeight:0,letterSpacing:0,color: comment.userVoted === "down" ? "#2ecc71" : "#AAAAAA"}} />
              </TouchableOpacity>
            </Right>
          </Left>
        </CardItem>
        <CardItem style={{backgroundColor:"#fff"}}>
          <Body>
            <Text>{comment.content}</Text>
          </Body>
        </CardItem>
        <CardItem style={{backgroundColor:"#fff"}} >
          <Left>
            <Text style={{color:"#7f8c8d"}}>{comment.distance}</Text>
          </Left>
        </CardItem>
      </View>
  )
  }
}

const styles = StyleSheet.create({
  buttons:{
    flex:1,
    flexDirection: 'row'
  }
})

export default CommentCard;
