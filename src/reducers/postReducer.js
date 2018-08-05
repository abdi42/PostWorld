import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, ADD_POST,POST_VOTE,ADD_POSTS,ADD_COMMENT,COMMENT_VOTE,GET_POST,SELECT_POST,ADD_REQUEST } from '../actions/types'

function updateObject(oldObject, newValues) {
	return Object.assign({}, oldObject, newValues)
}


const initialState = {
	byId:{},
	allIds:[],
	item: {},
	loading:false,
	error:null
}


function commentVote(state,action){
	var dir = action.payload.dir

	var voteObj  = {
		userId:action.payload.userId,
		dir:action.payload.dir
	}

	return {
		...state,
		voteCount: state.voteCount + dir,
		votes: [voteObj]
	}
}

function comment (state =[],action){
	switch(action.type){
	case COMMENT_VOTE:
		return commentVote(state,action)
	default:
		return state
	}
}


function getPost(state,action){
	return updateObject(state,{
		comments:{
			byId:action.payload.comments.entities.comments,
			allIds:action.payload.comments.result
		},
		isFetching:false
	})
}

function postVote(state,action){

	var dir = action.payload.dir

	var voteObj  = {
		userId:action.payload.userId,
		dir:action.payload.dir
	}


	return updateObject(state,{
		voteCount: state.voteCount + dir,
		votes: [voteObj]
	})
}

function addComment(state,action){
	var id = action.payload.comment.result
	var comment = action.payload.comment.entities.comments

	return updateObject(state,{
		comments:{
			byId:{
				...state.comments.byId,
				[id]:comment[id],
			},
			allIds:[...state.comments.allIds,id]
		},
	})
}



function post (state =[],action){
	switch(action.type){
	case ADD_COMMENT:
		return addComment(state,action)
	case POST_VOTE:
		return postVote(state,action)
	case GET_POST:
		return getPost(state,action)
	case COMMENT_VOTE:
		return {
			...state,
			comments:{
				...state.comments,
				byId:{
					...state.comments.byId,
					[action.payload.commentId]: comment(state.comments.byId[action.payload.commentId],action)
				}
			}
		}

	default:
		return state
	}
}

function fetchPosts(state,action) {
	return {
		...state,
		byId:action.payload.posts.entities.posts,
		allIds:action.payload.posts.result,
		item:{},
		currentItem:null,
		isFetching:false,
		user:action.payload.user,
		loading:false
	}
}

function addPosts(state,action) {
	return {
		...state,
		byId:{
			...state.byId,
			...action.payload.entities.posts
		},
		allIds:[...state.allIds,...action.payload.result],
		item:{
			comments:[]
		},
		currentItem:null,
		isFetching:false
	}
}

function addPost(state,action) {
	return {
		...state,
		byId:{
			...state.byId,
			...action.payload.entities.posts
		},
		allIds:[action.payload.result,...state.allIds],
		postRequest:false,
		item:null
	}

}

export default function(state = initialState ,action) {
	switch(action.type) {
	case ADD_REQUEST:
		return {
			...state,
			postRequest:true
		}
	case FETCH_POSTS_SUCCESS: return fetchPosts(state,action)
	case FETCH_POSTS:
		return {
			...state,
			loading:true
		}
	case FETCH_POSTS_FAILURE:
		return {
			...state,
			error:{
				message:'Sorry about this! We could not load the data'
			}
		}
	case ADD_POSTS: return addPosts(state,action)
	case ADD_POST: return addPost(state,action)
	case SELECT_POST:
		return {
			...state,
			item:action.payload.id
		}
	case COMMENT_VOTE:
	case ADD_COMMENT:
	case POST_VOTE:
	case GET_POST:
		return {
			...state,
			byId:{
				...state.byId,
				[action.payload.id]: post(state.byId[action.payload.id],action)
			}
		}
	default:
		return state
	}
}
