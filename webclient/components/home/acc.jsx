import React, { Component } from 'react'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Sidebar, Icon, Button } from 'semantic-ui-react'
import { ToastContainer, toast, style} from 'react-toastify';
import Cookies from 'universal-cookie';
const cookies= new Cookies();
var enc = new TextDecoder();
import LocationPicker from 'react-location-picker';
// import { Link } from 'react-router-dom'

const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

style({
  TOP_RIGHT: {
    top: '5em',
    right: '10em'
  }
})

export default class MenuExampleVertical extends Component {
  constructor(){
    super();
    this.state = {
      astIdSelected: cookies.get('accountname'),
      orgSelected: '',
      accIdSelected: cookies.get('accountid'),
      url1: '',
      url2: '',
      powerbi: '',
      predictions: '',
      getAllAccDimmer: true,
      status: '',
      address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
      position: ""
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);

  }

  astIdChange(e,data){
    this.setState({
      astIdSelected: this.props.accMapObj[data.value],
    })
  }
  orgChange(e,data){
    this.setState({
      orgSelected: data.value,
    })
  }
  notify(){
  }
  handleLocationChange ({ position, address }) {
  // Set new location
  this.setState({ position, address });
}


  render() {
    return (
      <div style = {{marginLeft: '2%'}}>
      <div>
      <Header as='h3' style = {{color: 'rgb(14, 147, 4)'}}>
        <Header.Content>
        Welcome to Xompass ML Portal
        </Header.Content>
      </Header>
      <Header as='h5'> Please Choose an Organisation<br/>
      <Dropdown placeholder='Organisation' selection options={this.props.orgOptions} onChange = {this.astIdChange.bind(this)}>
      </Dropdown>
      </Header>
      <br/>
      </div>
      <div>
        <Header as='h5'>You are at address: <b><i> {this.state.address}</i></b></Header>
        <div>
          <LocationPicker
            containerElement={ <div style={ {width: '80%'} } /> }
            mapElement={ <div style={ {height: '400px'} } /> }
            defaultPosition={defaultPosition}
            onChange={this.handleLocationChange}
            zoom = {3}
          />
          <Header as='h5'>Note: <i> Drag and drop the pointer to Pick a location</i></Header>
        </div>
        <Header as='h5'> Please Choose an Asset ID<br/>
        <Dropdown placeholder='Asset ID' selection options={this.props.astIDOptions} onChange = {this.astIdChange.bind(this)}>
        </Dropdown>
        </Header>
        <Button color='green' size='large' onClick={this.notify.bind(this)}>Submit</Button>
        <ToastContainer hideProgressBar={true} newestOnTop={true}/>
      </div>
</div>
)
}
}
