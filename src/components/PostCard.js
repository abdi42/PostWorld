import React, { Component,PureComponent } from 'react'
import {
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native'

import PropTypes from 'prop-types'
import { Thumbnail, Icon, Left, ActionSheet,Body, Right } from 'native-base'
import { Card,CardItem } from './common/Card'
import Text from '@common/Text'
import Vote from '@common/Vote'
import theme from '@common/colors.js'

class BaseThumbnail extends Component{
	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<Thumbnail source={{uri: this.props.uri}} small/>
		)
	}
}

BaseThumbnail.propTypes = {
	uri:PropTypes.string
}


var BUTTONS = ['Tweet post', 'Cancel']
var TWEET_INDEX = 0
var CANCEL_INDEX = 1

class PostCard extends Component {

	constructor(props){
		super(props)
		this.vote = this.vote.bind(this)
	}

	shouldComponentUpdate(nextProps) {
		return this.props.post.voteCount !== nextProps.post.voteCount
	}

	vote(dir){

		const { post } = this.props

		this.props.onVote(post.id,dir)
	}

	showActionSheet(){
		ActionSheet.show(
			{
				options: BUTTONS,
				cancelButtonIndex: CANCEL_INDEX,
				title: 'Share'
			},
			buttonIndex => {}
		)
	}

	render() {
		const { post } = this.props

		let mapButton = null

		if(post.map === true && !this.props.geoDisabled){
			mapButton = (
				<TouchableOpacity style={styles.noPadding} onPress={() => this.props.goToGeo()} hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}>
					<Image source={require('./logo.png')} style={styles.image} />
				</TouchableOpacity>
			)
		}

		return (
			<Card >
				<CardItem>
					<Left>
						<BaseThumbnail uri={post.user.image}></BaseThumbnail>
						<Body>
							<Text bold>{post.user.handle}</Text>
						</Body>
						<Right >
							<Vote onDownVote={this.vote} onUpVote={this.vote} voteCount={post.voteCount} votes={post.votes}></Vote>
						</Right>
					</Left>
				</CardItem>
				<CardItem>
					<Body>
						<Text>{post.content}</Text>
					</Body>
				</CardItem>
				<CardItem style={styles.card} footer >
					<Text subdue size={14}>{post.time} - {post.distance}</Text>
					{mapButton}
					<TouchableOpacity style={styles.noPadding} onPress={this.showActionSheet} hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}>
						<Icon name="ios-more" style={styles.icon} hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}></Icon>
					</TouchableOpacity>
					<Text style={styles.text}>{post.replies} replies</Text>
				</CardItem>
			</Card>
		)
	}
}


PostCard.propTypes = {
	post:PropTypes.object,
	geoDisabled:PropTypes.bool,
	goToGeo:PropTypes.func,
	onVote:PropTypes.func
}


const styles = StyleSheet.create({
	card:{
		backgroundColor:theme.white,
		flex: 1,
		flexShrink:1,
		flexDirection: 'row',
		alignItems:'center',
		justifyContent: 'space-between',
		paddingTop:0,
		paddingBottom:0,
		margin:0
	},
	text:{
		paddingLeft:8,
		color:theme.grey,
		fontSize:15
	},
	icon:{
		textAlign:'center',
		paddingTop:6
	},
	noPadding:{
		paddingBottom:0
	},
	image:{
		width:20,
		height:20
	}
})


export default PostCard
