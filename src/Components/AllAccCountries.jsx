import React, { Component } from "react";

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
            <option key={accCountries.id} value={accCountries.id}>{accCountries.country}</option>
        );
    }

    render() {
        const { accCountries } = this.props;
        return (
            <div>
                <label>Country
                    <select
                        onChange={this.handleChange}
                    >
                    {[].concat(accCountries).sort((a, b) => b.id - a.id).map(this.renderAccCountries)}
                    </select>
                </label>
            </div>
        )
    }
}