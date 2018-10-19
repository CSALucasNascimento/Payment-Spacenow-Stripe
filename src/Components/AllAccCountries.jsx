import React, { Component } from "react";
import { FormGroup, Label, Input } from 'reactstrap';

export default class AllAccCountries extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    static defaultProps = {
        accCountries: []
    }

    handleChange = (e) => {
        const { accCountries } = this.props;
        const country = accCountries[e.target.value - 1];
        this.props.onSelectCountry(country);
    }

    renderAccCountries = (accCountries) => {
        return (
            <option key={accCountries.id} value={accCountries.id}>{accCountries.longName}</option>
        );
    }

    render() {
        const { accCountries } = this.props;
        return (
            <FormGroup>
                <Label for="country">Country</Label>
               
                    <Input type="select" id="country" name="country"
                        onChange={this.handleChange}
                    >
                    {[].concat(accCountries).sort((a, b) => a.id - b.id).map(this.renderAccCountries)}
                    </Input>
   
            </FormGroup>
        )
    }
}