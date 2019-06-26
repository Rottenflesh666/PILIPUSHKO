import React from 'react';
import {Switch, Route} from 'react-router-dom'

/* views */
import Login from './components/login';
import TestsList from './components/tests-list';
import Tasks from './components/tasks';
import GroupsList from  './components/groups-list';
import Admin from './components/admin';
import Students from './components/students';
import Creator from './components/creator';
import AdminTestsList from './components/admin-tests-list';
import NewQuestion from './components/newQuestion';
import HeaderNavigator from './components/headerNavigator';
import BaseMap from './components/base-map';

//'/tests/tasks'
const Routes = () => (
  <div>
    <div className="indentTop">
      <HeaderNavigator/>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/tests/tasks' component={Tasks}/> {/*'/tests/tasks'*/}
        <Route path='/tests' component={TestsList}/>
        <Route path='/admin/groups/students' component={Students}/> {/*/admin/groups/students*/}
        <Route path='/admin/groups' component={GroupsList}/>
        <Route path='/admin/tests/:id/map' component={BaseMap}/> {/*'/admin/tests/:id/map'*/}
        <Route path='/admin/tests/:id' component={Creator}/> {/*'/admin/tests/:id'*/}
        <Route path='/admin/tests' component={AdminTestsList}/>
        <Route path='/newQuestion' component={NewQuestion}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    </div>
  </div>
);

export default Routes;
