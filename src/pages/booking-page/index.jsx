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
import {guestOptions} from './options';

const housesUrl = 'http://35.204.250.139:8080/api/homes';

export class Booking extends React.Component {

  state = {
    startDate: new Date(),
    endDate: new Date(),
    isClearable: true,
    prices: [],
    homes: {},
    guests: 4,
    cost: 'Please select house(s) and amount of guests...'
  };

  componentDidMount() {
    fetch(housesUrl)
        .then((response) => {
          if (response.status === 200) {
            return response.json().then(result => result.json()).then(
                (json) => {
                  this.setState({
                    houses: json.homes,
                    hasError: false,
                    hasChanges: false,
                    isSaved: false,
                    error: ''
                  });
                });
          } else {
            this.setState({
              hasError: true,
              isSaved: false,
              error: response.json.message
            })
          }
        })
        .catch(error => console.error(error))
  }

  handleStartDateChange = (from) => {
    this.setState({
      startDate: from,
      hasChanges: true
    });
  };

  handleEndDateChange = (to) => {
    this.setState({
      endDate: to,
      hasChanges: true
    });

  };

  handleGuestsChange = (_guests) => {
    this.setState({
      guests: _guests,
      hasChanges: true
    });
  };

  toggleClearable = () => {
    this.setState(state => ({isClearable: !state.isClearable}));
  };

  render() {

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
                        dateFormat='yyyy-MM-dd'
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                    />
                    <DatePicker
                        dateFormat='yyyy-MM-dd'
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
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
                          options={this.state.homes}
                          isClearable={this.state.isClearable}
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
