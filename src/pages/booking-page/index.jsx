import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css';

import {
  BookingPage,
  BookContainer,
  DatePickerContainer,
  Label,
  SelectWrapper,
  SelectContainer,
  Button
} from './styles';
import {DatePickerWrapper} from '../common/styles';
import {guestOptions, housesOptions} from './options';

export class Booking extends React.Component {

  state = {
    startDate: new Date(),
    endDate: new Date(),
    isClearable: true,
    prices: [],

  }

  handleStartDateChange(date) {
    this.setState({startDate: date})
  }

  handleEndDateChange(date) {
    this.setState({endDate: date})
  }

  toggleClearable = () => {
    this.setState(state => ({isClearable: !state.isClearable}));
  }

  render() {
    return (
      <BookingPage>
        <BookContainer>
          <Label>Booking</Label>
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
          </DatePickerContainer>

          <SelectContainer>
            <div>Guest(s)</div>
            <SelectWrapper>
              <Select
                options={guestOptions}
                isClearable={this.state.isClearable}
              />
            </SelectWrapper>
          </SelectContainer>
          <SelectContainer>
            <div>House(s)</div>
            <SelectWrapper>
              <Select
              options={housesOptions}
              isClearable={this.state.isClearable}
              />
            </SelectWrapper>
          </SelectContainer>
          <Button children={'Book'}/>

        </BookContainer>
      </BookingPage>
    )
  }
}
