import React, { Component } from 'react';
import { Layout, Button, Card, Divider, Text, List, Icon } from '@ui-kitten/components'
import { ScrollView, Image, View } from 'react-native'
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

        const RemoveIcon = (props) => (
            <Icon {...props} name='plus-circle' />
        )

        let renderIdentity = (info) => (
            // <Layout>
            <Card
                // status='basic'
                style={styles.Cards}
                header={
                    (props) => (
                        <View {...props}>
                            <Text style={styles.CardHeading} category='h5'>{info.item.name}</Text>
                        </View>
                    )
                }
                footer={
                    (props) => (
                        <Button
                            appearance='ghost'
                            status='danger'
                            accessoryLeft={RemoveIcon}
                        >
                            Remove
                        </Button>
                    )
                }
            >
                <Image
                    style={{
                        width: '100%',
                        height: 300,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: info.item.path_in_s3,
                    }}
                />
            </Card >
        )

        return (
            <React.Fragment>
                <Layout
                    style={{ flex: 1, padding: 10 }}
                    level='2'
                >
                    <AddNewIdentityButton />
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

const styles = {
    Cards: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        borderRadius: 0,

        elevation: 24,
        margin: 20,
    },
    CardHeading: {
        textAlign: "center",
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