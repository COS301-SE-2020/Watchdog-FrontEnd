import React, { Component } from "react"

import CustomTab from './CustomTab'
import DashBoardLayout from './DashBoardLayout'

interface propsDashboard { }

interface stateDashboard { }


class DashboardTab extends Component<propsDashboard, stateDashboard> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <CustomTab
                title="Dashboard"
                tabContent={
                    <React.Fragment>
                        <DashBoardLayout />
                    </React.Fragment>
                }
            />
        );
    }
}

export default DashboardTab;