import React, { Component } from 'react';
import TopNav from "./TopNav"
import { propsApp, stateApp } from '../interfaces'
import { DeferredContent } from 'primereact/deferredcontent'
import DashboardScreen from './DashboardScreen'
import RecordingsScreen from './RecordingsScreen'
class App extends Component<propsApp, stateApp> {
    constructor(props: propsApp) {
        super(props)
        this.state = {
            selectedScreen: 1
        }

        this.setScreen = this.setScreen.bind(this)

    }

    setScreen(val: 1 | 2) {
        this.setState({ selectedScreen: val })
    }
    render() {
        return (


            <div style={{ maxWidth: "1700px", margin: 'auto' }}>
                <div className="p-grid p-dir-col">
                    <div className="p-col"><div className="App-header"><TopNav changeScreen = {this.setScreen} /></div></div>
                    <div className="p-col">{this.state.selectedScreen===1?<DashboardScreen />: <RecordingsScreen />}</div>

                </div>

            </div>







        );
    }
}

export default App;