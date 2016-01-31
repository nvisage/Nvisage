import React from 'react';

import CommentComponent from '../comment/comment.jsx';
import ReplyboxComponent from '../replybox/replybox.jsx';

import $ from 'jquery';

import './thread.css';


export default class ThreadComponent extends React.Component{
  parseComments(children){
    console.log('children', children);
    if(!children){
      return '';
    }
    if(children.length < 1){
      return '';
    }
    let k = [];
    for(let comment of ($.map(children, (value, index)=>{
      console.log('aku');
      return [value];
    }))){
      k.push(<CommentComponent text={comment.text} reply={false}>
        {this.parseComments(comment.comments)}
      </CommentComponent>)
    }
    return k;
  }

  render(){
    console.log('reference', this.props.reference);
    return <div className='thread'>
      <h2>{this.props.title}</h2>
      <h6>{this.props.date} | submitted by {this.props.author}</h6>
      <p>{this.props.description}</p>
      <ReplyboxComponent parentId={this.props.reference}/>
      {this.parseComments(this.props.comments)}
    </div>;
  }
}
