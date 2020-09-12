import React, { Component } from 'react';
import { connect } from 'react-redux'
import TopNav from "./TopNav"
import { propsApp, stateApp } from '../interfaces'
import DashboardScreen from './DashboardScreen'
import RecordingsScreen from './RecordingsScreen'
import ProfilesScreen from './ProfilesScreen'
import IdentitiesModal from './IdentitiesModal'
import DetectedImagesModal from './DetectedImagesModal'
import NotificationModal from './NotificationModal'
import LogoutModal from './LogoutModal'
import ChangePasswordModal from './ChangePasswordModal'

import { getUserData } from '../app-redux/actions'


class App extends Component<propsApp, stateApp> {
    constructor(props: propsApp) {
        super(props)
        this.state = {
            selectedScreen: 1,
            identitiesModal: false,
            detectedImagesModal: false,
            notificationModal: false,
            logoutModal: false,
            changePasswordModal: false
        }

        this.setScreen = this.setScreen.bind(this)
        this.toggleIdentitesModal = this.toggleIdentitesModal.bind(this)
        this.toggleDectedImagesMOdal = this.toggleDectedImagesMOdal.bind(this)
        this.toggleNotificationsModal = this.toggleNotificationsModal.bind(this)
        this.toggleLogoutMOdal = this.toggleLogoutMOdal.bind(this)
        this.togglePasswordModal = this.togglePasswordModal.bind(this)

    }

    componentDidMount = () => {
        this.props.getAllData()
    }

    togglePasswordModal(val: boolean) {
        this.setState({ changePasswordModal: val })
    }

    toggleLogoutMOdal(val: boolean) {
        this.setState({ logoutModal: val })
    }

    toggleNotificationsModal(val: boolean) {
        this.setState({ notificationModal: val })
    }

    toggleDectedImagesMOdal(val: boolean) {
        this.setState({ detectedImagesModal: val })
    }

    toggleIdentitesModal(val: boolean) {
        this.setState({ identitiesModal: val })
    }

    setScreen(val: 1 | 2) {
        this.setState({ selectedScreen: val })
    }
    render() {
        return (


            <div style={{ maxWidth: "1700px", margin: 'auto' }}>
                <div className="p-grid p-dir-col">
                    <div className="p-col"><div className="App-header"><TopNav toggle_notifications_modal={this.toggleNotificationsModal}
                        toggle_logout_modal={this.toggleLogoutMOdal}
                        toggle_password_modal={this.togglePasswordModal}
                        toggle_detected_images={this.toggleDectedImagesMOdal}
                        toggle_identites={this.toggleIdentitesModal} changeScreen={this.setScreen} /></div></div>
                    <div className="p-col">
                        {
                            (this.state.selectedScreen === 1) ?
                             <DashboardScreen /> 
                             :
                             (this.state.selectedScreen === 2)?
                                <RecordingsScreen />
                                :
                                <ProfilesScreen/>
                        }
                    </div>

                </div>
                <IdentitiesModal show_modal={this.state.identitiesModal} hide_modal={this.toggleIdentitesModal} />
                <DetectedImagesModal show_modal={this.state.detectedImagesModal} hide_modal={this.toggleDectedImagesMOdal} />
                <NotificationModal show_modal={this.state.notificationModal} hide_modal={this.toggleNotificationsModal} />
                <LogoutModal show_modal={this.state.logoutModal} hide_modal={this.toggleLogoutMOdal} />
                <ChangePasswordModal show_modal={this.state.changePasswordModal} hide_modal={this.togglePasswordModal} />

            </div>







        );
    }
}

const mapStoreToProps = (store) => ({})
const mapDispatchToProps = (dispatch) => ({
    getAllData: () => dispatch(getUserData())
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(App);