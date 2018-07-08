import { FETCH_POSTS, NEW_POST,VOTE_POST,ADD_COMMENT,VOTE_COMMENT,GET_POST } from '../actions/types'

function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues);
}
function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        if(item.id !== itemId) {
            return item;
        }
        const updatedItem = updateItemCallback(item);
        return updatedItem;
    });
    return updatedItems;
}


const initialState = {
  items: [],
  item: {}
}


function singlePost(state =[],action){
  switch(action.type){
    case VOTE_COMMENT:
      return state.comments.map((comment) => {
        if(comment.id === action.payload.comment.id && comment.userVoted == null){
          if(action.payload.dir === "down"){
            return Object.assign({},comment,{
              userVoted:"down",
              votes:comment.votes +1
            })
          }
          else {
            return Object.assign({},comment,{
              userVoted:"up",
              votes:comment.votes -1
            })
          }
        }

        return comment
      })
    default:
      return state
  }
}

export default function(state = initialState,action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items:action.payload,
        item:{
          comments:[]
        }
      }
    case NEW_POST:
      return {
        ...state,
        items: [action.payload,...state.items],
        item:{}
      }
    case VOTE_POST:
      let updatePost = action.payload.post;
      const dir = action.payload.dir
      return {
        ...state,
        items:state.items.map((post) => {

          if(post.id === updatePost.id){
            var didVote = dir === "up" ? downVoted : upVoted
            if(didVote('johndoe',updatePost) === false){
              post.votes.push({
                postId:updatePost.id,
                username:'johndoe',
                upVoted:(dir === "up" ? true : false),
              })

              post.userVoted = dir

              if(dir === "up")
                post.voteCount+=1;
              else
                post.voteCount-=1;
            }
          }

          return post
        }),
        item:{
          ...state.item,
          comments:[...state.item.comments]
        },
      }
    case ADD_COMMENT:
      const comment = action.payload.comment
      const username = action.payload.username
      var data = {
        username,
        content:comment,
        votes:0
      }
      return {
        ...state,
        items:state.items.map((post) => {
          if(post.id == action.payload.post.id){
            post.comments.unshift(data)
          }

          return post
        }),
        item:{
          ...state.item,
          comments:[...state.item.comments]
        },
      }
    case VOTE_COMMENT:
      return {
        ...state,
        items:state.items.map((post) => {
          if(post.id !== action.payload.post.id) {
            return post
          }

          return Object.assign({},post,{
            comments: singlePost(post,action)
          })
        }),
        item:{
          ...state.item,
          comments:state.item.comments.map((comment) => {
            if(comment.id === action.payload.comment.id && comment.userVoted == null){
              if(action.payload.dir === "down"){
                return Object.assign({},comment,{
                  userVoted:"down",
                  votes:comment.votes -1
                })
              }
              else {
                return Object.assign({},comment,{
                  userVoted:"up",
                  votes:comment.votes +1
                })
              }
            }

            return comment
          })
        }
      }
    case GET_POST:
      return {
        ...state,
        item: state.items.find((post) => {
          if(post.id === action.payload.postId){
            return post
          }
        })
      }
    default:
      return state;
  }
}


function upVoted(username,post){
  var voted = false;

  post.votes.map(vote => {
    if(vote.username === username){
      voted = true;
    }
  })

  return voted;
}

function downVoted(username,post){
  var voted = false;

  post.votes.map(vote => {
    if(vote.username === username && !vote.upVoted){
      voted = true;
    }
  })

  return voted;
}
