import React from 'react'
import PropTypes from 'prop-types'
import { View,StyleSheet,Dimensions,AsyncStorage,Image,TouchableOpacity } from 'react-native'
import { Container, Header, Content, Input, Item,Text,Button,Spinner,Grid,Row,Col,ActionSheet } from 'native-base';
const {height: screenHeight} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
var BUTTONS = ["Take photo...", "Choose from Library...","Cancel"];
var CANCEL_INDEX = 2;
class ImageUpload extends React.Component {

  constructor(props){
    super(props)
    this.selectImage = this.selectImage.bind(this)
  }

  selectImage(){
    const { params } = this.props.navigation.state;

    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      

      if (response.didCancel) {
        
      }
      else if (response.error) {
        
      }
      else if (response.customButton) {
        
      }
      else {
        const data = new FormData();
        data.append('image',{
          uri:response.uri,
          type:'image/jpeg',
          name:response.fileName,
        })

        fetch('http://localhost:3000/users/'+params.userId+'/image',{
          method:'POST',
          body:data
        })
        .then((response) => response.json())
        .then((responseJson) => {
          AsyncStorage.setItem('userToken',JSON.stringify(responseJson),(error) => {
            this.props.navigation.navigate('Tabs')
          })
        })
      }
    });
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <Button
              bordered
              style={{top:30,right:15,position:'absolute'}}
              onPress={() => this.props.navigation.navigate('Tabs')}>
              <Text>Skip</Text>
            </Button>
          </View>
          <View style={styles.body}>

            <Text style={{textAlign:"center",fontSize:30,alignSelf:"center",marginBottom:20,}}>Welcome</Text>

            <View>
              <Image
                style={{width: 150, height: 150}}
                source={require('./profile.png')}
              />
            </View>


            <Text style={{textAlign:"center",fontSize:20,alignSelf:"center",marginTop:20,}}>{"You're all set"}</Text>
            <Text style={{textAlign:"center",fontSize:20,alignSelf:"center",}}>{"Take a minute to upload a profile photo"}</Text>

            <Button
              style={{backgroundColor:"#A0F6A9",borderColor:"#979797",borderWidth:1,alignSelf:"center",marginTop:40,padding:0}}
              onPress={this.selectImage}
              >
              <Text style={{color:'black',padding:0,fontSize:20,marginLeft:12.5,marginRight:12.5}}>Upload Image</Text>
            </Button>

          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
  },
  header:{
    fontSize:45,
    textAlign:"center",
    color:"white",
    marginTop:100,
    marginBottom:100
  },
  inputText:{
    color:"#fff",
    textAlign:"center",
    fontSize:20,
    marginTop:50,
    marginBottom:5
  },
  body: {
    flex:1,
    height: screenHeight/2,
    marginTop:125,
    justifyContent: 'center',
    alignItems: 'center',
    padding:25,
  }
})


export default ImageUpload;
