import React from 'react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import {saveAs} from 'file-saver';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import './index.css';

import {
  Button,
  DatePickerContainer,
  DatePickerWrapper,
  OrdersContainer
} from './styles';
import {columns} from './columns';

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}

export class OrdersPage extends React.Component {

  state = {
    orders: [],
    startDate: undefined,
    endDate: undefined
  }

  componentDidMount() {
    fetch('http://35.204.250.139:8080/api/orders')
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders})).catch(
        error => console.error('Error:', error));
  };

  handleStartDateChange = (date) => {
    this.setState({startDate: date})
    console.log(date);
  }

  handleEndDateChange = (date) => {
    this.setState({endDate: date})
    console.log(date);
  }

  downloadReport = () => {

    const headers = new Headers({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })

    let formattedStartDate = this.state.startDate.toISOString('en-US',
        dateOptions).slice(10, 18);
    let formattedEndDate = this.state.endDate.toISOString('en-US',
        dateOptions).slice(10, 18);

    fetch(
        `$http://35.204.250.139:8080/api/reports/orders?from=${formattedStartDate}&to=${formattedEndDate}`,
        {headers}
    ).then((response) => {
      const name = response.headers.get('Content-Disposition').replace(
          "attachment; filename=", "");
      response.blob().then((blob) => {
        saveAs(blob, name);
      })

    }).catch(error => console.error('Error:', error));
  }

  render() {

    return (
        <OrdersContainer>
          <DatePickerContainer>
            <DatePickerWrapper>From
              <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}
              />
            </DatePickerWrapper>
            <DatePickerWrapper>
              To
              <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={this.state.endDate}
                  onChange={this.handleEndDateChange}
              />
            </DatePickerWrapper>
          </DatePickerContainer>
          <Button onClick={this.downloadReport}>Download Report</Button>
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
