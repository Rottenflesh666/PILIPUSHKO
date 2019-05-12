import React from 'react';
import {Switch, Route} from 'react-router-dom'

/* views */
import Login from './components/login';
import TestsList from './components/tests-list';
import Tasks from './components/tasks';

const Routes = () => (
  <div>
    <div className="indentTop">
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/tests/tasks' component={Tasks}/>
        <Route path='/tests' component={TestsList}/>
      </Switch>
    </div>
  </div>
);

export default Routes;
