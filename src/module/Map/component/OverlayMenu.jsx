import React, { Component, PropTypes } from 'react';
import {Form, Button, Input, TextArea} from 'semantic-ui-react';

import { OverlayView } from 'react-google-maps';

const OVERLAY_STYLES = {
  mapContainer: {
    height: `100%`,
  },
  overlayView: {
    background: `white`,
    width: `250px`,
    border: `1px solid #ccc`,
    padding: 15,
  },
};

const options = [
  { key: '1', text:'Penutupan Jalan', value: 'Penutupan Jalan' },
  { key: '2', text:'Galian Kabel', value: 'Galian Kabel' },
  { key: '3', text:'Kecelakaan', value: 'Kecelakaan' },
  { key: '4', text:'Demonstrasi', value: 'Demonstrasi' }
]

class OverlayMenu extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
          kategori: options[0].value
        }
    }

    getPixelPositionOffset = (width, height) => {
      return { x: -(width / 2), y: -(height / 2) };
    }

    handleSpecialInputChange = (event, data) => {
      const value = data.value;
      const name = data.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.setting.overlayInput(this.state.kategori);
    }

    render() {
      
      return (
        <OverlayView
          position={{ lat: `${this.props.setting.overlayPosition.lat}`, lng: `${this.props.setting.overlayPosition.lng}` }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={this.getPixelPositionOffset}
        >
          <div style={OVERLAY_STYLES.overlayView}>
            <h5>Choose Type</h5>
              <Form.Select name='kategori' label='Kategori' defaultValue={options[0].value} selection options={options} onChange={this.handleSpecialInputChange} compact required />
              <Button className='primary' size='mini' onClick={this.handleSubmit}>Submit</Button>
          </div>
        </OverlayView>
      );
      
    }
}

export default OverlayMenu;
  