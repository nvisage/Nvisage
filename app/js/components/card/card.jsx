import React from 'react';
import {connect} from 'react-redux';

import './card.css';

class CardComponent extends React.Component{
  render(){
    return <div className='card'>
      <div className='mdl-card mdl-shadow--6dp'>
        <div className='mdl-card__title mdl-card--expand'>
          <h2 className='mdl-card__title-text'>{this.props.title}</h2>
        </div>
        <div className='mdl-card__supporting-text'>
          {this.props.text}

          <img src={this.props.image}/>
        </div>
        <div className='mdl-card__actions mdl-card--border'>
          <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>
            View
          </a>
        </div>
      </div>
    </div>
  }
}


const select = (state)=>{
  return state;
};

export default connect(select)(CardComponent)
