import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity,Text,View,KeyboardAvoidingView} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { observer } from 'mobx-react';
import { Row,Container, Header, Left, Body, Right, Icon, Button ,Title,Content,Card,CardItem,Form,Textarea,Fab} from 'native-base';
import Modal from "react-native-modal";
import AddPost from '../../components/AddPost'
import PostModal from '../../components/PostModal'
import {observable} from "mobx"
import { NavigationActions } from 'react-navigation'

Mapbox.setAccessToken('pk.eyJ1IjoiYWJkaTA5ODciLCJhIjoiY2pkaWFhaTgzMTcyZjJ3bjkwcDVmc3NnOCJ9.LtY3fCxcNNuuGQHXgsl6aA');

@observer
class Mapscreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      modal:true,
      index:null,
      visible:false,
      error:null,
      finishedLoadingMap:false
    }
  }

  componentDidMount(){
    this.props.screenProps.postStore.fetchPosts();
  }

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: parseInt(position.coords.latitude),
          longitude: parseInt(position.coords.longitude),
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  closePost(){

  }

  renderAnnotations () {
    const {postStore} = this.props.screenProps;

    return (
      postStore.posts.map((post,index) => {
        if(post.geo.slice().length > 0 && this.state.finishedLoadingMap == true){
          return (
            <Mapbox.PointAnnotation
              key={index}
              id='pointAnnotation'
              coordinate={post.geo.slice()}>

              <TouchableOpacity
                onPress={() => {
                  this.setState({index:index,visible:true});
                }}>
                <View style={styles.annotationContainer}>
                  <View style={styles.annotationFill} />
                </View>
              </TouchableOpacity>
              <Mapbox.Callout title='Look! An annotation!' />
            </Mapbox.PointAnnotation>
          )
        }
      })
    )
  }

  showPost(){
    const {postStore} = this.props.screenProps;
    const {posts} = postStore;
    if(postStore.state == 'done' && this.state.index != null){
      return (
        <PostModal closePost={() => this.setState({visible:false})} visible={this.state.visible} postStore={this.props.screenProps.postStore} post={this.props.screenProps.postStore.getPost(this.state.index)}></PostModal>
      )
    }
  }

  showModal(){
    this.refs.modal.setModalVisible(true);
  }

  addPost(content){
    const {postStore} = this.props.screenProps;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        postStore.addPost(content,[parseFloat(position.coords.longitude),parseFloat(position.coords.latitude)]);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }

  render() {
    const { postStore } = this.props.screenProps;
    const {posts} = postStore;
    const backAction = NavigationActions.back({
      key: null
    })

    return (
      <View style={styles.container}>
        <Mapbox.MapView
            userTrackingMode={Mapbox.UserTrackingModes.Follow}
            styleURL={Mapbox.StyleURL.Dark}
            zoomLevel={19}
            showUserLocation={true}
            style={styles.container}
            heading={-60}
            pitch={60}
            onDidFinishLoadingMap={() => this.setState({finishedLoadingMap:true})}
            >
            <Row>
              <TouchableOpacity style={{top:30,left:30}} onPress={() => this.props.navigation.dispatch(backAction)}>
                <Icon style={{color:'white',fontSize:35}}name="ios-arrow-back"/>
              </TouchableOpacity>
            </Row>

            {this.renderAnnotations()}

            <Fab large
              position="bottomRight"
              containerStyle={{left: '42%'}}
              style={{backgroundColor:"#3270CE",width:75,height:75,borderRadius:100}}
              centerCoordinate={[-96.01927, 41.248708]}
              onPress={() => this.showModal()}
            >
              <Icon name="md-create"/>
            </Fab>
        </Mapbox.MapView>
        <AddPost ref='modal' postStore={this.props.screenProps.postStore} onSubmit={this.addPost.bind(this)}></AddPost>
        {this.showPost()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
});


export default Mapscreen;
