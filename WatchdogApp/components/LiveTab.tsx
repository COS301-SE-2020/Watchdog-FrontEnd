import React, { Component } from "react";
import { Text, Image, StyleSheet } from "react-native";
import CustomTab from "./CustomTab";
import { Layout, List, Card, ViewPager } from "@ui-kitten/components";
import { connect } from 'react-redux'

import { connectToLiveServer, getControlPanel, disconnectFromLiveServer, getOnlineCameras } from '../app-redux/actions'
import SocketManager from '../app-redux/socketManager'

interface LiveTabProps {
    connectToFeedServer: Function
    getCameras: Function
    disconnectToFeedServer: Function
    getOnline: Function
    control_panel: Array<object>
}

interface LiveTabState {
    selectedIndex: number
}


class LiveTab extends Component<LiveTabProps, LiveTabState> {

    constructor(props: any) {
        super(props)

        this.state = {
            selectedIndex: 0
        }
    }

    componentDidMount = () => {
        this.props.getCameras()
    }

    componentWillUnmount = () => {
    }


    render() {


        const renderSite = (item) => {

            const renderLocation = (info) => {
                return <Card
                    style={styles.item}
                    status='basic'
                >
                    <Text>{info.item.location}</Text>
                </Card>
            }

            console.log(item);
            let index = 0
            return <React.Fragment>

                <Layout>
                    <Text>Site {this.state.selectedIndex}</Text>
                    <List
                        data={Object.keys(item).filter((value) => value != 'metadata').map((key) => ({ ...item[key], location: key }))}
                        renderItem={renderLocation}
                    />
                </Layout>
            </React.Fragment>
        }

        const changeSelect = (index) => {
            this.setState({
                selectedIndex: index
            })
        }

        return (
            <CustomTab
                title="Live"
                tabContent={
                    <Layout>
                        <Image style={{ maxHeight: 250 }} source={require('../assets/streaming.png')} />
                        <ViewPager
                            selectedIndex={this.state.selectedIndex}
                            onSelect={changeSelect}
                        >
                            {this.props.control_panel.map(renderSite)}
                        </ViewPager>
                    </Layout>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 0,
        margin: 10
    }
});

const mapStoreToProps = (store, ownProps) => {
    return {
        control_panel: Object.keys(store.Data.control_panel).map((key) => ({ ...store.Data.control_panel[key], site: key }))
    }
}
const mapDispatchToProps = (dispatch) => ({
    connectToFeedServer: () => dispatch(connectToLiveServer()),
    disconnectToFeedServer: () => dispatch(disconnectFromLiveServer()),
    getCameras: () => dispatch(getControlPanel()),
    getOnline: () => dispatch(getOnlineCameras()),
})

export default connect(mapStoreToProps, mapDispatchToProps)(LiveTab)