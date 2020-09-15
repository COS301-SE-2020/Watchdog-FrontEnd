import React, { Component } from 'react';
import { connect } from 'react-redux'
import Identities from './Identities'
import { getIdentities } from '../app-redux/actions';
import ProfileAnalyticsChart from './ProfileAnalyticsChart';
import { Panel } from 'primereact/panel';
import { PhotoGallery } from './PhotoGallery';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import AddIdentityModal from "./AddIdentityModal"
import { Dropdown } from 'primereact/dropdown'

// import { getUserData } from '../app-redux/actions'
import { getProfileAnalytics } from '../api'

interface ProfilesScreenProps {
    fetch: Function
    identities: any[]
    loading: boolean
}

interface ProfilesScreenState {
    activeIndex: number,
    add_identities_modal: boolean
    sort: any

}

class ProfilesScreen extends Component<ProfilesScreenProps, ProfilesScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            add_identities_modal: false,
            sort: { name: 'Weekly', code: 'WEEKLY' }
        }
        this.toggleAddIdentitiesModal = this.toggleAddIdentitiesModal.bind(this)
    }

    toggleAddIdentitiesModal(val: boolean, reload: boolean | null) {
        this.setState({ add_identities_modal: val })
        if (reload) {

            this.toast.show({ severity: 'success', summary: 'Identity Added', detail: 'Identity added to whitelist.', life: 3000 })
            this.setState({ loading: true })

            let currentDate
            const date = Date.now()
            do {
                currentDate = Date.now()
            } while (currentDate - date < 5000)
            this.props.fetch()

        }

    }

    componentDidMount() {
        this.props.fetch()
        // getProfileAnalytics((v)=>{console.log(v)},(v)=>{console.log(v)})
    }

    render() {
        return (
            <div className="">
                <Toast ref={(el) => this.toast = el} />
                <AddIdentityModal hide_modal={this.toggleAddIdentitiesModal} show_modal={this.state.add_identities_modal} />
                <div className="p-grid ">
                    <div className="p-col-12 p-md-12 p-lg-6 ">

                        <Panel


                            header={<div
                                className="p-grid "

                            >
                                <div className="p-col-6" >
                                    <h2>Analytics</h2>

                                </div>
                                <div className="p-col-6" >
                                    <h2>

                                        <Dropdown style={{ testAlign: 'left' }} options={[
                                            { name: 'Weekly', code: 'WEEKLY' },
                                            { name: 'Monthly', code: 'MONTHLY' },
                                            { name: 'Daily', code: 'DAILY' }
                                        ]} value={this.state.sort} optionLabel="name" placeholder="Scale" onChange={(e) => { this.setState({ sort: e.value }) }} />
                                    </h2>
                                </div>
                            </div>}
                            className="p-shadow-8"
                        >

                            <ProfileAnalyticsChart scale={this.state.sort.code} height='68vh' onClickDatapoint={(e) => console.log("HERE" + e)} />
                        </Panel>

                    </div>
                    <div className="p-col-12 p-md-12 p-lg-6" >

                        <Panel
                            header={<h1>Identities</h1>}
                            className="p-shadow-8"
                        >
                            <div className="p-grid ">
                                <div className="p-col-12 p-md-12 p-lg-12 ">
                                    <Identities getData={this.props.fetch} data={this.props.identities} loading={this.props.loading} />
                                </div>
                                <div className="p-col-12 p-md-12 p-lg-12 ">
                                    <Button onClick={() => this.toggleAddIdentitiesModal(true, null)} style={{ width: '100%' }} label="New Identity" className="p-button-raised p-button-info" />
                                </div>
                            </div>
                        </Panel>
                    </div>
                    
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