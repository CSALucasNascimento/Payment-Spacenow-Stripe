import React, { Component } from "react";
import { Col, FormGroup, Label, Input } from 'reactstrap';

export default class AllAccFields extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }

    static defaultProps = {
        accFields: []
    }

    getInitialState = () => ({});

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    renderAccFields = (accFields) => {
        return (
            <Col md={6} key={accFields.id}>
                <FormGroup>
                    <Label for={accFields.fieldName}>{accFields.fieldLabel}</Label>
                    <Input type="text" name={accFields.fieldName} id={accFields.fieldName} placeholder={accFields.fieldLabel} onChange={this.handleChange.bind(this, `${accFields.fieldName}`)}/>
                </FormGroup>
            </Col>
        );
    }

    render() {
        const { accFields } = this.props;

        return (
            [].concat(accFields).sort((a, b) => a.id - b.id).map(this.renderAccFields)
        );
    }
}