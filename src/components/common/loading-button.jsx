import React from 'react';
import saveAs from 'file-saver';
import Button from 'react-bootstrap/Button';

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
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      fetch(
          url.concat('?from=', from.toISOString().slice(0, 10),
              '&to=', to.toISOString().slice(0, 10)),
          {headers}
      ).then((response) => {

        if (response.status === 200) {
          response.blob().then((blob) => {
            saveAs(blob, 'orders-report');
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
          {this.state.hasError ? this.state.error : null}
        </div>
    );
  }
}

export default LoadingButton
