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
            line1: '',
            postal_code: '',
            state: ''
        }
    });

    handleChange = (field, event) => {
        const { address } = this.state;
        const { target: { value } } = event;
        address[field] = value;
        this.setState({ address });
        this.props.callbackFromParent(address);
    }

    render() {

        const { address } = this.state;

        return (
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name='city' id='city' placeholder="City" value={address.city} onChange={this.handleChange.bind(this, `city`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="line_1">Adress</Label>
                        <Input type="text" name='line1' id='line1' placeholder="Address" value={address.line1} onChange={this.handleChange.bind(this, `line1`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="postal_code">Post Code</Label>
                        <Input type="text" name='postal_code' id='postal_code' placeholder="Post Code" value={address.postal_code} onChange={this.handleChange.bind(this, `postal_code`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input type="text" name='state' id='state' placeholder="State" value={address.state} onChange={this.handleChange.bind(this, `state`)} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}