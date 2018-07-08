import React from 'react'
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { postVote } from '../actions/postActions'
import { connect } from 'react-redux';

class Post extends React.Component {
  vote(dir){
    AsyncStorage.getItem('userToken',(err,result) => {
      if(result == null){
        this.props.navigation.navigate("Prompt")
      } else {
        this.props.postVote(this.props.post,dir)
      }
    })
  }

  render () {
    return (
      <PostCard
        style={{margin:0}}
        post={this.props.post}
        geoDisabled={this.props.geoDisabled || false}
        goToGeo={() => this.props.navigation.navigate("MapScreen",{geo:this.props.post.geo})}
        onUpVote={() => this.vote("up")}
        onDownVote={() => this.vote("down")}>
      </PostCard>
    )
  }
}

export default connect(null, { postVote })(Post);
