import React from 'react';
import ReactTable from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';
import {columns} from './columns';

import {ItemsContainer} from '../common/styles';

export class PricesPage extends React.Component {

  state = {
    prices: [],
    hasError: false,
    error: ''
  };

  componentDidMount() {
    fetch('http://192.168.0.108:8080/api/prices')
        .then(result => result.json())
        .then(json => this.setState({prices: json.prices}))
        .catch(error => console.error('Error:', error));
  };

  componentDidCatch(error, message) {
    this.setState({
      hasError: true,
      error: message
    });
    console.error(error, message);
  }

  render() {
    return (
        <ItemsContainer>
          {this.state.hasError ? this.state.error : null}
          <ReactTable
              data={this.state.prices}
              columns={columns}
              defaultPageSize={10}
              showPagination={false}
              className="-striped -highlight"
          />
        </ItemsContainer>
    );
  }
}