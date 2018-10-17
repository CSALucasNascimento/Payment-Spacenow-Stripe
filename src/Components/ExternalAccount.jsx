import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import RoutingNumber from './RoutingNumber';
 
export default class ExternalAccount extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }

    getInitialState = () => ({
        external_account: {
            object: 'bank_acount',
            country: '',
            currency: '',
            account_number: ''
        }
    });

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    render() {

        const { external_account } = this.state;

        return (
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name='country' id='country' placeholder="Country" onChange={this.handleChange.bind(this, `${external_account.country}`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="currency">Currency</Label>
                        <Input type="text" name='currency' id='currency' placeholder="Currency" onChange={this.handleChange.bind(this, `${external_account.currency}`)} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <RoutingNumber />
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="account_number">Account Number</Label>
                        <Input type="text" name='account_number' id='account_number' placeholder="Account Number" onChange={this.handleChange.bind(this, `${external_account.account_number}`)} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}