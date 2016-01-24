import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

// import '../../../styles/bootstrapMdlUtil.css';

// import NavComponent from '../nav/nav.jsx';
// import CreatorComponent from '../creator/creator.jsx';
// import FooterComponent from '../footer/footer.jsx';
// import DoesNotExistComponent from '../doesnotexist/doesnotexist.jsx';
import HomeComponent from '../home/home.jsx';

export default class AppComponent extends React.Component{
  static get route(){
    // return (
    //   <Route path='/' component={AppComponent}>
    //     <IndexRoute component={HomeComponent}/>
    //     {DoesNotExistComponent.route}
    //     <Redirect from="*" to="404"/>
    //   </Route>
    // );
    return (
      <Route path='/' component={AppComponent}>
        <IndexRoute component={HomeComponent}/>
      </Route>
    );
  }

  render() {
    // return <div>
    //   <NavComponent logo={config.logo} paths={config.paths} navHeight={config.navHeight}/>
    //   {this.props.children}
    //   <FooterComponent/>
    //   <CreatorComponent names={config.creators} startYear={config.startYear}/>
    // </div>;
    return <div>
      {this.props.children}
    </div>;
  }
}
