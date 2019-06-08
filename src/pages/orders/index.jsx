import React from 'react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';
import {columns} from './columns';
import LoadingButton from '../../components/common/loading-button.jsx'

import {
  DatePickerContainer,
  DatePickerWrapper,
  ItemsContainer
} from '../common/styles';

const ordersURl = 'http://192.168.0.108:8080/api/orders';
const ordersReportUrl = 'http://192.168.0.108:8080/api/reports/orders';
const dateFormat = 'yyyy-MM-dd';
const fromPathVariable = '?from=';
const toPathVariable = '&to=';

export class OrdersPage extends React.Component {

  state = {
    orders: [],
    startDate: '',
    endDate: ''
  };

  componentDidMount() {
    fetch(ordersURl)
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders}))
        .catch(error => console.error(error));
  };

  handleStartDateChange = (from) => {
    this.setState({startDate: from});

    const to = this.state.endDate;
    const fromValue = from ? new Date(from).toISOString().slice(0, 10) : '';
    const toValue = to ? new Date(to).toISOString().slice(0, 10) : '';

    fetch(ordersURl.concat(fromPathVariable).concat(fromValue).concat(toPathVariable).concat(toValue))
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders}))
        .catch(error => console.error(error));
  };

  handleEndDateChange = (to) => {
    this.setState({endDate: to});

    const from = this.state.startDate;
    const fromValue = from ? new Date(from).toISOString().slice(0, 10) : '';
    const toValue = to ? new Date(to).toISOString().slice(0, 10) : '';

    fetch(ordersURl.concat(fromPathVariable).concat(fromValue).concat(toPathVariable).concat(toValue))
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders}))
        .catch(error => console.error(error));
  };

  render() {

    let orders = this.state.orders !== undefined ? this.state.orders.sort((a, b) => {
        return a.from < b.from ? -1 : 0
    }) : [];

    const startDate = this.state.startDate;
    const endDate = this.state.endDate;

    return (
        <ItemsContainer>
          <DatePickerContainer>
            <DatePickerWrapper>
              From
              <DatePicker
                  dateFormat={dateFormat}
                  selected={startDate}
                  onChange={this.handleStartDateChange}
              />
            </DatePickerWrapper>
            <DatePickerWrapper>
              To
              <DatePicker
                  dateFormat={dateFormat}
                  selected={endDate}
                  onChange={this.handleEndDateChange}
              />
            </DatePickerWrapper>
          </DatePickerContainer>

          <LoadingButton from={startDate} to={endDate} url={ordersReportUrl}/>

          <ReactTable
              data={orders}
              columns={columns}
              defaultPageSize={10}
              showPagination={true}
              className="-striped -highlight"
          />
        </ItemsContainer>
    );
  }
}
