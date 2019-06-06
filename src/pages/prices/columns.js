import React from 'react';

export const columns = [
  {
    Header: 'Guests',
    sortable: false,
    filterable: false,
    accessor: 'guests',
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  },
  {
    Header: 'Price',
    sortable: false,
    filterable: false,
    accessor: 'price',
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  }
];