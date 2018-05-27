import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity,Text,View,KeyboardAvoidingView} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { observer } from 'mobx-react';
import { Row,Container, Header, Left, Body, Right, Icon, Button ,Title,Content,Card,CardItem,Form,Textarea,Fab} from 'native-base';
import PostModal from '../../components/PostModal'
import {observable} from "mobx"
import { NavigationActions } from 'react-navigation'
import PostCard from '../../components/PostCard';

const OPostCard = observer(PostCard);
Mapbox.setAccessToken('pk.eyJ1IjoiYWJkaTA5ODciLCJhIjoiY2pkaWFhaTgzMTcyZjJ3bjkwcDVmc3NnOCJ9.LtY3fCxcNNuuGQHXgsl6aA');

@observer
class MapScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      modal:true,
      index:null,
      visible:false,
      error:null,
      finishedLoadingMap:true
    }
  }

  componentDidMount(){
    this.getCurrentPosition()
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
          const post = postStore.posts[index];

          return (
            <Mapbox.PointAnnotation
              key={index}
              id='pointAnnotation'
              coordinate={post.geo.slice()}>

              <TouchableOpacity
                onPress={() => {
                  this.setState({index:index,visible:true});
                }}>
                <View style={styles.markerContainer}>
                  <View style={styles.marker}>
                    <Text
                      style={{margin:10,color:"white",fontWeight:"900",textAlign:"center",fontSize:20}}
                      >{post.voteCount}</Text>
                  </View>
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
        <PostModal closePost={() => this.setState({visible:false})} visible={this.state.visible}>
          <OPostCard
            post={this.props.screenProps.postStore.getPost(this.state.index)}
            onUpVote={() => postStore.upVote(this.state.index)}
            onDownVote={() => postStore.downVote(this.state.index)}></OPostCard>
        </PostModal>
      )
    }
  }

  showModal(){
    this.refs.modal.setModalVisible(true);
  }

  addPost(content){

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.navigation.navigate('AddPost',{geo:[parseFloat(position.coords.longitude),parseFloat(position.coords.latitude)]})
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
    const { params } = this.props.navigation.state;
    let geo = [this.state.longitude,this.state.latitude];

    if((params != undefined || params != null) & params.geo){
      geo = params.geo
    }

    return (
      <View style={styles.container}>
        <Mapbox.MapView
            ref={(ref) => (this.map = ref)}
            userTrackingMode={Mapbox.UserTrackingModes.Follow}
            styleURL="mapbox://styles/abdi0987/cjdkviz0003tn2snzce36tc64"
            zoomLevel={19}
            centerCoordinate={params.geo}
            showUserLocation={true}
            style={styles.container}
            heading={-60}
            pitch={60}
            onDidFinishRenderingMapFully={() => this.setState({finishedLoadingMap:true})}
            >

            {this.renderAnnotations()}

            <View>
              <TouchableOpacity style={{top:30,left:30}} onPress={() => this.props.navigation.dispatch(backAction)}>
                <Icon style={{color:'white',fontSize:35}}name="ios-arrow-back"/>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this.addPost()}
              style={{width:80,height:80,alignSelf:'center',marginBottom:25,position:'absolute',bottom:0}}>
              <View
                 style={styles.roundedButton}>
                 <Icon style={{color:"white",fontSize:30,marginLeft:5}} name="md-create" />
              </View>
            </TouchableOpacity>

        </Mapbox.MapView>
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
  roundedButton: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop:10,
    //paddingTop:15,
    //paddingBottom:15,
    width:80,
    height:80,
    backgroundColor:'#5484DA',
    borderRadius:40,
    borderWidth: 1,
    borderColor: '#5484DA',
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  markerContainer:{
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor:"#5484DA",
    shadowOffset:{width:2.5,height:2.5},
    shadowRadius:5,
    shadowOpacity:0.8
  },
  marker: {
    backgroundColor:"#5484DA",
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor:"red",
    shadowOffset:{width:50,height:50},
    shadowRadius:5
  }
});


export default MapScreen;
