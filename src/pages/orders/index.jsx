import React from 'react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import saveAs from 'file-saver';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import './index.css';
import {columns} from './columns';

import {
  Button,
  DatePickerContainer,
  DatePickerWrapper,
  OrdersContainer
} from './styles';

export class OrdersPage extends React.Component {

  state = {
    orders: [],
    startDate: new Date(),
    endDate: new Date()
  }

  componentDidMount() {
    fetch('http://35.204.250.139:8080/api/orders')
        .then(result => result.json())
        .then(json => this.setState({orders: json.orders}))
        .catch(error => console.error('Error:', error));
  };

  handleStartDateChange = (date) => {
    this.setState({startDate: date})
  }

  handleEndDateChange = (date) => {
    this.setState({endDate: date})
  }

  downloadReport = () => {
    const headers = new Headers({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })

    let from = this.state.startDate.toISOString().slice(0, 10);
    let to = this.state.endDate.toISOString().slice(0, 10);

    fetch(
        'http://35.204.250.139:8080/api/reports/orders'.concat('?from=', from, '&to=', to),
        {headers}
    ).then((response) => {

      switch (response.status) {
        case 200:
          response.blob().then((blob) => {
            saveAs(blob, 'file');
          });
          break;
        case 404:
          response.json().then((json) => {
            this.setState({
              hasError: true,
              error: "Can't get report. " + json.message
            });
          });
          break;
      }


    }).catch(error => console.error('Error:', error));
  }

  render() {
    return (
        <OrdersContainer>
          <DatePickerContainer>
            <DatePickerWrapper>From
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
