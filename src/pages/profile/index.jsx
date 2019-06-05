import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';

export class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      currency: '',
      registered: '',
      hasError: false,
      error: ''
    };

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeFirstName.bind(this);
    this.handleChangeEmail = this.handleChangeFirstName.bind(this);
    this.handleChangePhone = this.handleChangeFirstName.bind(this);
    this.handleChangeCountry = this.handleChangeFirstName.bind(this);
    this.handleChangeCity = this.handleChangeFirstName.bind(this);
    this.handleChangeCurrency = this.handleChangeFirstName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    const {profileUrl} = this.props.location.state;

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
        .catch(error => console.error("Error:", error))
  }

  componentDidCatch(error, message) {
    this.setState({
      hasError: true,
      error: message
    });
    console.error(error, message);
  }

  handleChangeFirstName(event) {
    this.setState({firstName: event.target.firstName})
  }

  handleChangeLastName(event) {
    this.setState({lastName: event.target.lastName})
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.email})
  }

  handleChangePhone(event) {
    this.setState({phone: event.target.phone})
  }

  handleChangeCountry(event) {
    this.setState({country: event.target.country})
  }

  handleChangeCity(event) {
    this.setState({city: event.target.city})
  }

  handleChangeCurrency(event) {
    this.setState({currency: event.target.currency})
  }

  handleSubmit(event) {
    alert('State is: ' + this.state);
    event.preventDefault();
  }

  render() {

    return (
        <div className="user">
          <form onSubmit={this.handleSubmit}>
            {this.state.hasError ? this.state.error : null}
            <label>
              Lastname:
              <input
                  name="lastname"
                  type="text"
                  defaultValue={this.state.defaultValue}
                  value={this.state.lastName}
                  onChange={this.handleChangeLastName}/>
            </label>
            <br/>
            <label>
              Firstname:
              <input
                  name="firstname"
                  type="text"
                  defaultValue={this.state.defaultValue}
                  value={this.state.firstName}
                  onChange={this.handleChangeFirstName}/>
            </label>
            <br/>
            <label>
              Email:
              <input
                  name="email"
                  type="email"
                  defaultValue={this.state.defaultValue}
                  value={this.state.email}
                  onChange={this.handleChangeEmail}/>
            </label>
            <br/>
            <label>
              Phone:
              <input
                  name="phone"
                  type="tel"
                  defaultValue={this.state.defaultValue}
                  value={this.state.phone}
                  onChange={this.handleChangePhone}/>
            </label>
            <br/>
            <label>
              Country:
              <input
                  name="country"
                  type="text"
                  defaultValue={this.state.defaultValue}
                  value={this.state.country}
                  onChange={this.handleChangeCountry}/>
            </label>
            <br/>
            <label>
              City:
              <input
                  name="city"
                  type="text"
                  defaultValue={this.state.defaultValue}
                  value={this.state.city}
                  onChange={this.handleChangeCity}/>
            </label>
            <br/>
            <label>
              Currency:
              <select name="currency"
                      defaultValue={this.state.defaultValue}
                      value={this.state.currency}
                      onChange={this.handleChangeCurrency}>
                <option value="BYN">BYN</option>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
            <br/>
            <label>
              Registered:
              <input
                  name="registered"
                  type="text"
                  defaultValuedefaultValue={this.state.defaultValue}
                  value={this.state.registered.slice(0, 10)}
                  disabled/>
            </label>
            <br/>

            <input type="submit" value="Save"/>
          </form>
        </div>
    )
  }
}