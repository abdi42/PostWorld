import {observable,action} from "mobx"

class PostStore {
  @observable posts = []
  @observable state = 'pending';

  fetchPosts () {
    this.posts = [];
    this.state = 'done';

    fetch('https://f339d321.ngrok.io/api/posts')
    .then((response) => {
      response.json().then((json) => {
        this.posts = json;
        this.state = 'done';
      })
    })
  }

  @action addPost(post) {
    this.posts.unshift({
      username:"johndoe",
      content:post,
      likes:0,
      distance:"Here",
      comments:[],
      votes:0
    })
  }

  @action upVote(index){
    this.posts[index].votes+=1;
  }

  @action downVote(index){
    this.posts[index].votes-=1;
  }

  @action addComment(index,username,comment){
    this.posts[index].comments.unshift({
      username:username,
      content:comment,
      votes:0
    })
  }

}

export default new PostStore()




// import { types, onSnapshot } from "mobx-state-tree"
//
// const Comment = types.model("Comment",{
//   username:types.string,
//   content:types.string,
//   votes:types.number
// })
//
// const Post = types.model("Post",{
//   username:types.string,
//   content:types.string,
//   likes:types.number,
//   distance:types.string,
//   comments:types.array(Comment),
//   votes:types.number
// })
//
// const PostStore = types.model("PostStore",{
//   posts:types.array(Post),
//   state:types.string
// })
// .actions(self => ({
//   fetchPosts () {
//     fetch('https://f339d321.ngrok.io/api/posts')
//     .then(self.fetchPostsSuccess)
//   },
//   fetchPostsSuccess(response){
//     response.json().then(self.parseJson)
//   },
//   parseJson(json){
//     self.posts = json;
//     self.state = 'done';
//   },
//   addPost(post) {
//     self.posts.unshift({
//       username:"johndoe",
//       content:post,
//       likes:0,
//       distance:"Here",
//       comments:[],
//       votes:0
//     })
//   },
//   upVote(index){
//     self.posts[index].votes+=1;
//   },
//   downVote(index){
//    self.posts[index].votes-=1;
//   },
//   addComment(index,username,comment){
//     self.posts[index].comments.unshift({
//       username:username,
//       content:comment,
//       votes:0
//     })
//   }
//
// }))
// .views(self => ({
//   get getPosts () {
//     return self.posts
//   },
// }))
// .create({
//   posts:[],
//   state:'pending'
// })
//
// export default PostStore
