import React, {Component} from 'react';
import {Text, TouchableHighlight, View,StyleSheet,AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card,CardItem,Form,Textarea } from 'native-base';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions'

class Add extends React.Component {

  constructor(props){
    super(props);
    this.state ={ content:''}
  }

  submit(){

    AsyncStorage.getItem('userToken',(err,result) => {
      if(result == null){
        this.props.navigate("Prompt")
      } else {
        result = JSON.parse(result)
        
        if(this.props.geo)
          this.props.createPost(this.state.content,this.props.geo)
        else
          this.props.createPost(this.state.content,[],result);

        this.props.onSubmit()
      }
    })

  }

  render () {
    return (
      <View style={styles.modalContent}>
        <Card style={{borderRadius: 5, }}>
          <CardItem style={{borderRadius: 5, }}>
            <Body>
              <Form>
                <Textarea autoFocus={true} style={{height:200,fontSize:20}} placeholder="Create a new post" onChangeText={(content) => this.setState({content})}/>
              </Form>
            </Body>
          </CardItem>
        </Card>
        <Button
          onPress={() => this.submit()}
          style={{alignSelf: 'flex-end',marginTop:20,marginRight:15,padding:15,paddingLeft:40,paddingRight:40,borderRadius:3,backgroundColor:"#96F49F",borderColor:"black",borderWidth:0.5}}  small>
          <Text style={{fontSize:18,paddingBottom:22,color:'black',padding:0}}>Post</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#4F6EFD',
    padding:5,
  },
})


export default connect(null, { createPost })(Add)
