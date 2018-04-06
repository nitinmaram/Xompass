import React from 'react'
import { Icon, Label, Menu, Table ,Button,Input, Dimmer, Loader} from 'semantic-ui-react'
import {hashHistory} from 'react-router';
import {Link} from 'react-router';

export default class TableExamplePagination extends React.Component {
  constructor(){
    super();
    this.state = {
      compData: [],
      delDimmer: true
    }
  }
  componentWillMount(){
    let context = this
    console.log("componentWillMount");
    $.ajax({
            url: "http://localhost:3000/user/",
            type: 'GET',
            success: function(data) {
              var compData = []
              data.forEach((val,ind)=>{
                  compData.push({aId:val[0].value,uName:val[1].value,password:val[2].value,role:val[3].value})
              })
              console.log("ajax");
              console.log(compData,data);
              this.setState({compData,
                delDimmer: false
              });
            }.bind(context),
            error: function(err) {
                console.log('error occurred on AJAX');
                console.log(err);
            }.bind(context)
        });
  }
  deleteRow(uName){
    console.log(uName);
    this.setState({
      delDimmer: true
    })
    let context = this;
    $.ajax({
            url: "http://localhost:3000/user/"+uName,
            type: 'DELETE',
            success: function(data) {
                window.location.reload()
            }.bind(context),
            error: function(err) {
                console.log('error occurred on AJAX');
                console.log(err);
            }.bind(context)
        });
    // this.state.compData.
  }
  render(){
    console.log("render");

    let tableRow = this.state.compData.map(val=>(<Table.Row>
          <Table.Cell>{val.aId}</Table.Cell>
          <Table.Cell>{val.uName}</Table.Cell>
          <Table.Cell>{val.password}</Table.Cell>
          <Table.Cell>{val.role}</Table.Cell>
          <Table.Cell>
          <Button color ='red' content = '-' onClick={this.deleteRow.bind(this, val.uName)}/>
          <Link to = {'/updateUser/'+val.uName}><i><Button color ='orange' content = 'i'/></i></Link>
          </Table.Cell>
        </Table.Row>))

  return(
  <div>
  <Dimmer active={this.state.delDimmer} page>
    <Loader />
  </Dimmer>
  <br/>
  <br/>
  <Input icon='search' placeholder='Search...' />
  <br/>
  <br/>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Account Id</Table.HeaderCell>
        <Table.HeaderCell>User Name</Table.HeaderCell>
        <Table.HeaderCell>Password</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>

      </Table.Row>
    </Table.Header>
    <Table.Body>
    {tableRow}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='left chevron' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
  </div>
)
}
}
