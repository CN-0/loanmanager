import React, {useContext, useEffect} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as classes from './App.css';
import {Context as DataContext} from './context/dataContext'
import LandingPage from './views/LandingPage'
import Paperbase from './views/Paperbase'

const App =()=> {
  const {
    state: {token, user_type},
    authCheckState
  } = useContext(DataContext);

  useEffect(()=>{
    authCheckState()
  },[])

  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  );

  if(token!==null){
    routes = (
      <Switch>
        <Route path="/" exact component={Paperbase} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className={classes.App}>
      {routes}
    </div>
  );
}

export default withRouter(App);
