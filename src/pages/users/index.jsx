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

export class UsersPage extends React.Component {

  state = {
    users: [],
    startDate: new Date(),
    endDate: new Date()
  };

  componentDidMount() {
    fetch('http://35.204.250.139:8080/api/users')
        .then(result => result.json())
        .then(json => this.setState({users: json.users}))
        .catch(error => console.error('Error:', error));
  };

  handleStartDateChange = (date) => {
    this.setState({startDate: date})
  };

  handleEndDateChange = (date) => {
    this.setState({endDate: date})
  };

  render() {
    return (
        <ItemsContainer>
          <DatePickerContainer>
            <DatePickerWrapper>
              From
              <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}
              />
            </DatePickerWrapper>
            <DatePickerWrapper>
              To
              <DatePicker
                  dateFormat='yyyy-MM-dd'
                  selected={this.state.endDate}
                  onChange={this.handleEndDateChange}
              />
            </DatePickerWrapper>
            <LoadingButton from={this.state.startDate} to={this.state.endDate}
                           url={'http://35.204.250.139:8080/api/reports/users'}/>
          </DatePickerContainer>

          <ReactTable
              data={this.state.users}
              columns={columns}
              defaultPageSize={10}
              showPagination={true}
              className="-striped -highlight"
          />

        </ItemsContainer>
    );
  }
}
