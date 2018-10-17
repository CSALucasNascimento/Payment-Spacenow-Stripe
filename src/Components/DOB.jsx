import React, { Component } from "react";
import { InputGroup, Input } from 'reactstrap';

export default class DOB extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }

    getInitialState = () => ({
        dob: {
            day: '',
            month: '',
            year: ''
        }
    });

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    render() {

        const { dob } = this.state;

        return (
            <InputGroup>
                <Input type="text" name='day' id='day' placeholder="DD" onChange={this.handleChange.bind(this, `${dob.day}`)}/>
                <Input type="text" name='month' id='month' placeholder="MM" onChange={this.handleChange.bind(this, `${dob.month}`)}/>
                <Input type="text" name='year' id='year' placeholder="YYYY" onChange={this.handleChange.bind(this, `${dob.year}`)}/>
            </InputGroup>
        );
    }
}