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
        const { dob } = this.state;
        const { target: { value } } = event;
        dob[field] = value;
        this.setState({ dob });
        this.props.callbackFromParent(dob);
    }

    render() {

        const { dob } = this.state;

        return (
            <InputGroup>
                <Input type="text" name='day' id='day' placeholder="DD" value={dob.day} onChange={this.handleChange.bind(this, `day`)}/>
                <Input type="text" name='month' id='month' placeholder="MM" value={dob.month} onChange={this.handleChange.bind(this, `month`)}/>
                <Input type="text" name='year' id='year' placeholder="YYYY" value={dob.year} onChange={this.handleChange.bind(this, `year`)}/>
            </InputGroup>
        );
    }
}