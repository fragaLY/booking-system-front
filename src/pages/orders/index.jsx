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

export class OrdersPage extends React.Component {

  state = {
    orders: [],
    startDate: '',
    endDate: ''
  };

  componentDidMount() {
    fetch('http://192.168.0.108:8080/api/orders')
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders}))
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
                           url={'http://192.168.0.108:8080/api/reports/orders'}/>
          </DatePickerContainer>

          <ReactTable
              data={this.state.orders.sort((a,b) => {return a.from < b.from ? - 1: 0})}
              columns={columns}
              defaultPageSize={10}
              showPagination={true}
              className="-striped -highlight"
          />
        </ItemsContainer>
    );
  }
}
