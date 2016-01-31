import React from 'react';
import {Route} from 'react-router';

import BoardComponent from '../board/board.jsx';
import ThreadComponent from '../thread/thread.jsx';

export default class HomeComponent extends React.Component {
  static get route(){
    return <Route path='home' component={HomeComponent}/>;
  }

  render(){
    return <div className='home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-1'>
            this should be the navigation
          </div>

          <div className='col-md-8'>
            <BoardComponent></BoardComponent>
          </div>

          <div className='col-md-3'>
            <ThreadComponent></ThreadComponent>
          </div>
        </div>
      </div>
    </div>;
  }
}
