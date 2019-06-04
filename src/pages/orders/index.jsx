import React from 'react';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import saveAs from 'file-saver';
import {format, parseISO} from 'date-fns';

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
    const parsedStartDate = parseISO(date);
    const startDate = format(parsedStartDate, 'yyyy-MM-dd');
    this.setState({startDate: startDate})
    console.log(startDate);
  }

  handleEndDateChange = (date) => {
    const parsedEndDate = parseISO(date);
    const endDate = format(parsedEndDate, 'yyyy-MM-dd', { useAdditionalDayOfYearTokens: true });
    this.setState({endDate: endDate})
    console.log(date);
  }

  downloadReport = () => {
    const headers = new Headers({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })

    fetch(
        `$http://35.204.250.139:8080/api/reports/orders?from=${this.state.startDate}&to=${this.state.endDate}`,
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
