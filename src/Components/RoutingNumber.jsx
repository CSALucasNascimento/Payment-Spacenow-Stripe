import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class RoutingNumber extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }

    getInitialState = () => ({
        routing_number: {
            field_1: '',
            field_2: ''
        }
    });

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    render() {

        const { routing_number } = this.state;

        return (
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="field_1">Field 1</Label>
                        <Input type="text" name='field_1' id='field_1' placeholder="Field 1" onChange={this.handleChange.bind(this, `${routing_number.field_1}`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="field_2">Field 2</Label>
                        <Input type="text" name='field_2' id='field_2' placeholder="Field 2" onChange={this.handleChange.bind(this, `${routing_number.field_2}`)} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}