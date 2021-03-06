import React from 'react';
import saveAs from 'file-saver';
import Button from 'react-bootstrap/Button';

import './index.css';

const docxContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const fromPathVariable = '?from=';
const toPathVariable = '&to=';

export class LoadingButton extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false,
      hasError: false,
      error: ''
    };
  }

  handleClick = () => {

    const {from, to, url} = this.props;

    this.setState({isLoading: true}, () => {

      const headers = new Headers({
        'Content-Type': docxContentType
      });

      const fromValue = from ? new Date(from).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js
      const toValue = to ? new Date(to).toISOString().slice(0, 10) : ''; //todo vk: fix it with moment.js

      fetch(
          url.concat(fromPathVariable, fromValue, toPathVariable, toValue),
          {headers}
      ).then((response) => {

        if (response.status === 200) {
          response.blob().then((blob) => {
            saveAs(blob, 'report');
            this.setState({
              hasError: false,
              error: ''
            });
          });
        } else {
          response.json().then((json) => {
            this.setState({
              hasError: true,
              error: json.message
            });
          });
        }

      }).then(() => this.setState({isLoading: false})
      );
    })
  };

  componentDidCatch(error, message) {
    this.setState({
      hasError: true,
      error: message
    });
    console.error(error, message);
  }

  render() {
    const {isLoading} = this.state;

    return (
        <div>
          <Button
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? this.handleClick : null}>
            {isLoading ? 'Loading…' : 'Download report'}
          </Button>
          {this.state.hasError &&
          <div className="form-group text-danger">
            <label>{this.state.error}</label>
          </div>
          }
        </div>
    );
  }
}

export default LoadingButton
