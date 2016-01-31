import React from 'react';

import './replybox.css';

export default class ReplyboxComponent extends React.Component{
  render(){
    return <div className='replybox'>
      <textarea></textarea>
      <div className='replybox-buttons'><a>Submit</a></div>
    </div>;
  }
}
