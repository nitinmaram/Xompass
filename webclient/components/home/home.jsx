import React from 'react'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Sidebar, Icon, Button } from 'semantic-ui-react'
import Acc from './acc.jsx'
import {Link} from 'react-router';
import Cookies from 'universal-cookie';
const cookies= new Cookies();

const accMapObj = {}
let astIDOptions = [
  { key: 'AstID1', text: 'AstID1', value: 'AstID1' },
  { key: 'AstID2', text: 'AstID2', value: 'AstID2' },
  { key: 'AstID3', text: 'AstID3', value: 'AstID3' },
  { key: 'AstID4', text: 'AstID4', value: 'AstID4' },
  { key: 'AstID5', text: 'AstID5', value: 'AstID5' }
]
let orgOptions = [
  { key: 'org1', text: 'org1', value: 'org1' },
  { key: 'org2', text: 'org2', value: 'org2' },
  { key: 'org3', text: 'org3', value: 'org3' },
  { key: 'org4', text: 'org4', value: 'org4' },
  { key: 'org5', text: 'org5', value: 'org5' }
]
let originalData = []
export default class FixedMenuLayout extends React.Component {
  constructor(){
    super();
          this.state={
            analyticsDisplay:false,
            mlDisplay:false,
            companyDisplay: 'none',
            getAllAccDimmer: true,
            activeItem: 'gamepad',
            visibility: false
          }
  }
  componentWillMount(){
    let context = this
    console.log("componentWillMount");
    $.ajax({
            url: "http://localhost:3000/account/",
            type: 'GET',
            success: function(data) {
              originalData = data
              data.forEach((val,ind)=>{
                console.log({id:val[0].value,name:val[1].value});
                  accOptions.push({key: val[0].value, text:val[1].value, value:val[0].value})
                  accMapObj[val[0].value] = val[1].value
              })
              context.setState({
                getAllAccDimmer: false
              });
            }.bind(context),
            error: function(err) {
              context.setState({
                getAllAccDimmer: false
              });
                console.log('error occurred on AJAX');
                console.log(err);
            }.bind(context)
        });
  }
componentDidMount(){
  console.log(cookies.get('role'));
  // if(cookies.get('role') == 'Admin')
  // {
    this.setState({
      companyDisplay: ''
    })
  //
  // }
  // else{
    // this.setState({
    //   companyDisplay: 'none'
    // })
  // }
}
analyticsClick(){
  this.setState({analyticsDisplay:!this.state.analyticsDisplay,
  mlDisplay: false})
}
mlClick(){
  this.setState({
    analyticsDisplay:false,
    mlDisplay:!this.state.mlDisplay})
}
visibilityControl1(){
  this.setState({
    visibility: true
  })
}
visibilityControl2(){
  this.setState({
    visibility: false
  })
}
handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return(
      <div style={{height: '100vh'}}>
      <Menu onMouseEnter = {this.visibilityControl1.bind(this)}
     borderless widths = '0'
      onMouseLeave={this.visibilityControl2.bind(this)} icon='labeled' vertical inverted style={{position: 'fixed', zIndex: '1', height: '100vh'}}>
        <Menu.Item name='gamepad' active={activeItem === 'gamepad'}
        onClick={this.handleItemClick}>
        <Image wrapped size='tiny'  src='../../images/xompass-cut.png'
        style = {{width: '38%'}}/>
        </Menu.Item>

        <Menu.Item name='puzzle' active={activeItem === 'puzzle'} onClick={this.handleItemClick}>
          <Icon name='puzzle' />
        </Menu.Item>

        <Menu.Item name='bar chart' active={activeItem === 'bar chart'} onClick={this.handleItemClick}>
          <Icon name='bar chart' />
        </Menu.Item>
      </Menu>
        <Sidebar.Pushable style={{marginLeft: '7%', marginTop: '0'}}>
              <Sidebar as={Menu} borderless onMouseEnter = {this.visibilityControl1.bind(this)}
              onMouseLeave={this.visibilityControl2.bind(this)} animation='scale down'
              style={{width:'18%'}}
               visible={this.state.visibility} icon='labeled' vertical inverted>

              <Menu.Item name='Home'>
              <Link to='/home'>
               <Button secondary>Home</Button>
               </Link>
              </Menu.Item>
              <Menu.Item name='Data Analytics' style={{display: this.state.analyticsDisplay }}>
               <Button secondary onClick = {this.analyticsClick.bind(this)}>Data Analytics &nbsp; &nbsp;<Icon name={this.state.analyticsDisplay?'arrow down':'arrow right'}/></Button>
              </Menu.Item>
                <Menu.Item name='Image Analytics' style={{display:this.state.analyticsDisplay?'':'none'}}>
                <Link to='/imageAnalytics'>
                 <Button secondary >Image Analytics</Button>
                 </Link>
                </Menu.Item>
                <Menu.Item name='ML' style={{display: this.state.mlDisplay }}>
                 <Button secondary onClick = {this.mlClick.bind(this)}>Machine Learning <Icon name={this.state.mlDisplay?'arrow down':'arrow right'}/></Button>
                </Menu.Item>
                  <Menu.Item name='Predict Risk' style={{display:this.state.mlDisplay?'':'none'}}>
                  <Link to='/ml'>
                   <Button secondary >Predict Risk</Button>
                   </Link>
                  </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher>
                <Segment fluid style = {{height: '100vh', overflow: 'scroll'}}>
                  {React.cloneElement(this.props.children, { astIDOptions: astIDOptions, accMapObj: accMapObj,
                    originalData: originalData, orgOptions: orgOptions})}
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
      </div>
    )
  }
}
