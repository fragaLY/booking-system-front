import React from 'react';
import {Link} from 'react-router-dom';
let key = 0;

export const columns = [
  {
    id: "Owner",
    Header: 'Owner',
    sortable: true,
    filterable: true,
    accessor: (order) => (
      <Link
        to={`/api/users/ ${order.owner.id}`}>
        {`${order.owner.lastName} ${order.owner.firstName}`}
      </Link>),
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  },
  {
    id: 'Homes',
    Header: 'Houses',
    accessor: (order) => (
      order.homes.filter((home, i, arr) => i = arr.indexOf(home))
        .map((home, i, arr) => <div key={key++}>{arr.length}</div>)
    ),
  },
  {
    Header: 'From',
    accessor: 'from',
    sortable: true,
    filterable: true,
    filterMethod: (filter, row) => {
      filter.value = filter.value.replace(new RegExp(/^(\d{4}-\d{2}-\d{3})$/), "");
      return row[filter.id].toString().startsWith(filter.value);
    }
  }, {
    Header: 'To',
    accessor: 'to',
    sortable: true,
    filterable: true,
    filterMethod: (filter, row) => {
      filter.value = filter.value.replace(new RegExp(/^(\d{4}-\d{2}-\d{3})$/), "");
      return row[filter.id].toString().startsWith(filter.value);
    }
  }, {
    Header: 'Cost',
    accessor: 'cost'
  }, {
    Header: 'Guests',
    accessor: 'guests'
  }];