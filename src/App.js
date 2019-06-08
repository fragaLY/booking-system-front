import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'normalize.css';
import './App.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { MainPage } from './pages/main';
import { OrdersPage } from './pages/orders';
import { UsersPage } from "./pages/users";
import { UserPage } from "./pages/profile";
import {PricesPage} from "./pages/prices";


export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/orders' component={OrdersPage} />
            <Route exact path='/users' component={UsersPage} />
            <Route exact path='/profile' component={UserPage} />
            <Route exact path='/prices' component={PricesPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
