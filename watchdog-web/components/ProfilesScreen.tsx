import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getIdentities } from '../app-redux/actions';
import ProfileAnalyticsChart from './ProfileAnalyticsChart';
import { Panel } from 'primereact/panel';
import { PhotoGallery } from './PhotoGallery';
import { Dialog } from 'primereact/dialog';

// import { getUserData } from '../app-redux/actions'

interface ProfilesScreenProps {
    fetch: Function
    identities: any[]
    loading: boolean
}

interface ProfilesScreenState { 
    activeIndex: number
}

class ProfilesScreen extends Component<ProfilesScreenProps, ProfilesScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0
        }
    }

    componentDidMount = () => { 
        this.props.fetch()
    }

    render() {
        return (
            <div className="">
                <div className="p-grid p-align-stretch">
                    <div className="p-col-7">

                            <Panel
                                header={ <h1>Analytica</h1> }
                                className="p-shadow-8"
                            >
                                <ProfileAnalyticsChart height='60vh' onClickDatapoint={(e) => console.log("HERE"+e)} />
                            </Panel>

                    </div>
                    <div className="p-col-5" style={{ minHeight: '82vh' }}>
                        <PhotoGallery
                            activeIndex={this.state.activeIndex}
                            onUpdateActiveIndex={(e) => this.setState({ activeIndex: e.index })}
                            images={this.props.identities}
                        />
                    </div>
                    {/* <Dialog header="Header" visible={this.state.displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={this.renderFooter('displayMaximizable')} onHide={() => this.onHide('displayMaximizable')}>
                        <p className="p-m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Dialog> */}
                </div>
            </div>

        );
    }
}

const mapStoreToProps = (store) => ({
    identities: store.Data.identities.profiles.map((item, index) => {
        let el = {
            id: item.index,
            name: item.name,
            img: item.path_in_s3,
            monitor: item.monitor,
            img_key: item.key
        }
        return el
    }),
    loading: store.UI.Identities.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(getIdentities())
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(ProfilesScreen);