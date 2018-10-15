import React, { Component } from "react";

export default class AllAccsCountry extends Component {

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }

    static defaultProps = {
        accsCountry: []
    }

    handleChange = (event) => {
        this.setState({ accCountryFieldsId: event.target.value });
    }

    renderAccsCountry = (accsCountry) => {
        const accCountryFieldsId = this.props.accCountryFieldsId;
        return (
            <tr key={accsCountry.id}>
                <td>{accsCountry.type}</td>
                <td>{accsCountry.country}</td>
                <td>{accsCountry.enabled}</td>
                <td><input value={accCountryFieldsId} onChange={this.handleChange} /></td>
            </tr>
        );
    }

    render() {
        const { accsCountry } = this.props;

        return (<table width="100%">
            <thead>
                <tr>
                    <th>type</th>
                    <th>country</th>
                    <th>enabled</th>
                    <th>CHANGE</th>
                </tr>
            </thead>
            <tbody>
                {[].concat(accsCountry).sort((a, b) => b.id - a.id).map(this.renderAccsCountry)}
            </tbody>
        </table>);
    }
}