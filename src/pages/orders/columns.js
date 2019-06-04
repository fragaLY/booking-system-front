import React from 'react';
import {Link} from 'react-router-dom';

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
    Header: 'Homes',
    accessor: 'homes.map(home => <div>{home}</div>)',
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