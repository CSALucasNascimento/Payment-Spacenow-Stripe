import React, { Component } from 'react';

import './App.css';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import AppSync from './aws-exports.js';

// Components
import AllAccCountries from './Components/AllAccCountries';
import AllAccTypes from './Components/AllAccTypes';
import AllAccFields from './Components/AllAccFields';

// Queries
import AllAccCountriesQuery from './Queries/AllAccCountriesQuery';
import AllAccFieldsQuery from './Queries/AllAccFieldsQuery';
import AllAccTypesQuery from './Queries/AllAccTypesQuery';

const client = new AWSAppSyncClient({
    url: AppSync.aws_appsync_graphqlEndpoint,
    region: AppSync.aws_appsync_region,
    auth: {
        type: AppSync.aws_appsync_authenticationType,
        apiKey: AppSync.aws_appsync_apiKey
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
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

    render() {

        return (
        <div className="App">
            <AllAccCountriesWithData onSelectCountry={this.handleCountry}/>
            <AllAccTypesWithData onSelectType={this.handleType}/>
            <AllAccFieldsWithData/>
        </div>
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
            variables: { 
                accCountryId: 1,
                accTypeId: 1
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