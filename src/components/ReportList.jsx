import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Header, Table, Icon, Checkbox, Button, Divider, Popup, Form, Dropdown, Menu
} from 'semantic-ui-react';
/*import PropTypes from 'prop-types';*/
import api from 'utils/api';

const options = [
  { key: '5', text: '5', value: '5' },
  { key: '10', text: '10', value: '10' },
]

function List(props) {
  return (
    <Table.Body>
      {props.events.map(function (event, index) {
        return (
          <Table.Row key={event.id}>
            <Table.Cell collapsing>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>{event.id}</Table.Cell>
            <Table.Cell>{event.judul}</Table.Cell>
            <Table.Cell>{event.kategori}</Table.Cell>
            <Table.Cell>{event.waktu}</Table.Cell>
            <Table.Cell>{event.deskripsi}</Table.Cell>
            <Table.Cell className='center aligned'>
              <Popup
                trigger={<Button circular size='small' icon='marker' />}
                content='See on Map'
                inverted
              />
              <Popup
                trigger={<Button onClick={props.onEdit.bind(null, event)} circular size='small' icon='edit' />}
                content='Edit'
                inverted
              />
              <Popup
                trigger={<Button circular size='small' icon='trash' />}
                content='Delete'
                inverted
              />
            </Table.Cell>
          </Table.Row>
        )
      })}

    </Table.Body>

  )
}

class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '1',
      search: '',
      limit: options[0].value,
      offset: 0
    };
  }

  static get propTypes() {
    return {
      getItems: PropTypes.func,
    }
  }

  componentWillMount() {
    // get all data
    //this.getData(this.state.limit,this.state.offset);
    if (this.props.items.length == 0) {
      this.props.getItems(this.state.limit, this.state.offset);
      this.props.countItems();
    }
  }

  editData = (event) => {

    event.edited = true;

  }

  /*getData = (limit,offset) => {

    api.fetchAllEvents(limit,offset)
    .then(function(events){
      this.setState(function(){
        return{eventList: events.data}
      })
    }.bind(this));

  }

  countPage = () => {
    api.fetchTotalRecords()
    .then(response => {
      this.setState({countData : 10})
    })
    .catch(err => {
      console.error('cannot count')
    })
  }*/

  // Update search item
  updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  // Update data per page
  updateLimit = (e, { value }) => {

    this.setState({ limit: value }, function () {
      this.props.getItems(this.state.limit, (parseInt(this.state.activeItem) - 1) * this.state.limit);
    })

  }

  handleItemClick = (e, { name }) => {

    this.setState({ activeItem: name }, function () {
      this.props.getItems(this.state.limit, (parseInt(this.state.activeItem) - 1) * this.state.limit);
    });

  }

  renderPagination() {
    const pagination = [];
    const pages = Math.ceil(this.props.totalData / this.state.limit);
    for (let i = 0; i < pages; i++) {
      pagination.push(
        <Menu.Item
          name={i + 1}
          key={i + 1}
          active={this.state.activeItem === i + 1}
          onClick={this.handleItemClick}
        />
      );
    }

    return pagination
  }

  render() {
    // Search Filter
    const filteredEvent = this.props.items.filter(
      function (event) {
        return event.judul.toLowerCase().indexOf(this.state.search) !== -1;
      }.bind(this));

    return (
      <div>
        <Header as='h2'>
          Event List <Header.Subheader>Manage your events here</Header.Subheader>
        </Header>
        <Divider section />
        <Grid>
          <Grid.Column width={10}>
            <Button as={Link} to='/events/addReport' content='Tambah' color='green' icon='plus' labelPosition='right' />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form>
              <Form.Group>
                <Form.Select onChange={this.updateLimit} placeholder="limit" defaultValue={options[0].value} selection options={options} compact width={4} />
                <Form.Input
                  action={{ icon: 'search' }}
                  placeholder='Search...'
                  width={12}
                  defaultValue={this.state.search}
                  onChange={this.updateSearch}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>

        <Table celled compact definition>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell collapsing>
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>Judul</Table.HeaderCell>
              <Table.HeaderCell>Kategori</Table.HeaderCell>
              <Table.HeaderCell>Waktu</Table.HeaderCell>
              <Table.HeaderCell>Lokasi</Table.HeaderCell>
              <Table.HeaderCell>Deskripsi</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <List events={filteredEvent} onEdit={this.editData} />

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Menu compact floated='right' size='mini'>
                  <Menu.Item as='a' icon>
                    <Icon name='left chevron' />
                  </Menu.Item>

                  {this.renderPagination()}

                  <Menu.Item as='a' icon>
                    <Icon name='right chevron' />
                  </Menu.Item>
                </Menu>
                <Dropdown text='Bulk Actions' icon='filter' floating labeled button className='icon'>
                  <Dropdown.Menu>
                    <Dropdown.Item icon='trash' text='Delete' />
                  </Dropdown.Menu>
                </Dropdown>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default ReportList;
