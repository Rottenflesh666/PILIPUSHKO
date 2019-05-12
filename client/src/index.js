import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import loginStore from './stores/login-store';
import testsStore from './stores/tests-store';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import {AppContainer} from "react-hot-loader";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './routes';

const store = {
  loginStore: loginStore,
  testsStore: testsStore,
};

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

const renderApp = Component => {
  render(
    <AppContainer>
      <Router>
        <Provider {...store}>
          <Component/>
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(Routes);

if (module.hot) {
  module.hot.accept(() => renderApp(Routes));
}
