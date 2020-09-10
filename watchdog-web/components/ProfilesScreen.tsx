import React, { Component } from 'react';
import { connect } from 'react-redux'
import Identities from './Identities';

import { getIdentities } from '../app-redux/actions';

// import { getUserData } from '../app-redux/actions'

interface ProfilesScreenProps {
    fetch: Function
    identities: any[]
    loading: boolean
}

interface ProfilesScreenState {}

class ProfilesScreen extends Component<ProfilesScreenProps, ProfilesScreenState> {
    constructor(props) {
        super(props)
        // this.state = {}
    }

    componentDidMount = () => {}

    render() {
        return (


            <div style={{}}>
                <Identities data={this.props.identities} getData={this.props.fetch} loading={this.props.loading}/>
            </div>







        );
    }
}

const mapStoreToProps = (store) => ({
    identities: store.Data.identities.profiles,
    loading: store.UI.Identities.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(getIdentities())
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(ProfilesScreen);