import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	FlatList,
	Dimensions,
	Image
} from 'react-native'
import { Container,Header, Text, Button, Icon, Left, Right,Segment,Spinner } from 'native-base'
import { connect } from 'react-redux'
import { fetchPosts,getPost,postVote } from '../../actions/postActions'
import PostCard from '@components/PostCard'
import PropTypes from 'prop-types'
import theme from '@common/colors.js'
import styled from 'styled-components'

const {height: screenHeight} = Dimensions.get('window')

const SegmentText = styled(Text)`
  color:${props => props.active ? theme.blue : 'white'}
`

const SegmentButton = styled(Button)`
  background-color: ${props => props.active ? theme.blue : 'white'};
  border-color: #000000;
  border-top-left-radius:0;
  border-bottom-left-radius:0;
  border-top-right-radius:0;
  border-bottom-right-radius:0;
`
const HeaderStyled = styled(Header)`
	background-color:#FAFAFA
`


const ErrorIcon = styled(Icon)`
	color:#636e72;
	font-size:75;
	padding-bottom:25;
`

const Content = styled.View`
	flex:1;
	background-color:#FAFAFA
`

const CenterContent = styled.View`
	justify-content: center;
	align-items: center;
	padding:50;
	padding-top:75;
`

const MapIcon = styled.Image`
	width:30;
	height:30;
`

class Feed extends Component {

	constructor(props){
		super(props)
		this.state ={
			isLoading: true,seg:1,latitude:0,longitude:0,
			data:[],
			skipBy:0,
			scrolling:true,
			refresh:false
		}
		this.loadPosts = this.loadPosts.bind(this)
		this._scrollToTop = this._scrollToTop.bind(this)
		this.segmentPress = this.segmentPress.bind(this)
	}

	segmentPress() {
		this.props.loading = true

		let seg = this.state.seg === 1 ? 2 : 1
		this.setState({seg})
		this.props.fetchPosts(seg === 1)
	}

	componentDidMount(){
		this.props.navigation.setParams({
			scrollToTop: this._scrollToTop
		})
		this.props.fetchPosts(true)
	}

	goToMap(){
		this.props.navigation.navigate('MapScreen',{})
	}

	_keyExtractor (item) {
		return item
	}

	_scrollToTop(){
		this.flatListRef.scrollToOffset({x: 0, y: 0, animated: true})
	}

	showActionSheet(){

	}

	_renderPosts (data) {
		const post = this.props.byId[data.item]
		return (
			<TouchableWithoutFeedback
				key={data}
				onPress={() => {
					this.props.getPost(post)
					this.props.navigation.navigate({key:'FeedDetail-1',routeName:'FeedDetail',params:{post:post,index:data.index,postId:post.id}})
				}}>
				{
					<View style={{flex:1,backgroundColor:'#E7ECF0',paddingBottom:0}}>
						<PostCard
							post={post}
							geoDisabled={false}
							goToGeo={() =>  this.props.navigation.navigate({key:'MapScreen-1',routeName:'MapScreen',params:{geo:post.geo.coordinates,prevPost:post._id}})}
							onVote={this.props.postVote}>

						</PostCard>
					</View>
				}
			</TouchableWithoutFeedback>
		)
	}

	loadPosts() {
		let skipBy = this.state.skipBy + 10

		this.setState({skipBy})
		this.props.fetchPosts()
	}

	render(){
		let feedView =  (
			<View style={styles.body}>
				<Spinner color='black' />
			</View>
		)

		if(this.props.allIds && !this.props.loading){
			feedView = (
				<FlatList
					ref={(ref) => { this.flatListRef = ref }}
					style={styles.main}
					data={this.props.allIds}
					extraProps={this.props.byId}
					renderItem={this._renderPosts.bind(this)}
					keyExtractor={this._keyExtractor}
					initialNumToRender={4}
					refreshing={this.props.loading}
					onRefresh={() => this.props.fetchPosts(this.state.seg === 1)}
				>
				</FlatList>
			)
		} else if(this.props.error !== null){
			feedView = (
				<CenterContent>
					<ErrorIcon type="FontAwesome" name="exclamation-circle" />
					<Text style={{color:'#636e72',textAlign:'center',fontSize:30}}>{this.props.error.message}</Text>
				</CenterContent>
			)
		}

		return (
			<Container>
				<HeaderStyled hasTabs rounded>
					<Left/>
					<Segment style={styles.background}>
						<SegmentButton
							first
							active={this.state.seg === 1 ? true : false}
							small
							onPress={this.segmentPress}>
							<SegmentText active={this.state.seg === 2}>New</SegmentText>
						</SegmentButton>
						<SegmentButton
							last
							active={this.state.seg === 2 ? true : false}
							small
							onPress={this.segmentPress}>
							<SegmentText active={this.state.seg === 1}>Hot</SegmentText>
						</SegmentButton>
					</Segment>
					<Right>
						<Button
							transparent
							onPress={() => this.goToMap()}
						>
							<MapIcon source={require('./logo.png')} />
						</Button>
					</Right>
				</HeaderStyled>
				<Content>
					{feedView}
				</Content>
			</Container>
		)
	}
}

Feed.propTypes = {
	loading:PropTypes.bool,
	error:PropTypes.object,
	allIds:PropTypes.array,
	byId:PropTypes.object,
	postVote:PropTypes.func,
	getPost:PropTypes.func,
	fetchPosts:PropTypes.func,
	navigation:PropTypes.object
}


const styles = StyleSheet.create({
	main:{

	},
	body: {
		flex:1,
		height: screenHeight/2,
		justifyContent: 'center',
		alignItems: 'center',
		padding:25,
		paddingTop:25
	}
})

const mapStateToProps = state => {
	return {
		allIds:state.posts.allIds,
		byId:state.posts.byId,
		user:state.posts.user,
		currentItem:state.posts.currentItem,
		loading:state.posts.loading,
		error:state.posts.error
	}
}

export default connect(mapStateToProps, { fetchPosts,getPost,postVote })(Feed)
