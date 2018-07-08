import { FETCH_POSTS, NEW_POST,VOTE_POST,ADD_COMMENT,VOTE_COMMENT,GET_POST } from './types'
import { AsyncStorage } from "react-native"
import { NavigationActions } from 'react-navigation'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

_storePosts = async (posts) => {
  try {
    await AsyncStorage.setItem('POSTS',posts);
  } catch (error) {
    // Error saving data
  }
}

export const fetchPosts = () => dispatch => {
  AsyncStorage.getItem('POSTS', (err, result) => {
      if(result == null){
        fetch('https://faker-abdi42.c9users.io/api/posts')
          .then(res => res.json())
          .then((posts) => {
            _storePosts(JSON.stringify(posts))

            dispatch({
              type:FETCH_POSTS,
              payload:posts
            })
          })
      }else {
        dispatch({
          type:FETCH_POSTS,
          payload:JSON.parse(result)
        })
      }
  });
}

export const createPost = (postContent,geo = [],user) => dispatch => {
  const post = {
    id:uuidv4(),
    username:user.username,
    content:postContent,
    likes:0,
    distance:"Here",
    comments:[],
    votes:[],
    voteCount:0,
    geo:geo,
    time:"Now",
    image:user.image
  }

  AsyncStorage.getItem('POSTS',(err,result) => {
    if(result !== null) {
      var posts = JSON.parse(result);

      _storePosts(JSON.stringify([post,...posts]))

      dispatch({
        type:NEW_POST,
        payload:post
      })
    }
  })

}

export const postVote = (post,dir) => dispatch => {
  dispatch({
    type:VOTE_POST,
    payload:{
      post,
      dir
    }
  })
}

export const addComment = (username,comment,post) => dispatch => {
  dispatch({
    type:ADD_COMMENT,
    payload:{
      username,
      comment,
      post
    }
  })
}

export const commentVote = (post,dir,comment) => dispatch => {
  dispatch({
    type:VOTE_COMMENT,
    payload:{
      post,
      comment,
      dir,
    }
  })
}

export const getPost = (postId) => dispatch => {
  dispatch({
    type:GET_POST,
    payload:{
      postId
    }
  })
}
