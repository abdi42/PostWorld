import React, { Component } from 'react'
import { StyleSheet,TouchableOpacity,Text,View,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import { Row,Container, Header, Left, Body, Right, Icon, Button ,Title,Content,Card,CardItem,Form,Textarea,Fab} from 'native-base'
import PostModal from '../../components/PostModal'
import { NavigationActions } from 'react-navigation'
import Post from '../../components/Post'
import { connect } from 'react-redux'
import { fetchPosts,getPost } from '../../actions/postActions'
import { postVote } from '../../actions/postActions'
import Add from '../../components/Add'
import ProfileImage from '../../components/ProfileImage'
Mapbox.setAccessToken('pk.eyJ1IjoiYWJkaTQyIiwiYSI6ImNqaHNlZm9pYTAyM3kzcW15Y2kzdHd3N2kifQ.899OIbr__amO23qmSrRmyw')

class MapScreen extends Component {

	constructor(props){
		super(props)

		this.state = {
			modal:true,
			index:null,
			visible:false,
			addVisible:false,
			latitude:null,
			longitude:null,
			error:null,
			finishedLoadingMap:true,
			data:[],
			visible:false
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.goToDetail = this.goToDetail.bind(this)
	}

	componentDidMount(){
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.setState({
					latitude: parseFloat(position.coords.latitude),
					longitude: parseFloat(position.coords.longitude),
					error: null,
				})
			},
			(error) => this.setState({ error: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
		)
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId)
	}

	getCurrentPosition(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: parseFloat(position.coords.latitude),
					longitude: parseFloat(position.coords.longitude),
					error: null,
				})
			})
	}


	onSubmit(){
		this.setState({addVisible:false})
	}


	renderAnnotations () {
		const posts = this.props.posts

		if(this.props.posts){
			return (
				posts.allIds.map((id,index) => {
					let post = this.props.posts.byId[id]
					let posLeft = 11.5

					if(post.voteCount < 10){
						posLeft = 16
					}

					if(post.map === true){
						return (
							<Mapbox.PointAnnotation
								key={index}
								id='pointAnnotation'
								coordinate={post.geo.coordinates}
								style={{padding:20,zIndex:100}}>

								<TouchableOpacity
									onPress={() => {
										this.setState({index:id,visible:true})
									}}>
									<ImageBackground source={require('./mark.png')} style={{width:45,height:50}}>
										<Text style={{zIndex:100,top:9,fontSize:18,left:posLeft,color:'white'}}>{post.voteCount}</Text>
									</ImageBackground>
								</TouchableOpacity>
								<Mapbox.Callout title='Look! An annotation!' />
							</Mapbox.PointAnnotation>
						)
					}
				})
			)
		}
	}

	goToDetail() {
		let post = this.props.posts.byId[this.state.index]
		this.setState({index:null,visible:false})
		this.props.getPost(post)
		this.props.navigation.navigate('FeedDetail',{post:post,index:this.state.index,postId:post.id})
	}

	showPost(){
		if(this.state.index != null){
			return (
				<PostModal closePost={() => this.setState({visible:false})} style={{top:75}} visible={this.state.visible} opacity={0}>
					<TouchableWithoutFeedback
						onPress={this.goToDetail}>
						<View style={{flex:1}}>
							<Post
								post={this.props.posts.byId[this.state.index]}
								geoDisabled={true}></Post>
						</View>
					</TouchableWithoutFeedback>
				</PostModal>
			)
		}
	}

	showModal(){
		this.refs.modal.setModalVisible(true)
	}

	showAddPost(content){
		return (
			<PostModal
				topClose={true}
				closePost={() => this.setState({addVisible:false})}
				style={{top:50}} visible={this.state.addVisible}
				opacity={1}>
				<Add onSubmit={this.onSubmit} geo={[this.state.longitude,this.state.latitude]} map navigate={this.props.navigation.navigate}></Add>
			</PostModal>
		)

	}

	reCenter(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: parseFloat(position.coords.latitude),
					longitude: parseFloat(position.coords.longitude),
					error: null,
				})
				this.map.flyTo([parseFloat(position.coords.longitude),parseFloat(position.coords.latitude)],600)
			})
	}

	render() {
		// const { postStore } = this.props.screenProps;
		// const {posts} = postStore;
		const backAction = NavigationActions.back({
			key: 'FeedScreen-1'
		})

		const backSample = NavigationActions.reset({
			key: 'Sample-1',
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'SamplePage' })],
		})

		const { params } = this.props.navigation.state
		let geo = [this.state.longitude,this.state.latitude]
		if((params != undefined || params != null) & params.geo){
			geo = params.geo
		}

		return (
			<View style={styles.container}>
				<Mapbox.MapView
					styleURL="mapbox://styles/abdi42/cjhsge0rx7vyo2rp9kfssubsz?optimize=true"
					ref={(ref) => (this.map = ref)}
					userTrackingMode={Mapbox.UserTrackingModes.Follow}
					zoomLevel={18}
					logoEnabled={false}
					compassEnabled={false}
					centerCoordinate={params.geo}
					showUserLocation={true}
					style={styles.container}
					heading={-60}
					pitch={60}
					onDidFinishRenderingMapFully={() => this.setState({finishedLoadingMap:true})}
				>
					{this.renderAnnotations()}
					<View>
						<TouchableOpacity
							style={{top:30,left:30,position:'absolute'}}
							onPress={() => {
								this.props.navigation.goBack()
							}}
							hitSlop={{top: 10, bottom: 10, left: 20, right: 22}}>
							<Icon style={{color:'white',fontSize:40}}name="md-arrow-round-back"/>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={{bottom:20,left:30,position:'absolute'}}
						onPress={this.reCenter.bind(this)}
						hitSlop={{top: 10, bottom: 10, left: 20, right: 22}}>
						<Icon style={{color:'white',fontSize:50}} name="md-locate" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => this.setState({addVisible:true})}
						style={{width:80,height:80,alignSelf:'center',marginBottom:25,position:'absolute',bottom:0}}>
						<View>
							<ImageBackground source={require('./addIcon.png')} style={{width:75,height:75,top:10,left:10}}></ImageBackground>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={{bottom:20,right:30,position:'absolute'}}
						onPress={() => this.props.navigation.navigate('SamplePage')}
						hitSlop={{top: 10, bottom: 10, left: 20, right: 22}}>
						<ProfileImage></ProfileImage>
					</TouchableOpacity>

				</Mapbox.MapView>
				{this.showPost()}
				{this.showAddPost()}
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	annotationContainer: {

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
		shadowColor:'#5484DA',
		shadowOffset:{width:2.5,height:2.5},
		shadowRadius:5,
		shadowOpacity:0.8
	},
	marker: {
		backgroundColor:'#5484DA',
		width: 50,
		height: 50,
		borderRadius: 25,
		shadowColor:'red',
		shadowOffset:{width:50,height:50},
		shadowRadius:5
	}
})

const mapStateToProps = state => {
	return {
		posts:state.posts,
		currentItem:state.posts.currentItem
	}
}

export default connect(mapStateToProps, { fetchPosts,postVote,getPost })(MapScreen)
