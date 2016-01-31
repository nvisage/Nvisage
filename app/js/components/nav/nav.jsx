import React from 'react';

import './nav.css';

export default class NavComponent extends React.Component{
  render(){
    return <div className='nav'>
      <div className='header'>
        <h1 className='mdl-card__title-text'>EVHS Robotics</h1>
      </div>
      <div className='list'>
        <div className='list-item active'>
          <h4>hello</h4>
        </div>
        <div className='list-item'>
          <h4>hello</h4>
        </div>
        <div className='list-item'>
          <h4>hello</h4>
        </div>
      </div>
    </div>;
  }
}
