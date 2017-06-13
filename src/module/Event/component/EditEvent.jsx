import React, { Component, PropTypes } from 'react';
import {Form, Button, Divider, Header, Modal} from 'semantic-ui-react';
import Datetime from 'react-datetime';
import moment from 'moment';
import {Redirect, Link} from 'react-router-dom';

import MapContainer from '../../Map/component/Container';
import LoadingState from '../../../components/Loader';
import 'react-datetime/css/react-datetime.css';

const options = [
  { key: '1', text:'Penutupan Jalan', value: 'Penutupan Jalan' },
  { key: '2', text:'Galian Kabel', value: 'Galian Kabel' },
  { key: '3', text:'Kecelakaan', value: 'Kecelakaan' },
  { key: '4', text:'Demonstrasi', value: 'Demonstrasi' }
]

class EditReport extends Component {
    static propTypes = {
      className: PropTypes.string,
    };

    constructor(props) {
      super(props);

      const { kategori, ...others } = props.editedData

      this.state = {
        kategori: kategori || options[0].value,
        ...others
      }
    }

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleStartDate = (date) => {
      this.setState({ startDate: date });
    }

    handleEndDate = (date) => {
      this.setState({ endDate: date });
    }

    handleSpecialInputChange = (event, data) => {
      const value = data.value;
      const name = data.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();

      const laporan = {
        'judul': this.state.judul,
        'kategori': this.state.kategori,
        'deskripsi' : this.state.deskripsi,
        'start' : moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss"),
        'end' : moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss"),
        'created_at' : new Date('YYYY-MM-DD HH:mm:ss')
      };

      this.props.saveEditEvent(laporan);

      <Redirect to='/home/report' />
    }

    render() {
      return (
        <Modal open={this.props.editing} onClose={this.props.cancelEdit}>
          <Modal.Header>You're now in edit mode</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input name='judul' placeholder='Judul Laporan' label='Judul Laporan' value={this.props.editedData.judul} onChange={this.handleInputChange} required />
                <Form.Select name='kategori' label='Kategori' value={this.state.kategori} selection options={options} onChange={this.handleSpecialInputChange} compact required />
                <Form.TextArea name='deskripsi' label='Deskripsi' placeholder='Tell us more ...' value={this.props.editedData.deskripsi} onChange={this.handleInputChange} required />
                <Form.Group widths='equal'>
                  <Form.Field name='startDate' label='Start Date' value={this.props.editedData.start} control={Datetime} onChange={this.handleStartDate}/>
                  <Form.Field name='endDate' label='End Date' value={this.props.editedData.end} control={Datetime} onChange={this.handleEndDate}/>
                </Form.Group>
                <MapContainer/>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.props.cancelEdit}>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Submit" onClick={this.props.cancelEdit} />
          </Modal.Actions>
        </Modal>
      );
    }
}

export default EditReport;
