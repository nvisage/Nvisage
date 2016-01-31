import React from 'react';
import {Router} from 'react-router';

import CardComponent from '../card/card.jsx';

import './board.css';


export default class BoardComponent extends React.Component{
  render(){
    return <div className='board'>
      <div className='board-main'>
        <CardComponent></CardComponent>
      </div>
    </div>;
  }
}
