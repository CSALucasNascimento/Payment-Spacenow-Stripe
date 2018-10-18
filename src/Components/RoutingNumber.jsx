import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class RoutingNumber extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    static defaultProps = {
        accFields: []
    }

    getInitialState = () => ({
        routing_number: {
            field_1: '',
            field_2: ''
        }
    });

    handleChange = (field, event) => {
        const { routing_number } = this.state;
        const { target: { value } } = event;
        routing_number[field] = value;
        this.setState({ routing_number });
        this.props.callbackFromParent(routing_number);
    }

    render() {

        const { accFields } = this.props;
    
        return (
            [].concat(accFields).sort((a, b) => a.id - b.id).map(this.renderAccFields)
        );

    }

    renderAccFields = (accFields) => {

        const { routing_number } = this.state;
        return (
            <Row form key={accFields.id}>
            { accFields.fieldName === "routing_number_field_1" ?
                <Col md={6}>
                    <FormGroup>
                        <Label for="field_1">Field 1</Label>
                        <Input type="text" name='field_1' id='field_1' placeholder="Field 1" value={routing_number.field_1} onChange={this.handleChange.bind(this, `field_1`)} />
                    </FormGroup>
                </Col> : ''
            }
            { accFields.fieldName === "routing_number_field_2" ?
                <Col md={6}>
                    <FormGroup>
                        <Label for="field_2">Field 2</Label>
                        <Input type="text" name='field_2' id='field_2' placeholder="Field 2" value={routing_number.field_2} onChange={this.handleChange.bind(this, `field_2`)} />
                    </FormGroup>
                </Col> : ''
            }
            </Row> 
        )
        
    }
}