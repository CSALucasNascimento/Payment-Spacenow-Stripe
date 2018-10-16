import React, { Component } from "react";

export default class AllAccTypes extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    static defaultProps = {
        accTypes: []
    }

    handleChange = (e) => {
        this.props.onSelectType(parseInt(e.target.value, 10));
    }
    

    renderAccTypes = (accTypes) => {
        return (
            <option key={accTypes.id} value={accTypes.id}>{accTypes.description}</option>
        );
    }

    render() {
        const { accTypes } = this.props;
        return (
            <div>
                <label>Type
                    <select
                        onChange={this.handleChange}
                    >
                    {[].concat(accTypes).sort((a, b) => b.id - a.id).map(this.renderAccTypes)}
                    </select>
                </label>
            </div>
        )
    }
}