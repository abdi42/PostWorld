import {observable,action} from "mobx"

class PostStore {
  @observable posts = []
  @observable geoPosts = [
    [-96.016434,41.248672],
    [-96.017905,41.249654],
    [-96.020230,41.248772]
  ];

  @observable state = 'pending';

  fetchPosts () {
    if(this.posts.length > 0){
      return
    }

    this.state = 'done';

    fetch('http://localhost:3000/api/posts')
    .then((response) => {
      response.json().then((json) => {
        this.posts = json;
        this.state = 'done';
      })
    })
  }

  @action addPost(post,geo = []) {
    this.posts.unshift({
      username:"johndoe",
      content:post,
      likes:0,
      distance:"Here",
      comments:[],
      votes:[],
      voteCount:0,
      geo:geo
    })

    console.log(geo);
  }

  @action upVote(index){

    if(this.upVoted('johndoe',this.posts[index]) == false){

        this.posts[index].votes.push({
          postId:this.posts[index],
          username:'johndoe',
          upVoted:true
        })

        this.posts[index].voteCount+=1;
    }
  }

  @action downVote(index){
    if(this.downVoted('johndoe',this.posts[index]) == false){

        this.posts[index].votes.push({
          postId:this.posts[index],
          username:'johndoe',
          upvoted:false
        })

        this.posts[index].voteCount-=1;
    }
  }

  @action addComment(index,username,comment){
    this.posts[index].comments.unshift({
      username:username,
      content:comment,
      votes:0
    })
  }

  getPost(index){
    return this.posts[index];
  }

  upVoted(username,post){
    var voted = false;

    post.votes.map(vote => {
      if(vote.username === username){
        voted = true;
      }
    })

    return voted;
  }

  downVoted(username,post){
    var voted = false;

    post.votes.map(vote => {
      if(vote.username === username && !vote.upVoted){
        voted = true;
      }
    })

    return voted;
  }

}

export default new PostStore()
