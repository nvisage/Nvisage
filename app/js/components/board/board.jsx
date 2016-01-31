import React from 'react';
import {Router} from 'react-router';
import {connect} from 'react-redux';

import CardComponent from '../card/card.jsx';

import _ from 'lodash';

import './board.css';


class BoardComponent extends React.Component{
  dispatchNewCard(){
    let title = document.getElementById('input-title');
    let author = document.getElementById('input-author');
    let text = document.getElementById('input-text');
    this.props.dispatch(Actions.newCard(title.value, title.value, title.value));
    title.value = '';
    author.value = '';
    text.value = '';
  }

  render(){
    console.log(this.props);
    let k = '';
    for(let card in this.props.cards){
      k += <CardComponent id={card.id} title={card.title} date={card.date} author={card.author} text={card.text}/>
    }
    return <div className='board'>
      <div className='board-main'>
        {k}
      </div>
      <div className='newboard'>
        <input id='input-title' placeholder='title'/>
        <input id='input-author'placeholder='author'/><br/>
        <textarea id='input-text' placeholder='description'></textarea><br/>
        <button type="button" className="btn btn-primary" onClick={this.dispatchNewCard.bind(this)}>Submit</button>
      </div>
    </div>;
  }
}

const CardModel = (id, title, date, author, text)=>{
  return {
    id, title, date, author, text
  };
}

const Actions = {
  newCard: (title, author, text)=>{
    return {
      type: 'NEW_CARD',
      cardData: {id: Math.floor(Math.random()*65536), title, date: new Date().toISOString(), author, text}
    };
  }
};

const BoardReducer = (state={cards: []}, action)=>{
  switch(action.type){
    case 'NEW_CARD':
      let newCards = [...state.cards, CardModel(action.cardData.id, action.cardData.title, action.cardData.date, action.cardData.author, action.cardData.text)];
      return Object.assign({}, state, {
        cards: newCards
      });
    default:
      return state;
  }
}

export const BoardRedux = {Actions, BoardReducer};

const select = (state)=>{
  return state.BoardReducer;
};

export default connect(select)(BoardComponent)
