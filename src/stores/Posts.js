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

    fetch('https://2c7d2b37.ngrok.io/api/posts')
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
  }

  @action upVote(index){
    if(this.posts[index].userVoted == null || this.posts[index].userVoted != "up"){
      this.posts[index].votes.push({
        postId:this.posts[index],
        username:'johndoe',
        upVoted:true,
      })

      this.posts[index].userVoted = "up"

      this.posts[index].voteCount+=1;
    }
  }

  @action upVoteComment(index,commentIndex){
    if(this.posts[index].comments[commentIndex].userVoted == null || this.posts[index].comments[commentIndex].userVoted != "up"){
      this.posts[index].comments[commentIndex].userVoted = "up"
      this.posts[index].comments[commentIndex].votes+=1;
    }
  }

  @action downVoteComment(index,commentIndex){
    if(this.posts[index].comments[commentIndex].userVoted == null || this.posts[index].comments[commentIndex].userVoted != "down"){
      this.posts[index].comments[commentIndex].userVoted = "down"
      this.posts[index].comments[commentIndex].votes-=1;
    }
  }

  @action downVote(index){
    if(this.posts[index].userVoted == null || this.posts[index].userVoted != "down"){
      this.posts[index].votes.push({
        postId:this.posts[index],
        username:'johndoe',
        upVoted:true,
      })

      this.posts[index].userVoted = "down"

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
