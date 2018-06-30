import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
const firebase = require('firebase');
import ReduxThunk from 'redux-thunk'

import reducers from './reducers'
import LoginForm from "./components/LoginForm";

export default class App extends Component{
  componentWillMount() {
    this.initFirebase();
  }

  initFirebase() {
      const config = {
          apiKey: "AIzaSyBji7T71j-E3grXhFRQlGQnz2eSU6EF3aE",
          authDomain: "auth-react-cbf3e.firebaseapp.com",
          databaseURL: "https://auth-react-cbf3e.firebaseio.com",
          projectId: "auth-react-cbf3e",
          storageBucket: "auth-react-cbf3e.appspot.com",
          messagingSenderId: "449649701681"
      };
      firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
          <LoginForm />
      </Provider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};
