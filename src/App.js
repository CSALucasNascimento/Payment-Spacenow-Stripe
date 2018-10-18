import React, { Component } from 'react';

import './App.css';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import { AWS_CONFIG } from './aws-exports.js';

// Components
import Account from './Components/Account';

import { Container, Form, Col, Row, Button, Card, CardHeader, CardBody } from 'reactstrap';

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
    }

    getInitialState = () => ({
        account: ''
    });

    myCallback = (dataFromChild) => {
        this.setState({ account: dataFromChild});
    }

    async handleSubmit(event) {
        const { account } = this.state;
        event.preventDefault();
        await fetch(`${AWS_CONFIG.AWS_API_GATEWAY.STRIPE.API_URL}createcustomaccount`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
        })
    }

    render() {
        const { account } = this.state;
        
        console.log(account);

        return (
            <Container className="App">
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>Account</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <Account callbackFromParent={this.myCallback} />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Button>Call API</Button>

            </Container>

        );
    }
}

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
);

export default WithProvider;