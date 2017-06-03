import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Form, Image, Segment, Message, Header} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

class Login extends Component {

  state = {
    username : '',
    password : ''
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLogin = event => {
    event.preventDefault();
    this.props.loginCheck(this.state.username, this.state.password);
  }

  render() {

    if(this.props.isLoggedIn){
      return (
        <Redirect to='/home/report' />
      )
    }

    return (
      <Grid className='ui middle aligned login-page'>
        <Grid.Column>
          <div className="login-wrapper">
            <Form className="login-form" inverted>
              <Image src={require('../../../assets/img/jsc-logo.png')} size='small' centered/>
              <Form.Input name='username' label='Username' placeholder='username' onChange={this.handleInputChange} required/>
              <Form.Input name='password' label='Password' type='password' onChange={this.handleInputChange} required />
              <Form.Button color='orange' fluid onClick={this.handleLogin}>LOGIN</Form.Button>
            </Form>
          </div>
        </Grid.Column>  
      </Grid>
    );
  }
}

export default Login;
