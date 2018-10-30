import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import Login from './components/login';
import Register from './components/register';
import ForgotPassword from './components/forgotPassword';
import CodePassword from './components/codePassword';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/forgot_password" component={ForgotPassword} />
          <Route path="/verifyCode" component={CodePassword}/>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
