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
        this.props.onSelectCountry(parseInt(e.target.value, 10));
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