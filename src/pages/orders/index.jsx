import React from 'react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import './index.css';

import {
  DatePickerContainer,
  DatePickerWrapper,
  OrdersContainer
} from './styles';
import {columns} from './columns';

export class OrdersPage extends React.Component {
  state = {
    orders: [],
    startDate: Date.now(),
    endDate: Date.now()
  }

  componentDidMount() {
    fetch('http://35.204.250.139:8080/api/orders')
      .then(result => result.json())
      .then(json => this.setState({orders: json.orders}))
  };

  handleStartDateChange = (date) => {
    this.setState({startDate: date})
    console.log(date);
  }

  handleEndDateChange = (date) => {
    this.setState({endDate: date})
    console.log(date);
  }

  render() {

    return (
      <OrdersContainer>
        <DatePickerContainer>
          <DatePickerWrapper>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
          </DatePickerWrapper>
          <DatePickerWrapper>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
            />
          </DatePickerWrapper>
        </DatePickerContainer>
        <ReactTable
          data={this.state.orders}
          columns={columns}
          defaultPageSize={10}
          showPagination={true}
          showPaginationBottom={true}
          className="-striped -highlight"
        />
      </OrdersContainer>
    );
  }
}
