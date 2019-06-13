import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Button,
  DatePickerContainer,
  Label,
  ProfileContainer,
  ProfilePage
} from "./styles";
import DatePicker from "react-datepicker";
import {SelectContainer, SelectWrapper} from "../booking-page/styles";

export class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
      phone: '+375111111111',
      country: 'BY',
      city: 'Mogilev',
      currency: 'BYN',
      registered: new Date(),
      role: 'surfer',
      hasError: false,
      error: ''
    };
  }

  componentDidMount() {
    const { profileUrl } = this.props.location.state;

    fetch(profileUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((json) => {
            this.setState({
              firstName: json.firstName,
              lastName: json.lastName,
              email: json.email,
              phone: json.phone,
              country: json.country,
              city: json.city,
              currency: json.currency,
              registered: json.registered,
              hasError: false,
              error: ''
            });
          });
        } else {
          this.setState({
            hasError: true,
            error: response.json.message
          })
        }
      })
      .catch(error => console.error(error))
  }

  componentDidCatch(error, message) {
    this.setState({
      hasError: true,
      error: message
    });
    console.error(error, message);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      country: this.state.country,
      city: this.state.city,
      currency: this.state.currency,
      registered: this.state.registered,
      role: this.state.role
    };

    this.loadUserOnServer(JSON.stringify(user), 'PUT');
  };

  loadUserOnServer = (user, method) => {
    const { profileUrl } = this.props.location.state;
    fetch(profileUrl, {
      method: method,
      headers: {
        "Content-type": "application/json"
      },
      body: user
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then((json) => {
            this.setState({
              hasError: true,
              error: json.message
            });
          });
        } else {
          this.setState({
            hasError: false,
            error: ''
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
        <ProfilePage>
          <ProfileContainer>
            <Label>Profile</Label>
            <form onSubmit={this.handleSubmit}>
              {this.state.hasError ? this.state.error : null}
              <label>
                Lastname:
                <input
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}/>
              </label>
              <br/>
              <label>
                Firstname:
                <input
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}/>
              </label>
              <br/>
              <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}/>
              </label>
              <br/>
              <label>
                Phone:
                <input
                    type="tel"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}/>
              </label>
              <br/>
              <label>
                Country:
                <input
                    type="text"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}/>
              </label>
              <br/>
              <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}/>
              </label>
              <SelectContainer>
                <div>Currency</div>
                <SelectWrapper>
                  <select name="currency"
                          value={this.state.currency}
                          onChange={this.handleChange}>
                    <option value="BYN">BYN</option>
                    <option value="RUB">RUB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </SelectWrapper>
              </SelectContainer>
              <DatePickerContainer>
                Registered
                <DatePicker
                    type="text"
                    name="registered"
                    value={this.state.registered}
                    disabled
                />
              </DatePickerContainer>
              <Button children={"SAVE"}/>
            </form>
          </ProfileContainer>
        </ProfilePage>
    )
  }
}
