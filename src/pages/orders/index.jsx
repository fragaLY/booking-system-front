import React from 'react';
import {Link} from 'react-router-dom';
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

    const columns = [
      {
        id: "Owner",
        Header: 'Owner',
        sortable: true,
        filterable: true,
        accessor: (order) => (<Link
            to={'/api/users/' + order.owner.id}>{order.owner.lastName + " "
        + order.owner.firstName}</Link>),
        filterMethod: (filter, row) => {
          return row[filter.id].props.children.startsWith(filter.value);
        }
      },
      {
        Header: 'Homes',
        accessor: 'homes',
        sortable: true,
        filterable: true,
        filterMethod: (filter, row) => {
          filter.value = filter.value.replace(new RegExp("[^a-zA-Z]"), "");
          return row[filter.id].toString().startsWith(filter.value);
        }
      },
      {
        Header: 'From',
        accessor: 'from',
        sortable: true,
        filterable: true,
        filterMethod: (filter, row) => {
          filter.value = filter.value.replace(new RegExp("[^\\/0-9]"), "");
          return row[filter.id].toString().startsWith(filter.value);
        }
      }, {
        Header: 'To',
        accessor: 'to',
        sortable: true,
        filterable: true,
        filterMethod: (filter, row) => {
          filter.value = filter.value.replace(new RegExp("[^\\/0-9]"), "");
          return row[filter.id].toString().startsWith(filter.value);
        }
      }, {
        Header: 'Cost',
        accessor: 'cost',
        sortable: true,
        filterable: true,
        filterMethod: (filter, row) => {
          filter.value = filter.value.replace(new RegExp("[^a-zA-Z]"), "");
          return row[filter.id].toString().startsWith(filter.value);
        }
      }, {
        Header: 'Guests',
        accessor: 'guests',
        sortable: true,
        filterable: true,
        filterMethod: (filter, row) => {
          filter.value = filter.value.replace(new RegExp("[^a-zA-Z]"), "");
          return row[filter.id].toString().startsWith(filter.value);
        }
      }];

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

          {
            columns.map(<ReactTable
                data={this.state.orders}
                filterable={true}
                columns={columns}
                sortable={true}
                defaultPageSize={10}
                showPagination={true}
                showPaginationBottom={true}
                showPageJump={true}
                className="-striped -highlight"
            />)
          }
        </OrdersContainer>
    );
  }
}
