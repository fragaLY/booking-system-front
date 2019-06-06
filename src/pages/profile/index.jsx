import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';

export class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      hasError: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    const {profileUrl} = this.props.location.state;

    fetch(profileUrl)
        .then((response) => {
          if (response.status === 200) {
            return response.json().then((json) => {
              this.setState({
                user: json.user,
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

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit() {

    const {profileUrl} = this.props.location.state;

    fetch(profileUrl, {
      method: 'put',
      headers: {
        "Content-type": "application/json"
      },
      body: `{"firstName":${this.state.user.firstName},
              "lastName":${this.state.user.lastName},
              "email":${this.state.user.email},
              "phone":${this.state.user.phone},
              "country":${this.state.user.country},
              "city":${this.state.user.city},
              "currency":${this.state.user.currency}`
    }).then((response) => {

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

    }).catch(error => {
      console.error('Error:', error);
    });
  }

  render() {

    return (
        <div className="user">
          <form onSubmit={this.handleSubmit}>
            {this.state.hasError ? this.state.error : null}
            <label>
              Lastname:
              <input
                  type="text"
                  name="lastName"
                  value={this.state.user.lastName}
                  onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
              Firstname:
              <input
                  type="text"
                  name="firstName"
                  value={this.state.user.firstName}
                  onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
              Email:
              <input
                  type="email"
                  name="email"
                  value={this.state.user.email}
                  onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
              Phone:
              <input
                  type="tel"
                  name="phone"
                  value={this.state.user.phone}
                  onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
              Country:
              <input
                  type="text"
                  name="country"
                  value={this.state.user.country}
                  onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
              City:
              <input
                  type="text"
                  name="city"
                  value={this.state.user.city}
                  onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
              Currency:
              <select name="currency"
                      value={this.state.user.currency}
                      onChange={this.handleChange}>
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
                  type="text"
                  name="registered"
                  value={this.state.user.registered}
                  disabled/>
            </label>
            <br/>

            <input type="submit" value="Save"/>
          </form>
        </div>
    )
  }
}