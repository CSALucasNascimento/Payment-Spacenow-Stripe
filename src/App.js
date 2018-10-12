import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AllAccsCountry from "./Components/AllAccsCountry";

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import AppSync from './aws-exports.js';
import AllAccsCountryQuery from './Queries/AllAccsCountryQuery';

const client = new AWSAppSyncClient({
    url: AppSync.aws_appsync_graphqlEndpoint,
    region: AppSync.aws_appsync_region,
    auth: {
        type: AppSync.aws_appsync_authenticationType,
        apiKey: AppSync.aws_appsync_apiKey
    }
});

class App extends Component {
    render() {
        return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <AllAccsCountryWithData />
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

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
);

export default WithProvider;