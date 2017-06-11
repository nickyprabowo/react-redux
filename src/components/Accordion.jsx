<Accordion styled>
  <Accordion.Title>
    <Icon name='dropdown' />
    Dropdown
  </Accordion.Title>
  <Accordion.Content>
      <Menu.Item name='report' as={Link} to='/home/addReport' active={this.state.activeItem === 'report'} onClick={this.handleItemClick} />
      <Menu.Item name='mostComments' active={this.state.activeItem === 'mostComments'} onClick={this.handleItemClick} />
      <Menu.Item name='mostPopular' active={this.state.activeItem === 'mostPopular'} onClick={this.handleItemClick} />
  </Accordion.Content>
</Accordion>