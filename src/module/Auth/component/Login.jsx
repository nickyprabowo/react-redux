import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Form, Image, Segment, Message, Header} from 'semantic-ui-react';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  static get propTypes() {
    return {
      loginCheck: PropTypes.func,
      isLoading: PropTypes.bool,
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isLoading) {
      return <h1>Logging in... Please wait</h1>
    }

    return (
      <Grid className='ui middle aligned login-page'>
        <Grid.Column>
          <div className="login-wrapper">
            <Form className="login-form" onSubmit={this.handleSubmit} inverted>
              <Image src={require('assets/img/jsc-logo.png')} size='small' centered/>
              <Form.Input name='username' label='Username' placeholder='username' onChange={this.handleInputChange} required/>
              <Form.Input name='password' label='Password' placeholder='password' type='password' onChange={this.handleInputChange} required />
              <Form.Button color='orange' fluid>LOGIN</Form.Button>
            </Form>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
