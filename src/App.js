import React from 'react';
import 'normalize.css';
import './App.css';
import { MainPage } from './pages/Main'


export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <MainPage />
      </div>
    );
  }
}
