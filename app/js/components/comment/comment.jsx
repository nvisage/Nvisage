import React from 'react';

import './comment.css';

export default class CommentComponent extends React.Component{
  render(){
    return <div className='comment'>
      <div className='comment-material'>
        <div className='comment-text'>{this.props.text}</div>
        <div className='comment-buttons'><a>Reply</a> <a>Edit</a></div>
      </div>
      {this.props.children}
    </div>;
  }
}
