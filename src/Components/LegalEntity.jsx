import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Row, Col, FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap';
import DOB from './DOB';
import Address from './Address';
import PersonalAddress from './PersonalAddress';

// Data from RDS
import AllAccTypes from './AllAccTypes';

//Query
import AllAccTypesQuery from '../Queries/AllAccTypesQuery';
 
export default class LegalEntity extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }

    getInitialState = () => ({
        legal_entity: {
            first_name: '',
            last_name: '',
            type: '',
            ssn_last_4: '',
            business_name: '',
            business_tax_id: '',
            personal_id_number: ''
        }
    });

    handleType = (type) => {
        this.setState({type: type});
    }

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    render() {

        const { legal_entity } = this.state;

        return (
            <Row form>
                <Col md={12}>
                    <Row form>
                        <Col md={4}>
                            <AllAccTypesWithData onSelectType={this.handleType}/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="first_name">First Name</Label>
                                <Input type="text" name='first_name' id='first_name' placeholder="First Name" onChange={this.handleChange.bind(this, `${legal_entity.first_name}`)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="last_name">Last Name</Label>
                                <Input type="text" name='last_name' id='last_name' placeholder="Last Name" onChange={this.handleChange.bind(this, `${legal_entity.last_name}`)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="business_name">Business Name</Label>
                                <Input type="text" name='business_name' id='business_name' placeholder="Business Name" onChange={this.handleChange.bind(this, `${legal_entity.business_name}`)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="business_tax_id">Business Tax Id</Label>
                                <Input type="text" name='business_tax_id' id='business_tax_id' placeholder="Business Tax Id" onChange={this.handleChange.bind(this, `${legal_entity.business_tax_id}`)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="ssn_last_4">SSN Last 4</Label>
                                <Input type="text" name='ssn_last_4' id='ssn_last_4' placeholder="SSN Last 4" onChange={this.handleChange.bind(this, `${legal_entity.ssn_last_4}`)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="personal_id_number">Personal Id Number</Label>
                                <Input type="text" name='personal_id_number' id='personal_id_number' placeholder="Personal Id Number" onChange={this.handleChange.bind(this, `${legal_entity.personal_id_number}`)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} lg={6} md={12}>
                            <Card>
                                <CardHeader>D.O.B.</CardHeader>
                                <CardBody>
                                    <DOB />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={6} lg={6} md={12}>
                            <Card>
                                <CardHeader>Address</CardHeader>
                                <CardBody>
                                    <Address/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={6} lg={6} md={12}>
                            <Card>
                                <CardHeader>Personal Address</CardHeader>
                                <CardBody>
                                    <PersonalAddress/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

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