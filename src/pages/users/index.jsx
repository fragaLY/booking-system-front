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

const usersUrl = 'http://192.168.0.108:8080/api/users';
const usersReportUrl = 'http://192.168.0.108:8080/api/reports/users';
const dateFormat = 'yyyy-MM-dd';
const fromPathVariable = '?from=';
const toPathVariable = '&to=';

export class UsersPage extends React.Component {

  state = {
    users: [],
    startDate: '',
    endDate: '',
    hasError: false,
    error: ''
  };

  componentDidMount() {
    fetch(usersUrl)
        .then(result => result.json())
        .then(json => this.setState({users: json.users}))
        .catch(error => console.error(error));
  };

  handleStartDateChange = (from) => {
      this.setState({startDate: from});

      const to = this.state.endDate;

      const fromValue = from ? new Date(from).toISOString().slice(0, 10) : '';
      const toValue = to ? new Date(to).toISOString().slice(0, 10) : '';

      fetch(usersUrl.concat(fromPathVariable, fromValue).concat(toPathVariable, toValue))
          .then(result => result.json())
          .then(json => this.setState({users: json.users}))
          .catch(error => console.error(error));
  };

  handleEndDateChange = (to) => {
      this.setState({endDate: to});

      const from = this.state.startDate;

      const fromValue = from ? new Date(from).toISOString().slice(0, 10) : '';
      const toValue = to ? new Date(to).toISOString().slice(0, 10) : '';

      fetch(usersUrl.concat(fromPathVariable, fromValue).concat(toPathVariable, toValue))
          .then(result => result.json())
          .then(json => this.setState({users: json.users}))
          .catch(error => console.error(error));
  };

  componentDidCatch(error, message) {
    this.setState({
      hasError: true,
      error: message
    });
    console.error(error, message);
  }

  render() {

      let users = this.state.users !== undefined ? this.state.users.sort((a, b) => {
          return a.registered > b.registered ? -1 : 0
      }) : [];

      const startDate = this.state.startDate;
      const endDate = this.state.endDate;

      return (
        <ItemsContainer>
          {this.state.hasError ? this.state.error : null}
          <DatePickerContainer>
            <DatePickerWrapper>
              From
              <DatePicker dateFormat={dateFormat} selected={startDate}
                  onChange={this.handleStartDateChange}
              />
            </DatePickerWrapper>
            <DatePickerWrapper>
              To
              <DatePicker dateFormat={dateFormat} selected={endDate}
                  onChange={this.handleEndDateChange}
              />
            </DatePickerWrapper>

            <LoadingButton from={startDate} to={endDate} url={usersReportUrl}/>

          </DatePickerContainer>

          <ReactTable
              data={users}
              columns={columns}
              defaultPageSize={10}
              showPagination={true}
          />

        </ItemsContainer>
    );
  }
}