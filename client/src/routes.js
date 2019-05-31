import React from 'react';
import {Switch, Route} from 'react-router-dom'

/* views */
import Login from './components/login';
import TestsList from './components/tests-list';
import Tasks from './components/tasks';
import GroupsList from  './components/groups-list';
import Admin from './components/admin';
import Creator from './components/creator'
import NewQuestion from './components/newQuestion';

//'/tests/tasks'
const Routes = () => (
  <div>
    <div className="indentTop">
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/tests/tasks' component={Tasks}/>
        <Route path='/tests' component={TestsList}/>
        <Route path='/admin/groups' component={GroupsList}/>
        <Route path='/admin/creation' component={Creator}/> {/*admin/creation*/}
        <Route path='/newQuestion' component={NewQuestion}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    </div>
  </div>
);

export default Routes;
