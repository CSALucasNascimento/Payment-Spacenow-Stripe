import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import AllAccsCountry from "./Components/AllAccsCountry";
import AllAccFields from "./Components/AllAccFields";

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import AppSync from './aws-exports.js';
import AllAccsCountryQuery from './Queries/AllAccsCountryQuery';
import AllAccFieldsQuery from './Queries/AllAccFieldsQuery';

const client = new AWSAppSyncClient({
    url: AppSync.aws_appsync_graphqlEndpoint,
    region: AppSync.aws_appsync_region,
    auth: {
        type: AppSync.aws_appsync_authenticationType,
        apiKey: AppSync.aws_appsync_apiKey
    }
});

class App extends Component {

    static propTypes = {
        accCountryFieldsId: PropTypes.number
    };

    static defaultProps = {
        accCountryFieldsId: 1
    }

    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this)
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        accCountryFieldsId: 1
    });
    
    handler = (event) => {
        event.preventDefault()
        this.setState({
            accCountryFieldsId: 1
        });
    }

    render() {
        const accCountryFieldsId = this.state.accCountryFieldsId;
        console.log(accCountryFieldsId)
        return (
        <div className="App">
            <AllAccsCountryWithData />
            <AllAccFieldsWithData />
        </div>
        );
    }
}

const AllAccsCountryWithData = compose(
    graphql(AllAccsCountryQuery, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: (props) => ({
            accsCountry: props.data.getAllAccsCountry
        })
    })
)(AllAccsCountry);

const AllAccFieldsWithData = compose(
    graphql(AllAccFieldsQuery, {
        options: (props) => ({
            fetchPolicy: 'cache-and-network',
            variables: { accCountryFieldsId: props.accCountryFieldsId }
        }),
        props: (props) => ({
            accFields: props.data.getAllAccFields,
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