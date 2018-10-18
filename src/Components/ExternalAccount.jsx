import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import RoutingNumber from './RoutingNumber';

// Queries
import AllRNFieldsQuery from '../Queries/AllRNFieldsQuery';
 
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
            routing_number: '',
            account_number: ''
        }
    });

    myCallback = (dataFromChild) => {
        const { external_account } = this.state;
        external_account.routing_number = dataFromChild;
        this.setState({ external_account })
        this.props.callbackFromParent(external_account);
    }

    handleChange = (field, event) => {
        const { external_account } = this.state;
        const { target: { value } } = event;
        external_account[field] = value;
        this.setState({ external_account });
        this.props.callbackFromParent(external_account);
    }

    render() {

        const { external_account } = this.state;
        const { accCountryId } = this.props;

        return (
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name='country' id='country' placeholder="Country" value={accCountryId} onChange={this.handleChange.bind(this, `country`)} readOnly/>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="currency">Currency</Label>
                        <Input type="text" name='currency' id='currency' placeholder="Currency" value={external_account.currency} onChange={this.handleChange.bind(this, `currency`)} readOnly/>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <RoutingNumberWithData callbackFromParent={this.myCallback} accCountryId={accCountryId} />
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="account_number">Account Number</Label>
                        <Input type="text" name='account_number' id='account_number' placeholder="Account Number" value={external_account.account_number} onChange={this.handleChange.bind(this, `account_number`)} />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

const RoutingNumberWithData = compose(
    graphql(AllRNFieldsQuery, {
        options: (props) => ({
            fetchPolicy: 'cache-and-network',
            refetchQueries: AllRNFieldsQuery,
            variables: { 
                accCountryId: props.accCountryId
            }
        }),
        props: (props) => ({
            accFields: props.data.getAllRNFields
        })
    })
)(RoutingNumber);