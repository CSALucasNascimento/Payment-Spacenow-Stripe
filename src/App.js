import React, { Component } from 'react';

import './App.css';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
// import { graphql, ApolloProvider, compose } from 'react-apollo';
import { AWS_CONFIG } from './aws-exports.js';

// Components
import Account from './Components/Account';
// import AllAccFields from './Components/AllAccFields';
// import AllAccFieldsQuery from './Queries/AllAccFieldsQuery';

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

        await fetch(`${AWS_CONFIG.AWS_API_GATEWAY.STRIPE.API_URL}createcustomaccount`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
        })

    }

    async handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {

        return (
            <Container className="App">
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>Account</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <Account />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                


                {/* <Row form>
                    <AllAccFieldsWithData countryId={countryId} typeId={typeId}/>
                </Row> */}


                <Button onClick={this.handleButtonClick}>Call API</Button>

            </Container>

        );
    }
}

// const AllAccFieldsWithData = compose(
//     graphql(AllAccFieldsQuery, {
//         options: (props) => ({
//             fetchPolicy: 'cache-and-network',
//             refetchQueries: AllAccFieldsQuery,
//             variables: { 
//                 accCountryId: props.countryId,
//                 accTypeId: props.typeId
//             }
//         }),
//         props: (props) => ({
//             accFields: props.data.getAllAccFields
//         })
//     })
// )(AllAccFields);

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
);

export default WithProvider;