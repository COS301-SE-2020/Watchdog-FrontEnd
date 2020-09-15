import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';

import { connect } from 'react-redux';
import { getSecurityLevel, updateSecurityLevel } from '../app-redux/actions';
import { ProgressBar } from 'primereact/progressbar';


interface SecurityLevelProps {
    fetch: Function
    update: Function
    level: number
    loading: boolean
    updating: boolean
}

interface SecurityLevelState {
    selectedCategory: any
}

const categories = [
    {
        name: 'Disabled',
        key: 0,
        color: 'red',
        description: "Notifications will be switched off for all movement"
        
    },
    {
        name: 'Recognised Only',
        key: 1,
        color: 'lightyellow',
        description: "Intruders will be detected. Add recognised personel in the profile page"
    },
    {
        name: 'Armed',
        key: 2,
        color: 'green',
        description: "Notifications will be sent for all movement"
        
    }
];

class SecurityLevelPanel extends Component<SecurityLevelProps, SecurityLevelState> {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: categories[this.props.level]
        }
    }

    componentDidMount = () => {
        this.props.fetch()
    }

    render() {
        return <Panel className="p-shadow-8" header="System State" style={{ minHeight: '40vh' }}>

            <div style={{ display: (this.props.updating || this.props.loading) ? "block" : "none", padding: 0, margin: 0 }}>
                <ProgressBar style={{ height: '6px', padding: 0, margin: 0, borderRadius: 0 }} mode="indeterminate" />
            </div>

            <div style={{ marginTop: '1rem' }}> </div>

            {
                categories.map((category) => {
                    return (
                        <div key={category.key} className="p-field-radiobutton">


                            <RadioButton
                                style={{}}
                                // inputId={category.key}
                                name="category"
                                value={category}
                                onChange={(e) => this.props.update(e.value.key)}
                                checked={this.props.level == category.key}
                                disabled={this.props.updating || this.props.loading}
                            />
                            <label
                                htmlFor={category.key}
                                style={{ color: category.color }}
                            >
                                {category.name}
                            </label>
                        </div>
                    )
                })
            }
            <Card style={{ color: 'grey', backgroundColor: 'rgba(0, 0, 0, 0.15)', marginTop: '2rem' }}>
                {
                    categories[this.props.level].description
                }
            </Card>

        </Panel>
    }
}

const mapStoreToProps = (store) => ({
    level: parseInt(store.Data.preferences.security_level),
    updating: store.UI.SecurityLevel.updating,
    loading: store.UI.SecurityLevel.updating
})
const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(getSecurityLevel()),
    update: (newlevel) => dispatch(updateSecurityLevel(newlevel))
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(SecurityLevelPanel)