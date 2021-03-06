import React from 'react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';
import {columns} from './columns';
import LoadingButton from '../../components/common/loading-button.jsx'
import 'bootstrap/dist/css/bootstrap.css';

import {
  DatePickerContainer,
  DatePickerWrapper,
  ItemsContainer
} from '../common/styles';

const ordersURl = 'http://35.204.250.139:8080/api/orders';
const ordersReportUrl = 'http://35.204.250.139:8080/api/reports/orders';
const dateFormat = 'yyyy-MM-dd';
const fromPathVariable = '?from=';
const toPathVariable = '&to=';

export class OrdersPage extends React.Component {

  state = {
    orders: [],
    bookedDates: [],
    startDate: '',
    endDate: ''
  };

  abortController = new AbortController();

  componentWillUnmount() {
    this.abortController.abort();
  }

  componentDidMount() {
    let _bookedDates = [];

    fetch(ordersURl)
        .then(result => result.json())
        .then(json => {
          json.orders.forEach(order => {
            let from = new Date(order.from);
            let to = new Date(order.to);

            while (from < to) {
              _bookedDates.push(new Date(from));
              from = new Date(from.getFullYear(), from.getMonth(),
                  from.getDate() + 1);
            }
          });
          this.setState({
            orders: json.orders,
            bookedDates: _bookedDates
          });
        })
        .catch(error => console.error(error));
  };

  handleStartDateChange = (from) => {
    this.setState({startDate: from});

    const to = this.state.endDate;
    const fromValue = from ? new Date(from).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js
    const toValue = to ? new Date(to).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js

    fetch(ordersURl.concat(fromPathVariable, fromValue).concat(toPathVariable,
        toValue))
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders}))
        .catch(error => console.error(error));
  };

  handleEndDateChange = (to) => {
    this.setState({endDate: to});

    const from = this.state.startDate;
    const fromValue = from ? new Date(from).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js
    const toValue = to ? new Date(to).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js

    fetch(ordersURl.concat(fromPathVariable, fromValue).concat(toPathVariable,
        toValue))
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders}))
        .catch(error => console.error(error));
  };

  render() {

    let orders = this.state.orders !== undefined ? this.state.orders.sort(
        (a, b) => {
          return a.from < b.from ? -1 : 0
        }) : [];

    const startDate = this.state.startDate;
    const endDate = this.state.endDate;

    return (
        <ItemsContainer>
          <DatePickerContainer>

            <DatePickerWrapper>
              <div className="form-group">
                <div className="input-group input-group-default">
                  <div className="input-group-prepend">
                  <span
                      className="input-group-text"
                      id="basic-addon1"
                  >
                    FROM
                  </span>
                  </div>
                  <DatePicker
                      todayButton={"Today"}
                      highlightDates={this.state.bookedDates}
                      dateFormat={dateFormat}
                      selected={startDate}
                      onChange={this.handleStartDateChange}
                  />
                </div>
              </div>
            </DatePickerWrapper>

            <DatePickerWrapper>
              <div className="form-group">
                <div className="input-group input-group-default">
                  <div className="input-group-prepend">
                  <span
                      className="input-group-text"
                      id="basic-addon1"
                  >
                    TO
                  </span>
                  </div>
                  <DatePicker
                      highlightDates={this.state.bookedDates}
                      todayButton={"Today"}
                      dateFormat={dateFormat}
                      selected={endDate}
                      onChange={this.handleEndDateChange}
                  />
                </div>
              </div>
            </DatePickerWrapper>

            <DatePickerWrapper>
              <LoadingButton
                  from={startDate}
                  to={endDate}
                  url={ordersReportUrl}
              />
            </DatePickerWrapper>

          </DatePickerContainer>

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
