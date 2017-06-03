import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Grid, Accordion, Icon} from 'semantic-ui-react';

class Sidebar extends Component{
 
  constructor(props){
        super();
        this.state = {
            activeItem : 'events',
        };

    }

    handleItemClick = (e,{name}) => {
      this.setState(function(){
        return {
          activeItem: name
        }
      });
    }

  render(){
    
    return(
        <Menu vertical className='left-menu'>
          <Menu.Item name='events' as={Link} to='/home/report' active={this.state.activeItem === 'events'} onClick={this.handleItemClick} />
        </Menu> 
    )
  }
}

export default Sidebar ;