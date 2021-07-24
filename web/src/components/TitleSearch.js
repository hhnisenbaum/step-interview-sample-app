import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Label } from "reactstrap";

class TitleSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      this.props.history.push(`/titles/${this.state.value}`);
    }
    render() {
      return (
        <div style={{display: "inline-block"}}>
          <Form inline onSubmit={this.handleSubmit}>
            {/* 
              Add label for accessibility 
              src: https://reach.tech/visually-hidden/
            */}
            <span style={ visuallyHiddenCss }>
              <Label htmlFor="title">Search title</Label>
            </span>
            <Input id="title" type="number" data-cy="input" value={this.state.value} onChange={this.handleChange} placeholder="Enter a title number" />
            &nbsp;
            <Button color="primary" type="submit" value="Submit" data-cy="submit">Go</Button>
          </Form>
        </div>
      );
    }
  }

  export default withRouter(TitleSearch);

  const visuallyHiddenCss = {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: "1px",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }