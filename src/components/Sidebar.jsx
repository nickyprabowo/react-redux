import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Sidebar extends Component{
  constructor(props){
    super(props)
    this.state = {
      activeItem : 'events',
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    return(
      <Menu vertical className='left-menu'>
        <Menu.Item
          name='events'
          to='/events/report'
          as={Link}
          active={this.state.activeItem === 'events'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}

export default Sidebar