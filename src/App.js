import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'normalize.css';
import './App.css';
import { MainPage } from './pages/Main';
import { Header } from './components/header';


export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route to='/' component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
