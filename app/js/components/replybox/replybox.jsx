import React from 'react';
import {connect} from 'react-redux';

import {BoardActions} from '../board/board.jsx';

import './replybox.css';

class ReplyboxComponent extends React.Component{
  dispatchCommentReply(){
    let comment = document.getElementById('commentReplyBox');
    console.log('comment3', this.props.parentId);
    this.props.dispatch(BoardActions.commentReply(this.props.parentId, comment.value));
    comment.value = '';
  }

  render(){
    return <div className='replybox'>
      <textarea id='commentReplyBox'></textarea>
      <div className='replybox-buttons'><a onClick={this.dispatchCommentReply.bind(this)}>Submit</a></div>
    </div>;
  }
}

const select = (state)=>{
  return state.BoardReducer;
};

export default connect(select)(ReplyboxComponent)
