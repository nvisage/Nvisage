import React from 'react';
import {Route} from 'react-router';
import {connect} from 'react-redux';

import BoardComponent from '../board/board.jsx';
import ThreadComponent from '../thread/thread.jsx';
import NavComponent from '../nav/nav.jsx';

import './home.css';


class HomeComponent extends React.Component {
  static get route(){
    return <Route path='home' component={HomeComponent}/>;
  }

  render(){
    let card = this.props.cards[this.props.currentCardReference];
    console.log('card', card);
    return <div className='home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-1 col-no-padding'>
            <NavComponent/>
          </div>

          <div className='col-md-8 col-no-padding'>
            <BoardComponent/>
          </div>

          <div className='col-md-3 col-no-padding'>
            {card ? <ThreadComponent reference={card.reference} title={card.title} date={card.date} author={card.author} description={card.text} comments={card.comments}/> : <ThreadComponent title='Select a card' date='' author='author' description='' comments={new Object()}/>}
          </div>
        </div>
      </div>
    </div>;
  }
}

const select = (state)=>{
  console.log(state.BoardReducer);
  return state.BoardReducer;
};

export default connect(select)(HomeComponent)
