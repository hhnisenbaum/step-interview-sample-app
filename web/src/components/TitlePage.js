import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import { Table, Card, CardBody, Form, Input, Button } from "reactstrap";

class TitlePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: undefined,
        ownerChangeValue: "",
        notFound: false,
      }
      this.loadTitle = this.loadTitle.bind(this);
      this.ownerNameHandleChange = this.ownerNameHandleChange.bind(this);
      this.ownerNameHandleSubmit = this.ownerNameHandleSubmit.bind(this);
    }
    ownerNameHandleChange(event) {
      this.setState({ownerChangeValue: event.target.value});
    }
    ownerNameHandleSubmit(event) {
      event.preventDefault();
      fetch(`/api/titles/${this.state.data.id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ownerName: this.state.ownerChangeValue}),
        })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.setState({
            data: json,
            ownerChangeValue: '',
          })
        });
    }
    loadTitle() {
      var titleNo = this.props.match.params.titleNo;
      fetch(`/api/titles/${titleNo}`)
        .then(res => {
          if (res.status === 404) {
            this.setState({
              notFound: true,
              data: undefined,
            });
          } else {
            res.json().then(json => {
              this.setState({
                notFound: false,
                data: json,
              })
            })
          }
        });
    }
    componentDidMount() {
      this.loadTitle();
    }
    componentDidUpdate(prevProps) {
      var newTitleNo = this.props.match.params.titleNo;
      var oldTitleNo = prevProps.match.params.titleNo;
      if(oldTitleNo !== newTitleNo) {
        this.loadTitle();
      }
    }
    render() {
      var titleNo = this.props.match.params.titleNo;
      var title = this.state.data;
      return (
        <div>
          <h3>Title #{titleNo}</h3>
          {this.state.data === undefined && (this.state.notFound ? <p>Incorrect title number</p> : <p>Loading...</p>)}
          {this.state.data && <div>
            <Table>
                <tbody>
                    <tr>
                        <th>Description</th>
                        <td data-testid="description">{title.description}</td>
                    </tr>
                    <tr>
                        <th>Current Owner</th>
                        <td data-testid="owner">{title.ownerName}</td>
                    </tr>
                </tbody>
            </Table>
            <Card color="light" style={{marginTop: "50px"}}>
                <CardBody>
                    <h4>Change Owner</h4>
                    <p>As a registered conveyancing lawyer, you may record a change of ownership of this title.</p>
                    <Form inline onSubmit={this.ownerNameHandleSubmit}>
                        <Input type="text" value={this.state.ownerChangeValue} onChange={this.ownerNameHandleChange} 
                            placeholder="Enter the new owner name" style={{width: "400px"}}/>
                        &nbsp;
                        <Button color="primary" type="submit" value="Submit">Save</Button>
                    </Form>
                </CardBody>
            </Card>

          </div>}
        </div>
      );
    }
}

export default withRouter(TitlePage);