import React from 'react';

import CommentComponent from '../comment/comment.jsx';
import ReplyboxComponent from '../replybox/replybox.jsx';

import './thread.css';


export default class ThreadComponent extends React.Component{
  render(){
    return <div className='thread'>
      <ReplyboxComponent/>
      <br/>
      <CommentComponent text='Hello this is a comment'>
        <CommentComponent text='this is a reply to that comment'></CommentComponent>
      </CommentComponent>
      <CommentComponent text='this is another comment'>
        <CommentComponent text='this is the reply to the second comment'>
          <CommentComponent text='tertiary reply'></CommentComponent>
        </CommentComponent>
      </CommentComponent>
    </div>
  }
}
