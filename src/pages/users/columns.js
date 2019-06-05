import React from 'react';
import {Link} from 'react-router-dom';

export const columns = [
  {
    id: "Name",
    Header: 'Name',
    sortable: true,
    filterable: true,
    accessor: (user) => (
        <Link
            to={`/api/users/${user.id}`}>
          {`${user.lastName} ${user.firstName}`}
        </Link>),
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  },
  {
    id: "Email",
    Header: 'Email',
    accessor: (user) => (
        <a href="mailto:mail@mail.com">{user.email}</a>
    ),
    sortable: false,
    filterable: false,
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  },
  {
    id: "Phone",
    Header: 'Phone',
    accessor: (user) => (
        <a href="callto:01234567890">{user.phone}</a>
    ),
    sortable: false,
    filterable: false,
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  }, {
    Header: 'Country',
    accessor: 'country',
    sortable: true,
    filterable: true,
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  }, {
    Header: 'City',
    accessor: 'city',
    sortable: true,
    filterable: true,
    filterMethod: (filter, row) => {
      return row[filter.id].props.children.startsWith(filter.value);
    }
  }, {
    Header: 'Registered',
    accessor: 'registered',
    sortable: true,
    filterable: true,
    filterMethod: (filter, row) => {
      filter.value = filter.value.replace(new RegExp(/^(\d{4}-\d{2}-\d{3})$/),
          "");
      return row[filter.id].toString().startsWith(filter.value);
    }
  }];