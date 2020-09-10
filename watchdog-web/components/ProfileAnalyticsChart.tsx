import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { getProfileAnalytics } from '../api'
import ProfileAnalyticModals from './ProfileAnalyticModals'
import { Dropdown } from 'primereact/dropdown'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


interface ProfileAnalyticsProps {
    height: any
    onClickDatapoint?: Function
}
interface ProfileAnalyticsState {
    data: any[]
    modal: boolean
    name: string
    img: any[]

}

class ProfileAnalyticsChart extends Component<ProfileAnalyticsProps, ProfileAnalyticsState> {

    constructor(props) {
        super(props)
        this.state = {
            data: [

            ],
            modal: false,
            name: '',
            img: []

        }

        this.onClickDatapoint = this.onClickDatapoint.bind(this)
        this.toggleModal = this.toggleModal.bind(this)

    }

    toggleModal(val) {
        this.setState({ modal: val })

    }

    onClickDatapoint = (e) => {
        //this.props.onClickDatapoint? this.props.onClickDatapoint(e): console.log(e)
        this.setState({ name: e.serieId, img: e.data.images })
        this.toggleModal(true)
        console.log(e)

    }


    componentDidMount = () => {
        getProfileAnalytics('WEEKLY', (e) => {

            this.setState({ data: e.data.data })

        }, () => {

        })

    }

    render() {
        return (
            <div style={{ backgroundColor: 'black', height: this.props.height }}>

                <ProfileAnalyticModals name={this.state.name} img_list={this.state.img} show_modal={this.state.modal} hide_modal={this.toggleModal} />
                <ResponsiveLine
                    onClick={this.onClickDatapoint}
                    data={this.state.data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    curve='linear'
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'nivo' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />

                

            </div>

        )

    }
}

export default ProfileAnalyticsChart;