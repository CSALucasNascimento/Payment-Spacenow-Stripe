import React, { Component } from "react";

export default class AllAccFields extends Component {

    static defaultProps = {
        accFields: []
    }

    renderAccFields = (accFields) => {
        return (
            <tr key={accFields.id}>
                <td>{accFields.fieldName}</td>
                <td>{accFields.fieldLabel}</td>
            </tr>
        );
    }

    render() {
        const { accFields } = this.props;

        return (<table width="100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Label</th>
                </tr>
            </thead>
            <tbody>
                {[].concat(accFields).sort((a, b) => b.id - a.id).map(this.renderAccFields)}
            </tbody>
        </table>);
    }
}