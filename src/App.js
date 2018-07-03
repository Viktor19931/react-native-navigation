import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import reducers from './reducers';
import Router from "./Router";

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
               <Router />
            </Provider>
        );
    }
}
