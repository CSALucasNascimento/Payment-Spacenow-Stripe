import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class PersonalAddress extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }

    getInitialState = () => ({
        personal_address: {
            city: '',
            line1: '',
            postal_code: ''
        }
    });

    handleChange = (field, event) => {
        const { personal_address } = this.state;
        const { target: { value } } = event;
        personal_address[field] = value;
        this.setState({ personal_address });
        this.props.callbackFromParent(personal_address);
    }

    render() {

        const { personal_address } = this.state;

        return (
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name='city' id='city' placeholder="City" value={personal_address.city} onChange={this.handleChange.bind(this, `city`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="line1">Adress</Label>
                        <Input type="text" name='line1' id='line1' placeholder="Address" value={personal_address.line1} onChange={this.handleChange.bind(this, `line1`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="postal_code">Post Code</Label>
                        <Input type="text" name='postal_code' id='postal_code' placeholder="Post Code" value={personal_address.postal_code} onChange={this.handleChange.bind(this, `postal_code`)} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}