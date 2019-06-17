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

const costUrl = 'http://35.204.250.139:8080/api/cost';
const defaultCostMessage = 'Please select house(s) and amount of guests';

function getCost(orderSettings) {

  let _cost = "Please select house(s) and amount of guests";

  fetch(costUrl, {
    method: 'GET',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(orderSettings)
  })
      .then(result => result.json())
      .then(json => _cost = json.cost)
      .catch(error => console.error(error));

  return _cost;
}

export class Booking extends React.Component {

  state = {
    startDate: '',
    endDate: '',
    isClearable: true,
    prices: [],
    homes: [],
    guests: '',
    excludeDates: '',
    cost: defaultCostMessage
  };

  abortController = new AbortController();

  handleStartDateChange = (from) => {

    let validForm = from && this.state.endDate && this.state.guests
        && this.state.homes && this.state.homes.length > 0;

    let orderSettings = {
      from: from,
      to: this.state.endDate,
      homes: this.state.homes,
      guests: this.state.guests
    };

    let _cost = validForm ? getCost(orderSettings) : defaultCostMessage;

    this.setState({
      startDate: from,
      hasChanges: validForm,
      cost: _cost
    });
  };

  handleEndDateChange = (to) => {

    let validForm = this.state.startDate && to && this.state.guests
        && this.state.homes && this.state.homes.length > 0;

    let orderSettings = {
      from: this.state.startDate,
      to: to,
      homes: this.state.homes,
      guests: this.state.guests
    };

    let _cost = validForm ? getCost(orderSettings) : defaultCostMessage;

    this.setState({
      endDate: to,
      hasChanges: validForm,
      cost: _cost
    });
  };

  handleGuestsChange = (_guests) => {

    let validForm = this.state.startDate && this.state.endDate && _guests
        && this.state.homes && this.state.homes.length > 0;

    let orderSettings = {
      from: this.state.startDate,
      to: this.state.endDate,
      homes: this.state.homes,
      guests: _guests
    };

    let _cost = validForm ? getCost(orderSettings) : defaultCostMessage;

    this.setState({
      guests: _guests,
      hasChanges: validForm,
      cost: _cost
    });
  };

  handleHomesChange = (_homes) => {
    let validForm = this.state.startDate && this.state.endDate
        && this.state.guests && _homes && _homes.length > 0;

    let orderSettings = {
      from: this.state.startDate,
      to: this.state.endDate,
      homes: _homes,
      guests: this.state.guests
    };

    let _cost = validForm ? getCost(orderSettings) : defaultCostMessage;

    this.setState({
      homes: _homes,
      hasChanges: validForm,
      cost: _cost
    });
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
