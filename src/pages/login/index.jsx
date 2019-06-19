import React from 'react';
import {
  Button,
  ButtonToolbar,
  FormControl,
  FormGroup,
  FormLabel
} from "react-bootstrap";
import "./Login.css";
import {NavLink} from "react-router-dom";

export class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hasError: false,
      error: ''
    };
  }

  componentDidCatch(error, message) {

    this.setState({
      hasError: true,
      hasChanges: false,
      error: message
    });

    console.error(error, message);
  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  isValidForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {

    return (

        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">

              {this.state.hasError &&
              <div className="form-group text-danger">
                <label>{this.state.error}</label>
              </div>
              }

              <FormLabel>Email</FormLabel>
              <FormControl
                  autoFocus
                  type="email"
                  autoComplete="section-blue shipping address-level2"
                  placeholder="email@email.com"
                  aria-label="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required/>
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                  type="password"
                  autoComplete="section-blue shipping address-level2"
                  placeholder="password"
                  aria-label="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
              />
            </FormGroup>

            <ButtonToolbar>
              <Button block disabled={!this.isValidForm()} type="submit">
                Login
              </Button>
              {this.state.hasError &&
              <NavLink  to='/forgot'>
                Forgot password?
              </NavLink >
              }
              <NavLink  to='/accounts'>
                Create account
              </NavLink >
            </ButtonToolbar>
          </form>
        </div>
    )
  }
}

export default LoginPage;