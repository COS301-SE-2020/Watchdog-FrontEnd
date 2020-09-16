import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { getProfileAnalytics } from '../api'
import ProfileAnalyticModals from './ProfileAnalyticModals'
import { Dropdown } from 'primereact/dropdown'
import { runInThisContext } from 'vm'
import LoadingOverlay from 'react-loading-overlay'
import MoonLoader from 'react-spinners/MoonLoader'


interface ProfileAnalyticsProps {
    height: any
    onClickDatapoint?: Function
    scale: string
}
interface ProfileAnalyticsState {
    data: any[]
    display_data: any[]
    modal: boolean
    name: string
    img: any[]
    scale: string
    prev_scale: string
    profiles: []
    profiles_display: []
    loading: boolean

}

class ProfileAnalyticsChart extends Component<ProfileAnalyticsProps, ProfileAnalyticsState> {

    constructor(props) {
        super(props)
        this.state = {
            data: [

            ],
            modal: false,
            name: '',
            img: [],
            scale: 'WEEKLY',
            prev_scale: '',
            profiles: [],
            profiles_display: [],
            display_data: [],
            loading: false

        }

        this.onClickDatapoint = this.onClickDatapoint.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.getData = this.getData.bind(this)
        this.applyFilter = this.applyFilter.bind(this)

    }

    toggleModal(val) {
        this.setState({ modal: val })

    }

    onClickDatapoint = (e) => {
        //this.props.onClickDatapoint? this.props.onClickDatapoint(e): console.log(e)
        if (e.data.images.length > 0) {
            this.setState({ name: e.serieId, img: e.data.images })
            this.toggleModal(true)
        }
        console.log(e.data.images.length)

    }

    static getDerivedStateFromProps(props, state) {
        if (state !== null) {
            if (props.scale !== state.scale) {
                console.log(props.scale)
                return ({ scale: props.scale })
            }
        }

    }

    async applyFilter(val) {
        //console.log(val)
        this.setState({loading: true})
        let array = this.state.profiles_display
        if (this.state.profiles_display.includes(val)) {
            //console.log()

            let index = array.indexOf(val)
            array.splice(index, 1)
            console.log(array)
            this.setState({ profiles_display: array })


        } else {

            array.push(val)
            this.setState({ profiles_display: array })
            console.log(array)
        }
        //this.setState({display_data: this.state.data})
        await getProfileAnalytics(this.state.scale, async (e) => {


            await this.setState({ data: e.data.data, prev_scale: this.state.scale })

        }, () => {

        })
        let displayData = this.state.data.map((item) => {
            let toReturn = item
            console.log(toReturn)
            if (!array.includes(item.id)) {
                console.log(item.id)
                toReturn.data = []

            }
            console.log(toReturn)
            return (toReturn)
        })




        this.setState({ display_data: displayData })
        this.setState({loading: false})


    }

    getData() {
        let array = []
        if (this.state.prev_scale !== this.state.scale) {
            getProfileAnalytics(this.state.scale, (e) => {
                console.log(e.data.data)
                e.data.data.forEach(element => {
                    array.push(element.id)


                })

                this.setState({ data: e.data.data, prev_scale: this.state.scale, profiles: array, profiles_display: array, display_data: e.data.data })

            }, () => {

            })
        }
    }

    componentDidUpdate() {
        //this.getData()
    }




    componentDidMount() {
        this.getData()

        // getProfileAnalytics(this.state.scale, (e) => {


        //     this.setState({ data: e.data.data })

        // }, () => {

        // })

    }

    render() {
        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner={<MoonLoader color={'#25b3f5'} />}
                style={{ wrapper: { width: '100vw', height: '100vh' } }}

            >
                <div style={{ height: this.props.height }}>

                    <ProfileAnalyticModals name={this.state.name} img_list={this.state.img} show_modal={this.state.modal} hide_modal={this.toggleModal} />
                    <ResponsiveLine

                        onClick={this.onClickDatapoint}
                        data={this.state.display_data}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        curve='linear'
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Date',
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
                        pointBorderColor={{
                            from: 'serieColor'
                        }}

                        pointLabel="Date"
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                itemTextColor: 'white',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 1,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, 1)',
                                            itemOpacity: 1
                                        }
                                    }
                                ],
                                onClick: (e) => {
                                    this.applyFilter(e.id)
                                    //console.log(e.id)
                                }
                            }
                        ]}
                        isInteractive={true}
                        tooltip={(e) => {

                            return (<span style={{ backgroundColor: e.point.serieColor }} className="p-badge p-badge-warning">{e.point.data.y}</span>)
                        }}
                    />



                </div>
            </LoadingOverlay>

        )

    }
}

export default ProfileAnalyticsChart;