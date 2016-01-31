import React from 'react';

import './card.css';

export default class CardComponent extends React.Component{
  render(){
    return <div className='card'>
      <div className='mdl-card mdl-shadow--6dp'>
        <div className='mdl-card__title mdl-card--expand'>
          <h2 className='mdl-card__title-text'>Lorem Ipsum</h2>
        </div>
        <div className='mdl-card__supporting-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenan convallis.
        </div>
        <div className='mdl-card__actions mdl-card--border'>
          <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>
            Lorem Ipsum
          </a>
        </div>
      </div>
    </div>
  }
}
