import React, { Component } from 'react';
import {Form, Button, Divider, Header} from 'semantic-ui-react';
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

class AddReport extends Component {

  constructor(props){
    super();
    this.state = {
      startDate:'',
      judul: '',
      deskripsi: '',
      kategori: options[0].value,
      endDate: '',
      status:'',
      kategoriToEdit: ''
    };
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

    this.setState({
      startDate: date
    });

  }

  handleEndDate = (date) => {

    this.setState({
      endDate: date
    });

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

      this.props.saveEvent(laporan);
      
      <Redirect to='/home/report' />
  }

  render() {

    if(this.props.isLoading){
      return (
        <LoadingState />
      )
    }

    return (
      <div>       
          
        <Header as='h2'>
            Add Event
            <Header.Subheader>
              Submit your event here
            </Header.Subheader>
        </Header>;
        
        <Divider section/>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input name='judul' placeholder='Judul Laporan' label='Judul Laporan' value={this.props.editing ? this.props.editedData.judul : this.state.judul} defaultValue={this.props.editing ? this.props.editedData.judul : this.state.judul} onChange={this.handleInputChange} required />
            <Form.Select name='kategori' label='Kategori' value={'khj'} selection options={options} onChange={this.handleSpecialInputChange} compact required />
            <Form.TextArea name='deskripsi' label='Deskripsi' placeholder='Tell us more ...' onChange={this.handleInputChange} required />
            <Form.Group widths='equal'>
            <Form.Field name='startDate' label='Start Date' control={Datetime} onChange={this.handleStartDate}/>
            <Form.Field name='endDate' label='End Date' control={Datetime} onChange={this.handleEndDate}/>
          </Form.Group>
          <MapContainer/>
          <br />
          <Button className='primary' as={Link} to='/events/MapEditor'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default AddReport;
