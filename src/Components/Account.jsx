import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Row, Col, FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap';

// Components
import ExternalAccount from './ExternalAccount';
import LegalEntity from './LegalEntity';

// Data from RDS
import AllAccCountries from './AllAccCountries';

// Queries
import AllAccCountriesQuery from '../Queries/AllAccCountriesQuery';
 
export default class Account extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        account: {
            type: 'custom',
            country: '',
            email: ''
        }
    });

    handleCountry = (country) => {
        this.setState({country: country});
    }

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    render() {

        const { account } = this.state;

        return (
            <Row form>
                <Col md={12}>
                    <Row form>
                        <Col md={6}>
                            <AllAccCountriesWithData onSelectCountry={this.handleCountry}/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" name='email' id='email' placeholder="Email" onChange={this.handleChange.bind(this, `${account.email}`)} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={12}>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>Legal Entity</CardHeader>
                                <CardBody>
                                    <LegalEntity />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>External Accounts</CardHeader>
                                <CardBody>
                                    <ExternalAccount />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const AllAccCountriesWithData = compose(
    graphql(AllAccCountriesQuery, {
        options: () => ({
            fetchPolicy: 'cache-and-network'
        }),
        props: (props) => ({
            accCountries: props.data.getAllAccCountries
        })
    })
)(AllAccCountries);