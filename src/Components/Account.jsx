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
import AllAccFieldsQuery from '../Queries/AllAccFieldsQuery';
 
export default class Account extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        account: {
            type: 'custom',
            country: '',
            email: '',
            legal_entity: '',
            external_account: {
                country: '',
                currency: ''
            },
            tos_acceptance: {
                ip: '',
                date: ''
            }
        },
        countryId: '',
        typeId: ''
    });

    componentWillMount = async () => {
        const { account } = this.state;
        const data = await fetch(`https://json.geoiplookup.io`);
        const body = await data.json();
        account.tos_acceptance.ip = body.ip;
        account.tos_acceptance.date = new Date().getTime() / 1000| 0;
        this.setState({ account });
    }

    handleCountry = (country) => {
        const { account } = this.state;
        account.country = country.shortName;
        account.external_account.country = country.shortName;
        account.external_account.currency = country.currency;
        this.setState({ account });
        this.setState({ countryId: country.id })
        this.props.callbackFromParent(account);
    }

    myCallbackLegalEntity = (dataFromChild, typeId) => {
        const { account } = this.state;
        account.legal_entity = { ...account.legal_entity, ...dataFromChild};
        this.setState({ account });
        this.setState({ typeId: typeId });
        this.props.callbackFromParent(account);
    }

    myCallbackExternalAccount = (dataFromChild) => {
        const { account } = this.state;
        account.external_account = { ...account.external_account, ...dataFromChild };
        this.setState({ account });
        this.props.callbackFromParent(account);
    }

    handleChange = (field, event) => {
        const { account } = this.state;
        const { target: { value } } = event;
        account[field] = value;
        this.setState({
            account
        });
        this.props.callbackFromParent(account);
    }

    render() {

        const { account, countryId, typeId } = this.state;

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
                                <Input type="text" name='email' id='email' placeholder="Email" value={account.email} onChange={this.handleChange.bind(this, `email`)} />
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
                                    <LegalEntityWithData callbackFromParent={this.myCallbackLegalEntity} accCountryId={countryId} accTypeId={typeId}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>External Accounts</CardHeader>
                                <CardBody>
                                    <ExternalAccountWithData callbackFromParent={this.myCallbackExternalAccount} countryId={countryId}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const LegalEntityWithData = compose(
    graphql(AllAccFieldsQuery, {
        options: (props) => ({
            fetchPolicy: 'cache-and-network',
            refetchQueries: AllAccFieldsQuery,
            variables: { 
                accCountryId: props.accCountryId,
                accTypeId: props.accTypeId
            }
        }),
        props: (props) => ({
            accFields: props.data.getAllAccFields
        })
    })
)(LegalEntity);

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

const ExternalAccountWithData = compose(
    graphql(AllAccCountriesQuery, {
        options: () => ({
            fetchPolicy: 'cache-and-network'
        }),
        props: (props) => ({
            accCountries: props.data.getAllAccCountries
        })
    })
)(ExternalAccount);