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

    static defaultProps = {
        accFields: []
    }

    getInitialState = () => ({
        legal_entity: {},
        typeId: ''
    });

    handleType = (type) => {
        const { legal_entity } = this.state;
        legal_entity.type = type.description;
        this.setState({ legal_entity });
        this.setState({ typeId: type.id });
        this.props.callbackFromParent(legal_entity, type.id);
    }

    myCallbackDOB = (dataFromChild) => {
        const { legal_entity, typeId } = this.state;
        legal_entity['dob'] = { ...legal_entity['dob'], ...dataFromChild };
        this.setState({ legal_entity });
        this.props.callbackFromParent(legal_entity, typeId);
    }

    myCallbackAddress = (dataFromChild) => {
        const { legal_entity, typeId } = this.state;
        legal_entity['address'] = { ...legal_entity['address'], ...dataFromChild };
        this.setState({ legal_entity });
        this.props.callbackFromParent(legal_entity, typeId);
    }

    myCallbackPersonalAddress = (dataFromChild) => {
        const { legal_entity, typeId } = this.state;
        legal_entity['personal_address'] = { ...legal_entity['personal_address'], ...dataFromChild };
        this.setState({ legal_entity });
        this.props.callbackFromParent(legal_entity, typeId);
    }

    handleChange = (field, event) => {
        const { legal_entity, typeId } = this.state;
        const { target: { value } } = event;
        legal_entity[field] = value;
        this.setState({ legal_entity });
        this.props.callbackFromParent(legal_entity, typeId);
    }

    render() {
        const { accFields } = this.props;

        return (
            <Row form>
                <Col md={4}>
                    <AllAccTypesWithData onSelectType={this.handleType}/>
                </Col>
                {[].concat(accFields).sort((a, b) => a.id - b.id).map(this.renderAccFields)}
            </Row>
        );
    }

    renderAccFields = (accFields) => {

        const { legal_entity } = this.state;

        return (
            <Col md={12} key={accFields.id}>
                <Row form>
                    { accFields.fieldName === "first_name" ?
                    <Col md={6}>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input type="text" name='first_name' id='first_name' placeholder="First Name" value={legal_entity.first_name} onChange={this.handleChange.bind(this, `first_name`)} />
                        </FormGroup>
                    </Col> : ''
                    }
                    { accFields.fieldName === "last_name" ?
                    <Col md={6}>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input type="text" name='last_name' id='last_name' placeholder="Last Name" value={legal_entity.last_name} onChange={this.handleChange.bind(this, `last_name`)} />
                        </FormGroup>
                    </Col> : ''
                    }
                </Row>
                <Row form>
                    { accFields.fieldName === "business_name" ?
                    <Col md={6}>
                        <FormGroup>
                            <Label for="business_name">Business Name</Label>
                            <Input type="text" name='business_name' id='business_name' placeholder="Business Name" value={legal_entity.business_name} onChange={this.handleChange.bind(this, `business_name`)} />
                        </FormGroup>
                    </Col> : ''
                    }
                    { accFields.fieldName === "business_tax_id" ?
                    <Col md={6}>
                        <FormGroup>
                            <Label for="business_tax_id">Business Tax Id</Label>
                            <Input type="text" name='business_tax_id' id='business_tax_id' placeholder="Business Tax Id" value={legal_entity.business_tax_id} onChange={this.handleChange.bind(this, `business_tax_id`)} />
                        </FormGroup>
                    </Col> : ''
                    }
                </Row>
                <Row form>
                    { accFields.fieldName === "ssn_last_4" ?
                    <Col md={6}>
                        <FormGroup>
                            <Label for="ssn_last_4">SSN Last 4</Label>
                            <Input type="text" name='ssn_last_4' id='ssn_last_4' placeholder="SSN Last 4" value={legal_entity.ssn_last_4} onChange={this.handleChange.bind(this, `ssn_last_4`)} />
                        </FormGroup>
                    </Col> : ''
                    }
                    { accFields.fieldName === "personal_id_number" ?
                    <Col md={6}>
                        <FormGroup>
                            <Label for="personal_id_number">Personal Id Number</Label>
                            <Input type="text" name='personal_id_number' id='personal_id_number' placeholder="Personal Id Number" value={legal_entity.personal_id_number} onChange={this.handleChange.bind(this, `personal_id_number`)} />
                        </FormGroup>
                    </Col> : ''
                    }
                </Row>
                <Row>
                    { accFields.fieldName === "dob" ?
                    <Col xl={6} lg={6} md={12}>
                        <Card>
                            <CardHeader>D.O.B.</CardHeader>
                            <CardBody>
                                <DOB callbackFromParent={this.myCallbackDOB}/>
                            </CardBody>
                        </Card>
                    </Col> : ''
                    }
                    { accFields.fieldName === "address" ?
                    <Col xl={6} lg={6} md={12}>
                        <Card>
                            <CardHeader>Address</CardHeader>
                            <CardBody>
                                <Address callbackFromParent={this.myCallbackAddress}/>
                            </CardBody>
                        </Card>
                    </Col> : ''
                    }
                    { accFields.fieldName === "personal_address" ?
                    <Col xl={6} lg={6} md={12}>
                        <Card>
                            <CardHeader>Personal Address</CardHeader>
                            <CardBody>
                                <PersonalAddress callbackFromParent={this.myCallbackPersonalAddress}/>
                            </CardBody>
                        </Card>
                    </Col> : ''
                    }
                </Row>
            </Col>
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