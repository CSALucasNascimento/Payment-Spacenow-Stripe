import React, { Component } from "react";

export default class AllAccsCountry extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    static defaultProps = {
        accsCountry: [],
        onChange: () => null
    }

    getInitialState = () => ({
        id: ''
    });

    handleChange = (field, event) => {
    }

    renderAccsCountry = (accsCountry) => {
        return (
            <tr key={accsCountry.id}>
                <td>{accsCountry.type}</td>
                <td>{accsCountry.country}</td>
                <td>{accsCountry.enabled}</td>
                <td><button onClick={this.handleChange.bind(this, accsCountry.id)} >{accsCountry.type} {accsCountry.country}</button></td>
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