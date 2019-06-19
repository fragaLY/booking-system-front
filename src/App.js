import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'normalize.css';
import './App.css';
import {HousesPage} from "./pages/houses";
import {Header} from './components/header';
import {MainPage} from './pages/main';
import {OrdersPage} from './pages/orders';
import {UsersPage} from './pages/users';
import {UserPage} from './pages/profile';
import {Booking} from './pages/booking';
import {LoginPage} from "./pages/login";
import {AccountsPage} from "./pages/accounts";

export class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/houses' component={HousesPage} />
            <Route exact path='/users' component={UsersPage} />
            <Route exact path='/orders' component={OrdersPage} />
            <Route exact path='/profile' component={UserPage} />
            <Route exact path='/book' component={Booking} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/accounts' component={AccountsPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
