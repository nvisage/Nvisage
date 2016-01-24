import React from 'react';
import {Route} from 'react-router';

export default class HomeComponent extends React.Component {
  static get route(){
    return (
      <Route path='home' component={HomeComponent}/>
    );
  }

  render(){
    return <div>
      hello world!
    </div>;
  }
}
