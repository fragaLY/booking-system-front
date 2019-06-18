import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'normalize.css';
import './App.css';
import {Footer} from "./components/footer";
import {HousesPage} from "./pages/houses";
import {Header} from './components/header';
import {MainPage} from './pages/main';
import {OrdersPage} from './pages/orders';
import {UsersPage} from './pages/users';
import {UserPage} from './pages/profile';
import {Booking} from './pages/booking-page';

export class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/houses' component={HousesPage} />
            <Route exact path='/users' component={UsersPage} />
            <Route exact path='/orders' component={OrdersPage} />
            <Route exact path='/profile' component={UserPage} />
            <Route exact path='/book' component={Booking} />
          </Switch>
          <Footer>booking system</Footer>
        </BrowserRouter>
      </div>
    );
  }
}
