import React, { Component } from 'react';

import './App.css';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import { AWS_CONFIG } from './aws-exports.js';

// Components
import AllAccCountries from './Components/AllAccCountries';
import AllAccTypes from './Components/AllAccTypes';
import AllAccFields from './Components/AllAccFields';

// Queries
import AllAccCountriesQuery from './Queries/AllAccCountriesQuery';
import AllAccFieldsQuery from './Queries/AllAccFieldsQuery';
import AllAccTypesQuery from './Queries/AllAccTypesQuery';

import { Container, FormGroup, Form, Col, Row, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';

const client = new AWSAppSyncClient({
    url: AWS_CONFIG.AWS_APPSYNC.STRIPE_ACC.GRAPHQL_ENDPOINT,
    region: AWS_CONFIG.AWS_APPSYNC.STRIPE_ACC.REGION,
    auth: {
        type: AWS_CONFIG.AWS_APPSYNC.STRIPE_ACC.AUTH_TYPE,
        apiKey: AWS_CONFIG.AWS_APPSYNC.STRIPE_ACC.API_KEY
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInitialState = () => ({
        countryId: 1,
        typeId: 1
    });

    handleCountry = (countryId) => {
        this.setState({countryId: countryId});
    }

    handleType = (typeId) => {
        this.setState({typeId: typeId});
    }

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }


    handleButtonClick = async() => {
        const account = {
            "type": "custom",
            "country": "US",
            "email": "lucas@returnonclick.com.au",
            "external_account": {
              "object": "bank_account",
              "country": "US",
              "currency": "usd",
              "routing_number": "110000000",
              "account_number": "000123456789"
            },
            "legal_entity": {
              "address": {
                "city": "San Francisco",
                "line1": "1234 Main Street",
                "postal_code": 94111,
                "state": "CA"
              },
              "dob": {
                "day": 20,
                "month": 5,
                "year": 1987
              },
              "first_name": "Lucas",
              "last_name": "Nascimento",
              "type": "individual"
            },
            "tos_acceptance": {
              "date": 1537169116,
              "ip": "49.181.151.39"
            }
          }

        const res = await fetch(`${AWS_CONFIG.AWS_API_GATEWAY.STRIPE.API_URL}createcustomaccount`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
        })

        console.log(res.json());
    }

    async handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        const { countryId, typeId } = this.state;
        return (
            <Container className="App">
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>Identity</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="text" name="email" id="email" placeholder="Email" onChange={this.handleChange.bind(this, `email`)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <AllAccCountriesWithData onSelectCountry={this.handleCountry}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="type">Country</Label>
                                        <Input type="select" name="type">
                                            <option>Custom</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Button>Submit</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>Add/Edit Identity Details</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="text" name="email" id="email" placeholder="Email" onChange={this.handleChange.bind(this, `email`)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <AllAccCountriesWithData onSelectCountry={this.handleCountry}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="type">Country</Label>
                                        <Input type="select" name="type">
                                            <option>Custom</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Button>Submit</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


                <Row form>
                    <Col md={6}>
                        <AllAccCountriesWithData onSelectCountry={this.handleCountry}/>
                    </Col>
                    <Col md={6}>
                        <AllAccTypesWithData onSelectType={this.handleType}/>
                    </Col>
                </Row>
                <Row form>
                    <AllAccFieldsWithData countryId={countryId} typeId={typeId}/>
                </Row>


                <Button onClick={this.handleButtonClick}>Call API</Button>
            </Container>
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

const AllAccTypesWithData = compose(
    graphql(AllAccTypesQuery, {
        options: () => ({
            fetchPolicy: 'cache-and-network'
        }),
        props: (props) => ({
            accTypes: props.data.getAllAccTypes
        })
    })
)(AllAccTypes);

const AllAccFieldsWithData = compose(
    graphql(AllAccFieldsQuery, {
        options: (props) => ({
            fetchPolicy: 'cache-and-network',
            refetchQueries: AllAccFieldsQuery,
            variables: { 
                accCountryId: props.countryId,
                accTypeId: props.typeId
            }
        }),
        props: (props) => ({
            accFields: props.data.getAllAccFields
        })
    })
)(AllAccFields);

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
);

export default WithProvider;