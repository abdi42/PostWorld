import React from 'react'
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { postVote } from '../actions/postActions'
import { connect } from 'react-redux'

class Post extends React.Component {
	vote(dir){
		this.props.postVote(this.props.post,dir,this.props.index)
	}

	render () {
		return (
			<PostCard
				style={{margin:0}}
				post={this.props.post}
				geoDisabled={this.props.geoDisabled || false}
				goToGeo={() =>	this.props.navigation.navigate({key:'MapScreen-1',routeName:'MapScreen',params:{geo:this.props.post.geo.coordinates,prevPost:this.props.post._id}})}
				onUpVote={() => this.vote(1)}
				onDownVote={() => this.vote(-1)}>
			</PostCard>
		)
	}
}

export default connect(null, { postVote })(Post)
