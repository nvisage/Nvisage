import React from 'react';
import {Route} from 'react-router';

import BoardComponent from '../board/board.jsx';
import ThreadComponent from '../thread/thread.jsx';
import NavComponent from '../nav/nav.jsx';

import './home.css';


export default class HomeComponent extends React.Component {
  static get route(){
    return <Route path='home' component={HomeComponent}/>;
  }

  render(){
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
            <ThreadComponent title='this is a title' date='1/30/2016' author='Aku' description='this is a description'></ThreadComponent>
          </div>
        </div>
      </div>
    </div>;
  }
}
