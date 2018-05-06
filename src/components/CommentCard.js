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
  constructor(props){
    super(props);
  }

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
        <CardItem style={{backgroundColor:"#FDF9F0"}} >
          <Left>
            <Thumbnail source={{uri: uri}} />
            <Body>
              <Text>{comment.username}</Text>
              <Text note>GeekyAnts</Text>
            </Body>
            <Right >
              <TouchableOpacity transparent hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}  vertical>
                <Icon active name="arrow-up" style={{fontSize:35,lineHeight:0,letterSpacing:0}} />
              </TouchableOpacity>
              <Text style={{marginRight:votesMargin}}>{comment.votes}</Text>
              <TouchableOpacity transparent hitSlop={{top: 10, bottom: 10, left: 15, right: 15}} vertical>
                <Icon active name="arrow-down" style={{fontSize:35,lineHeight:0,letterSpacing:0}} />
              </TouchableOpacity>
            </Right>
          </Left>
        </CardItem>
        <CardItem style={{backgroundColor:"#FDF9F0"}}>
          <Body>
            <Text>{comment.content}</Text>
          </Body>
        </CardItem>
        <CardItem style={{backgroundColor:"#FDF9F0"}} >
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
