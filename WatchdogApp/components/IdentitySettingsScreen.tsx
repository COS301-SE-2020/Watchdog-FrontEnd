import React, { Component } from 'react';
import { Layout, Button, Card, Divider, Text, List } from '@ui-kitten/components'
import { ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

import { getIdentities } from '../app-redux/actions'
import AddNewIdentityButton from './AddNewIdentityButton'

const test_users = [
    {
        id: 1,
        name: "Luqmaan Badat",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    },
    {
        id: 2,
        name: "Some Name 2",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    }
]

interface user {
    id: number,
    name: string,
    img: string
}

interface propsIdentitySettingsScreen {
    load: Function,
    whitelist: user[],
    loading: boolean
}

interface stateIdentitySettingsScreen {
    users: user[]
}

class IdentitySettingsScreen extends Component<propsIdentitySettingsScreen, stateIdentitySettingsScreen> {

    constructor(props: propsIdentitySettingsScreen) {
        super(props)
        this.state = {
            users: test_users
        }
    }

    componentDidMount = () => {
        console.log("MOUNTED");
        this.props.load()
    }

    render() {
        let renderIdentity = (info) => (
            <Layout>
                <Card status='basic' >
                    <Text category='h5'>{info.item.name}</Text>
                    <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
                    <Layout style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            // style={styles.tinyLogo}
                            style={{
                                width: 300,
                                height: 300,
                                resizeMode: 'stretch'
                            }}
                            source={{
                                uri: info.item.path_in_s3,
                            }}
                        />
                    </Layout>

                    <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
                    <Button appearance='outline' status='danger'>
                        Remove
                        </Button>
                </Card>
                <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
            </Layout>
        )

        return (
            <React.Fragment>
                <Layout style={{ flex: 1, padding: 10 }}>
                    <AddNewIdentityButton />
                    <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
                    <List
                        refreshing={this.props.loading}
                        keyExtractor={(item) => item.index}
                        onRefresh={() => this.props.load()}
                        data={this.props.whitelist}
                        renderItem={renderIdentity}
                    />
                </Layout>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(getIdentities())
})

const mapStoreToProps = (store, ownProps) => ({
    whitelist: store.Data.identities.whitelist,
    loading: store.UI.Identities.loading
})

export default connect(mapStoreToProps, mapDispatchToProps)(IdentitySettingsScreen);