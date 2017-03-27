import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindFetchFeedToDispatch} from '../actions/profileActions'
import {addCommentAction, editCommentAction, editArticleAction} from '../actions/articleActions'
var articlesRendered = 0;
exports.articlesRendered = articlesRendered


class Articles extends Component {

  componentWillMount() {
    this.props.fetchArticles()
    //articlesRendered = 1
  }

  render() {
    const articles = this.props.articles;
    this.editArticleValues = [];
    //article,comment
    this.editCommentValues = [];

    // let commentValue;
    // let editCommentValue
    // let editArticleValue

    return (
      <div>
        <h1>Articles</h1>
        {articles.map((article,index) => (
          <div key={article.id}>
            <p id={article.text}>By {article.author}</p>
            <p>Posted at {article.date}</p>
            <p>Article text: {article.text}</p>
            <p><input id="articleDisplayBox" name="articleDisplayBox"  ref={(a)=>this.editArticleValues[index]=a} defaultValue={article.text} required />
              <input type="button" defaultValue="Edit Article"
                onClick={() => this.props.editArticle(this.editArticleValues[index].value, article.id)} id="editArticleButton" /></p>
            <p>Comments:</p>
            {article.comments.map((comment,indexC) =>(
              <div key={indexC}>
                <p>{comment}</p>
                <input id="commentDisplayBox" name="commentDisplayBox"  ref={(a)=>this.editCommentValues[indexC]=a} defaultValue={comment} required />
                  <input type="button" defaultValue="Edit comment"
                    onClick={() => this.props.editComment(this.editCommentValues[indexC].value, article.id, indexC)} id="addCommentButton" />
              </div>
            ))}
              <input id="commentBox" name="commentBox" ref={(a)=>this.commentValue=a} required />
              <input type="button" defaultValue="Add comment"
                onClick={() => this.props.addComment(this.commentValue.value, article.id)} id="addCommentButton" />
          </div>

        ))}
      </div>
    )
  }
}

export default connect(
  state => ({
    articles: state.articles
  }),
  dispatch => ({
    fetchArticles: bindFetchFeedToDispatch(dispatch),
    addComment: (comment, id) => addCommentAction(comment, id)(dispatch),
    editComment: (comment, articleId, commentIndex) => editCommentAction(comment, articleId, commentIndex)(dispatch),
    editArticle: (newText, articleId) => editArticleAction(newText, articleId)(dispatch)
  })
)(Articles)
