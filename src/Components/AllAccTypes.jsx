import React, { Component } from "react";
import { FormGroup, Label, Input } from 'reactstrap';

export default class AllAccTypes extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    static defaultProps = {
        accTypes: []
    }

    handleChange = (e) => {
        const { accTypes } = this.props;
        const type = accTypes[e.target.value - 1];
        this.props.onSelectType(type);
    }
    

    renderAccTypes = (accTypes) => {
        return (
            <option key={accTypes.id} value={accTypes.id}>{accTypes.description}</option>
        );
    }

    render() {
        const { accTypes } = this.props;
        return (
            <FormGroup>
                <Label for="type">Type</Label>
                <Input type="select" id="type" name="type" onChange={this.handleChange} >
                    {[].concat(accTypes).sort((a, b) => a.id - b.id).map(this.renderAccTypes)}
                </Input>
            </FormGroup>
        )
    }
}