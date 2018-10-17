import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class Address extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }

    getInitialState = () => ({
        address: {
            city: '',
            line_1: '',
            postal_code: '',
            state: ''
        }
    });

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    render() {

        const { address } = this.state;

        return (
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name='city' id='city' placeholder="City" onChange={this.handleChange.bind(this, `${address.city}`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="line_1">Adress</Label>
                        <Input type="text" name='line_1' id='line_1' placeholder="Address" onChange={this.handleChange.bind(this, `${address.line_1}`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="postal_code">Post Code</Label>
                        <Input type="text" name='postal_code' id='postal_code' placeholder="Post Code" onChange={this.handleChange.bind(this, `${address.postal_code}`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input type="text" name='state' id='state' placeholder="State" onChange={this.handleChange.bind(this, `${address.state}`)} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}