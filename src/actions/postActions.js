import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, SELECT_POST, ADD_POST,GET_USER,POST_VOTE,ADD_COMMENT,COMMENT_VOTE,GET_POST,ADD_REQUEST } from './types'
import { AsyncStorage } from 'react-native'
import { normalize, schema } from 'normalizr'

const postSchema = new schema.Entity('posts',{})
const commentSchema = new schema.Entity('comments',{})

const postListSchema = new schema.Array(postSchema)
const commentsListSchema = new schema.Array(commentSchema)



export const getUserState = () => dispatch => {
	AsyncStorage.getItem('userToken').then((result) => {
		dispatch({
			type:GET_USER,
			payload:JSON.parse(result)
		})
	})
}

export const fetchPosts = (orderBy,sortByDate) => (dispatch,getState) => {
	console.log(orderBy,sortByDate)
	dispatch({
		type:FETCH_POSTS
	})

	AsyncStorage.getItem('userToken').then((result) => {
		var user = JSON.parse(result)

		fetch('http://localhost:3000/posts/feed',{
			method:'POST',
			headers:{
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				latitude:41.255108,
				longitude:-96.020321,
				userId:user._id,
				orderBy:orderBy
			})
		})
			.then(res => res.json())
			.then((posts) => {
				dispatch({
					type:FETCH_POSTS_SUCCESS,
					payload:{
						posts:normalize(posts,postListSchema),
						user:user
					}
				})
			})
			.catch(() => {
				dispatch({
					type:FETCH_POSTS_FAILURE
				})
			})

	})

}

export const getPost = (post) => (dispatch,getState) => {
	var user = getState().posts.user
	dispatch({
		type:SELECT_POST,
		payload:{
			id:post.id,
		}
	})
	fetch('http://localhost:3000/posts/'+post.id+'/comments?userId=' + user._id)
		.then(res => res.json())
		.then((comments) => {
			dispatch({
				type:GET_POST,
				payload:{
					comments:normalize(comments,commentsListSchema),
					id:post._id
				}
			})
		})
}

export const createPost = (postContent,geo = [],map=false) => (dispatch,getState) => {
	var user = getState().posts.user

	dispatch({
		type:ADD_REQUEST
	})
	fetch('http://localhost:3000/posts',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			latitude:geo[1],
			longitude:geo[0],
			content:postContent,
			userId:user._id,
			map:map
		})
	})
		.then(res => res.json())
		.then((response) => {
			dispatch({
				type:ADD_POST,
				payload:normalize(response.savedPost,postSchema)
			})

		})


}

export const postVote = (id,dir) => (dispatch,getState) => {
	var user = getState().posts.user



	dispatch({
		type:POST_VOTE,
		payload:{
			id,
			dir,
			userId:user._id
		}
	})

	fetch('http://localhost:3000/posts/' + id +'/votes',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			userId:user._id,
			dir:dir,
		})
	})

}

export const commentVote = (id,commentId,dir) => (dispatch,getState) => {
	var user = getState().posts.user

	dispatch({
		type:COMMENT_VOTE,
		payload:{
			id,
			dir,
			commentId
		}
	})

	fetch('http://localhost:3000/posts/' + id +'/comments/' + commentId +'/votes',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			userId:user._id,
			dir:dir,
		})
	})

}

export const addComment = (username,comment,post,content,cb) => (dispatch,getState) => {
	var user = getState().posts.user

	fetch('http://localhost:3000/posts/' + post._id +'/comments',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			userId:user._id,
			content:content,
		})
	})
		.then(res => res.json())
		.then((comment) => {
			dispatch({
				type:ADD_COMMENT,
				payload:{
					comment:normalize(comment,commentSchema),
					id:post.id
				}
			})
			cb()
		})
}


// export const getPost = (postId) => dispatch => {
//   dispatch({
//     type:GET_POST,
//     payload:{
//       postId
//     }
//   })
// }
