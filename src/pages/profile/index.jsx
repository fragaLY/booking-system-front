import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'
import '../common/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {FormWrapper, Label, ProfileContainer, ProfilePage} from "./styles";
import {CountryDropdown} from "react-country-region-selector";

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

  componentDidCatch(error, message) {
    this.setState({
      hasError: true,
      isSaved: false,
      hasChanges: false,
      error: message
    });
    console.error(error, message);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      hasChanges: true
    })
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

    this.saveUser(JSON.stringify(user), 'PUT');
  };

  saveUser = (user, method) => {
    const {profileUrl} = this.props.location.state;
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
                isSaved: false,
                error: json.message
              });
            });
          } else {
            this.setState({
              hasError: false,
              hasChanges: false,
              isSaved: true,
              error: ''
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
  };

  selectCountry(country) {
    this.setState({
      country: country,
      hasChanges: true
    });
  }

  render() {
    const buttonClassValue = this.state.hasChanges
        ? 'btn btn-success btn-lg'
        : 'btn btn-danger btn-lg';
    return (
        <ProfilePage>
          <ProfileContainer>
            <Label>Profile</Label>

            <FormWrapper>
              <form onSubmit={this.handleSubmit}>
                {this.state.hasError &&
                <div className="form-group text-danger">
                  <label>{this.state.error}</label>
                </div>
                }

                {this.state.isSaved &&
                <div className="form-group text-success">
                  <label>Information updated</label>
                </div>
                }

                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="">Name</span>
                    </div>
                    <input type="text" name="lastName"
                           className="form-control col-lg-2"
                           placeholder="Lastname"
                           aria-label="lastName"
                           value={this.state.lastName}
                           onChange={this.handleChange}
                           aria-describedby="basic-addon1"
                           required="required"/>
                    <input type="text"
                           name="firstName"
                           className="form-control col-lg-2"
                           placeholder="Firstname"
                           aria-label="firstName"
                           value={this.state.firstName}
                           onChange={this.handleChange}
                           aria-describedby="basic-addon1"
                           required="required"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">Email</span>
                    </div>
                    <input type="email"
                           name="email"
                           className="form-control col-lg-3"
                           placeholder="email@email.com"
                           aria-label="email"
                           value={this.state.email}
                           onChange={this.handleChange}
                           aria-describedby="basic-addon1"
                           required="required"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">Phone
                  </span>
                    </div>
                    <input type="tel"
                           name="phone"
                           className="form-control col-lg-3"
                           placeholder="Phone number"
                           aria-label="phone"
                           value={this.state.phone}
                           onChange={this.handleChange}
                           aria-describedby="basic-addon1"
                           required="required"/>
                  </div>
                </div>


                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">Country</span>
                    </div>
                    <CountryDropdown className = "form-control col-lg-3"
                        value={this.state.country}
                        onChange={(country) => this.selectCountry(country)}/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">City
                  </span>
                    </div>
                    <input type="text"
                           name="city"
                           className="form-control col-lg-1"
                           placeholder="City"
                           aria-label="city"
                           value={this.state.city}
                           onChange={this.handleChange}
                           aria-describedby="basic-addon1"
                           required="required"/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <div className="input-group-prepend">
                      <span className="input-group-text"
                            id="basic-addon1">Currency
                      </span>
                      </div>
                      <select className="form-control form-control-lg col-lg-1"
                              name="currency"
                              value={this.state.currency}
                              onChange={this.handleChange}>
                        <option value="BYN">BYN</option>
                        <option value="RUB">RUB</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>
                </div>


                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                  <span className="input-group-text"
                        id="basic-addon1">Registered
                  </span>
                    </div>
                    <input type="text"
                           name="registered"
                           className="form-control col-lg-2"
                           placeholder="registered"
                           aria-label="registered"
                           value={this.state.registered}
                           disabled
                           aria-describedby="basic-addon1"/>
                  </div>
                </div>

                <button className={buttonClassValue}
                        disabled={!this.state.hasChanges}
                        type="submit">SAVE
                </button>
              </form>
            </FormWrapper>
          </ProfileContainer>
        </ProfilePage>
    )
  }
}
