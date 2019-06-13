import React from 'react';
import ReactTable from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import {columns} from './columns';

import {ItemsContainer} from '../common/styles';
const pricesUrl = 'http://35.204.250.139:8080/api/prices';

export class PricesPage extends React.Component {

  state = {
    prices: [],
    hasError: false,
    error: ''
  };

  abortController = new AbortController();

  componentDidMount() {
    fetch(pricesUrl, {signal: this.abortController.signal})
        .then(result => result.json())
        .then(json => this.setState({prices: json.prices}))
        .catch(error => console.error(error));
  };

  componentDidCatch(error, message) {
    this.setState({
      hasError: true,
      error: message
    });
    console.error(error, message);
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {

    let prices = this.state.prices !== undefined ? this.state.prices.sort((a, b) => {
        return a.price < b.price ? -1 : 0
    }) : [];

    return (
        <ItemsContainer>
          {this.state.hasError ? this.state.error : null}
          <ReactTable
              data={prices}
              columns={columns}
              defaultPageSize={this.state.prices.size}
              showPagination={false}
              className="-striped -highlight"
          />
        </ItemsContainer>
    );
  }
}