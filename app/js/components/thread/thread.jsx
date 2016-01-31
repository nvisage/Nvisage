import React from 'react';
import {connect} from 'react-redux';

import CommentComponent from '../comment/comment.jsx';
import ReplyboxComponent from '../replybox/replybox.jsx';

import './thread.css';


class ThreadComponent extends React.Component{
  render(){
    return <div className='thread'>
      <h2>{this.props.title}</h2>
      <h6>{this.props.date} | submitted by {this.props.author}</h6>
      <p>{this.props.description}</p>
      <ReplyboxComponent/>
      <CommentComponent text='Hello this is a comment'>
        <CommentComponent text='this is a reply to that comment' reply={true}></CommentComponent>
      </CommentComponent>
      <CommentComponent text='this is another comment'>
        <CommentComponent text='this is the reply to the second comment'>
          <CommentComponent text='tertiary reply'></CommentComponent>
        </CommentComponent>
      </CommentComponent>
    </div>
  }
}

const Actions = {
  cardView: (reference)=>{
    return {
      type: 'CARD_VIEW',
      cardReference: reference
    };
  }
}

const ThreadReducer = (state={currentCardReference: 'nothing'}, action)=>{
  switch(action.type){
    case 'CARD_VIEW':
      return Object.assign({}, state, {currentCardReference: action.cardReference});
    default:
      return state;
  }
}

export const ThreadRedux = {ThreadReducer};

const select = (state)=>{
  return state.ThreadReducer;
};

export default connect(select)(ThreadComponent)
