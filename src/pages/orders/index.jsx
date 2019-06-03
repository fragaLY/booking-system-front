import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

import {
  OrdersContainer,
  DatePickerWrapper,
  OrdersTable,
  OrderItem,
  DatePickerContainer
} from './styles';

export class OrdersPage extends React.Component {
  state = {
    orders: [],
    startDate: new Date(),
    endDate: new Date()
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5cf3d141330000a5187585ba')
      .then(result => result.json())
      .then(json => this.setState({ orders: json.orders }))
  };

  handleStartDateChange = (date) => {
    this.setState({ startDate: date })
    console.log(date);
  }

  handleEndDateChange = (date) => {
    this.setState({ endDate: date })
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

        <OrdersTable>
          {
            this.state.orders.map(order =>
              <OrderItem key={order.id}>
                <span>
                  {order.owner.firstName}
                </span>
                &nbsp;
                <span>
                  {order.owner.lastName}
                </span>
              </OrderItem>
            )
          }
        </OrdersTable>
      </OrdersContainer>
    );
  }
}
