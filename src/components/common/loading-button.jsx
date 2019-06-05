import React from 'react';
import saveAs from 'file-saver';
import Button from 'react-bootstrap/Button';

export class LoadingButton extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false
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

        switch (response.status) {
          case 200:
            response.blob().then((blob) => {
              saveAs(blob, 'orders-report');
            });
            break;
          case 404:
            response.json().then((json) => {
              this.setState({
                hasError: true,
                error: "Error:" + json.message
              });
            });
            break;
          default:
            console.log("Default case")
        }
      }).then(() => this.setState({isLoading: false})
      ).catch(error => console.error('Error:', error));
    })
  };

  render() {
    const {isLoading} = this.state;

    return (
        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? this.handleClick : null}
        >
          {isLoading ? 'Loading…' : 'Download report'}
        </Button>
    );
  }
}

export default LoadingButton
