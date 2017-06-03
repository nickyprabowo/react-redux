import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Grid} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

class Header extends Component {

    constructor(props){
        super();
        this.state = {
            activeItem : '',
        };
    }

    handleItemClick = (e,{name}) => {
      this.setState(function(){
        return {
          activeItem: name
        }
      }, function(){
        this.props.logout(this.props.me.username, this.props.me.password);
      });
    }

  render(){

    if(!this.props.isLoggedIn){
      return (
        <Redirect to='/login' />
      )
    }

    return(

      <Menu inverted className='menu-bar top fixed'>

            <Menu.Item header>JKT NXT</Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                name='profile'
                active={this.state.activeItem === 'profile'}
                onClick={this.handleItemClick}
              >
                Profile
              </Menu.Item>

              <Menu.Item
                name='logout'
                active={this.state.activeItem === 'logout'}
                onClick={this.handleItemClick}
              >
                Logout
              </Menu.Item>
          </Menu.Menu>

        </Menu>

        /*<Menu inverted className='menu-bar top attached'>
            <Menu.Item header>JKT NXT</Menu.Item>

            <Menu.Menu position='right'>

              <Menu.Item
                icon='sidebar'
                name='upcomingEvents'
                active={this.state.activeItem === 'upcomingEvents'}
                onClick={() => this.handleItemClick(name)}
              >
                Menu
              </Menu.Item>
          </Menu.Menu>
        </Menu>*/

    )
  }
}

export default Header ;