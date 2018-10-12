import React, { Component } from "react";

export default class AllAccsCountry extends Component {

    static defaultProps = {
        accsCountry: []
    }

    renderAccsCountry = (accsCountry) => {
        return (
            <tr key={accsCountry.id}>
                <td>{accsCountry.type}</td>
                <td>{accsCountry.country}</td>
                <td>{accsCountry.enabled}</td>
            </tr>
        );
    }

    render() {
        const { accsCountry } = this.props;
        console.log(accsCountry)

        return (<table width="100%">
            <thead>
                <tr>
                    <th>type</th>
                    <th>country</th>
                    <th>enabled</th>
                </tr>
            </thead>
            <tbody>
                {[].concat(accsCountry).sort((a, b) => b.id - a.id).map(this.renderAccsCountry)}
            </tbody>
        </table>);
    }
}