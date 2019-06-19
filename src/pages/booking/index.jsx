import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css';

import {
  BookContainer,
  BookingPage,
  FormWrapper,
  Label,
  SelectWrapper
} from './styles';
import {guestOptions, housesOptions} from './options';

const usersUrl = 'http://35.204.250.139:8080/api/users';
const costUrl = 'http://35.204.250.139:8080/api/orders/cost';
const defaultCostMessage = 'Please select house(s) and amount of guests';
const fromPathVariable = '?from=';
const toPathVariable = '&to=';
const guestsPathVariable = '&guests=';

function getCost(from, to, guests) {

  let _cost = "Please select house(s) and amount of guests";
  const fromValue = from ? new Date(from).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js
  const toValue = to ? new Date(to).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js

  fetch(costUrl.concat(fromPathVariable, fromValue)
      .concat(toPathVariable, toValue)
      .concat(guestsPathVariable, guests.value))

      .then(result => result.json())
      .then(json => _cost = json.value)
      .catch(error => console.error(error));

  return _cost;
}

const ordersURl = 'http://35.204.250.139:8080/api/orders';

export class Booking extends React.Component {

  state = {
    startDate: '',
    endDate: '',
    isClearable: true,
    homes: [],
    users: [],
    guests: '',
    excludeDates: [],
    cost: defaultCostMessage
  };

  componentDidMount() {
    let _bookedDates = [];

    fetch(ordersURl)
        .then(result => result.json())
        .then(json => {
          json.orders.forEach(order => {
            let from = new Date(order.from);
            let to = new Date(order.to);

            while (from <= to) {
              _bookedDates.push(new Date(from));
              from = new Date(from.getFullYear(), from.getMonth(),
                  from.getDate() + 1);
            }
          });
          this.setState({
            excludeDates: _bookedDates
          });
        })
        .catch(error => console.error(error));

    fetch(usersUrl)
        .then(result => result.json())
        .then(json => this.setState({users: json.users}))
        .catch(error => console.error(error));
  };

  abortController = new AbortController();

  handleStartDateChange = (from) => {

    let validForm = from && this.state.endDate && this.state.guests
        && this.state.homes && this.state.homes.length > 0;

    let _cost = validForm ? getCost(from, this.state.endDate, this.state.guests)
        : defaultCostMessage;

    this.setState({
      startDate: from,
      hasChanges: validForm,
      cost: _cost
    });
  };

  handleEndDateChange = (to) => {

    let validForm = this.state.startDate && to && this.state.guests
        && this.state.homes && this.state.homes.length > 0;

    let _cost = validForm ? getCost(this.state.startDate, to, this.state.guests)
        : defaultCostMessage;

    this.setState({
      endDate: to,
      hasChanges: validForm,
      cost: _cost
    });
  };

  handleGuestsChange = (_guests) => {

    let validForm = this.state.startDate && this.state.endDate && _guests
        && this.state.homes && this.state.homes.length > 0;

    let _cost = validForm ? getCost(this.state.startDate, this.state.endDate,
        _guests) : defaultCostMessage;

    this.setState({
      guests: _guests,
      hasChanges: validForm,
      cost: _cost
    });
  };

  handleHomesChange = (_homes) => {
    let validForm = this.state.startDate && this.state.endDate
        && this.state.guests && _homes && _homes.length > 0;

    let _cost = validForm ? getCost(this.state.startDate, this.state.endDate,
        this.state.guests) : defaultCostMessage;

    this.setState({
      homes: _homes,
      hasChanges: validForm,
      cost: _cost
    });
  };

  handleUsersChange = (user) => {

  };

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {

    let now = new Date();

    const buttonClassValue = this.state.hasChanges
        ? 'btn btn-success btn-lg'
        : 'btn btn-danger btn-lg';

    return (
        <BookingPage>
          <BookContainer>
            <Label>Booking</Label>
            <FormWrapper>
              <form onSubmit={this.handleSubmit}>
                {this.state.hasError &&
                <div className="form-group text-danger">
                  <label>{this.state.error}</label>
                </div>
                }

                {this.state.isSaved &&
                <div className="form-group text-success">
                  <label>Request created. Wait for a feedback.</label>
                </div>
                }

                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="">ORDER DATES
                  </span>
                    </div>
                    <DatePicker
                        todayButton={"Today"}
                        minDate={now}
                        dateFormat='yyyy-MM-dd'
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        excludeDates={this.state.excludeDates}
                        placeholderText='From'
                    />
                    <DatePicker
                        minDate={new Date(now.getFullYear(), now.getMonth(),
                            now.getDate() + 1)}
                        dateFormat='yyyy-MM-dd'
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        excludeDates={this.state.excludeDates}
                        placeholderText='To'
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">USER</span>
                    </div>
                    <SelectWrapper>
                      <Select
                          options={this.state.users}
                          onChange={this.handleUsersChange}
                      />
                    </SelectWrapper>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">GUESTS</span>
                    </div>
                    <SelectWrapper>
                      <Select
                          options={guestOptions}
                          isClearable={this.state.isClearable}
                          value={this.state.guests}
                          onChange={this.handleGuestsChange}
                      />
                    </SelectWrapper>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">HOUSES</span>
                    </div>
                    <SelectWrapper>
                      <Select
                          options={housesOptions}
                          isClearable={this.state.isClearable}
                          value={this.state.homes}
                          onChange={this.handleHomesChange}
                          isMulti
                      />
                    </SelectWrapper>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">Cost
                  </span>
                    </div>
                    <input type="text"
                           name="registered"
                           className="form-control col-lg-3"
                           placeholder="registered"
                           aria-label="registered"
                           value={this.state.cost}
                           disabled
                           aria-describedby="basic-addon1"/>
                  </div>
                </div>


                <button className={buttonClassValue}
                        disabled={!this.state.hasChanges}
                        type="submit">ORDER
                </button>
              </form>
            </FormWrapper>
          </BookContainer>
        </BookingPage>
    )
  }
}
