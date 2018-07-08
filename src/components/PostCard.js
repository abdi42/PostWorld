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
    if(post.geo.length > 0 && !this.props.geoDisabled){
      return (
        <Button small transparent style={{paddingBottom:0}} onPress={() => this.props.goToGeo()} hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}>
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
      <View style={styles.card}>
        <CardItem style={{paddingTop:0,paddingBottom:0}} >
          <Left>
            <Thumbnail source={{uri: post.image}} small/>
            <Body>
              <Text style={{fontFamily:"Helvetica Neue",fontWeight:"bold"}}>{post.username}</Text>
            </Body>
            <Right >
              <TouchableOpacity
                transparent
                hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                onPress={this.props.onUpVote}
                vertical>
                <Icon active type="FontAwesome" name="caret-up" style={{fontSize:30,lineHeight:0,letterSpacing:0,color: post.userVoted === "up" ? "#2ecc71" : "#AAAAAA"}} />
              </TouchableOpacity>
              <Text style={{marginRight:0,fontSize:12.5,fontWeight:"bold"}}>{post.voteCount}</Text>
              <TouchableOpacity
                transparent
                hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
                onPress={this.props.onDownVote}
                vertical>
                <Icon active type="FontAwesome" name="caret-down" style={{fontSize:30,lineHeight:0,letterSpacing:0,color: post.userVoted === "down" ? "#2ecc71" : "#AAAAAA"}} />
              </TouchableOpacity>
            </Right>
          </Left>
        </CardItem>
        <CardItem style={{backgroundColor:"#fff",paddingTop:0,paddingBottom:0}}>
          <Body>
            <Text style={{fontFamily:"Helvetica Neue",fontSize:15}}>{post.content}</Text>
          </Body>
        </CardItem>
        <CardItem style={{backgroundColor:"#fff",flex: 1, flexShrink:1, flexDirection: 'row', alignItems:'center', justifyContent: 'space-between',paddingTop:0,paddingBottom:0}} footer >
          <Text style={{color:"#7f8c8d",fontSize:14}}>{post.time} - {post.distance}</Text>
          {this.isGeoPost(post)}
          <Icon name="ios-more" style={{textAlign:'center',paddingTop:6}} hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}></Icon>
          <Text style={{paddingLeft:8,color:"#AAAAAA",fontSize:15}}>{post.comments.length} replies</Text>
        </CardItem>
      </View>
  )
  }
}

const styles = StyleSheet.create({
  buttons:{
    flex:1,
    flexDirection: 'row'
  },
  card: {
    marginVertical: 0.5,
    marginHorizontal: 0.5,
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#ccc",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    elevation: 3,
    padding:5
  }
})

export default PostCard;
