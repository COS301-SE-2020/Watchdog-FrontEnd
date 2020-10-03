import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Panel } from 'primereact/panel'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import { MultiSelect } from 'primereact/multiselect';
import moment from 'moment';
import { connect } from 'react-redux';
import { Calendar } from 'primereact/calendar';
var type = [{}];
import { getRecordings } from '../app-redux/actions';
import VideoList from './VideoList'
import { produce } from 'immer';
import { Button } from 'primereact/button'
import { getVideos } from '../api'
import LoadingOverlay from 'react-loading-overlay'
import MoonLoader from 'react-spinners/MoonLoader'
import { Sidebar } from 'primereact/sidebar'

interface RecordingsScreenProps {
    videos: any[]
    locations: object
    loading: boolean
    fetch: Function
}

interface RecordingsScreenState {
    url: string
    pip: boolean
    playing: boolean
    controls: boolean
    light: boolean
    volume: number
    muted: boolean
    played: number
    loaded: number
    duration: number
    playbackRate: number
    loop: boolean
    seeking: boolean
    header: string
    date: any
    timefrom: any
    timeto: any
    selected_rooms: any[]
    rooms: any[]
    type: any[]
    video_data: any[]
    display_data: any[]
    loading: boolean
    visible: boolean
}

type = [
    { label: 'Movement', value: 'Movement' },
    { label: 'Intruder', value: 'Intruder' },
    { label: 'Periodic', value: 'Periodic' },

];
class RecordingsScreen extends Component<RecordingsScreenProps, RecordingsScreenState> {
    state = {
        // url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        url: '',
        pip: false,
        playing: true,
        controls: true,
        light: false,
        volume: 0.0,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false,
        header: '',
        date: null,
        timefrom: null,
        timeto: null,
        selected_rooms: [],
        type: [],
        rooms: [],
        video_data: [],
        display_data: [],
        loading: false,
        visible: false
    }
    player: any;

    constructor(props) {
        super(props);
        this.handleClearDateFilter = this.handleClearDateFilter.bind(this)
        this.handleChangeDateFilter = this.handleChangeDateFilter.bind(this)
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this)
        this.handleClearStartTime = this.handleClearStartTime.bind(this)
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this)
        this.handleClearEndTime = this.handleClearEndTime.bind(this)
        this.handleChangeVideoType = this.handleChangeVideoType.bind(this)
        this.handleChangeCameraLocation = this.handleChangeCameraLocation.bind(this)
        this.applyFilter = this.applyFilter.bind(this)
        this.getData = this.getData.bind(this)
        this.showFilter = this.showFilter.bind(this)
    }

    applyFilter() {
        let array = this.state.video_data
        array.reverse()
        //console.log(this.state.dateFilter.length)
        if (this.state.date?.length === 2 && this.state.date[1] !== null) {
            //console.log("here")

            array = array.filter((item) => {
                let date = new Date(item.date)
                return this.state.date[0] <= date && date <= this.state.date[1]
            })
        }

        if (this.state.date?.length === 2 && this.state.date[1] === null) {
            //console.log("here")

            array = array.filter((item) => {
                let date = new Date(item.date)
                return this.state.date[0] <= date
            })
        }


        if (this.state.timefrom !== null) {
            this.state.timefrom.setSeconds(0)
            //console.log(this.state.startTimeFilter[0])
            array = array.filter((item) => {
                let date = new Date()
                date.setHours(parseInt(item.time.split(":")[0]), parseInt(item.time.split(":")[1]), 0)
                //console.log(this.state.startTimeFilter[0])
                //console.log(date)
                return this.state.timefrom.getTime() <= date.getTime()
            })
        }

        if (this.state.timeto !== null) {
            this.state.timeto.setSeconds(0)
            //console.log(this.state.startTimeFilter[0])
            array = array.filter((item) => {
                let date = new Date()
                date.setHours(parseInt(item.time.split(":")[0]), parseInt(item.time.split(":")[1]), 0)
                //console.log(this.state.startTimeFilter[0])
                //console.log(date)
                return this.state.timeto.getTime() >= date.getTime()
            })
        }

        if (this.state.type.length !== 0) {
            array = array.filter((item) => {
                return this.state.type.includes(item.type)
            })
        }

        if (this.state.selected_rooms.length !== 0) {
            array = array.filter((item) => {
                return this.state.selected_rooms.includes(item.location)
            })
        }
        //console.log(array)

        this.setState({
            display_data: array
        });


    }

    async getData() {
        this.setState({ loading: true })
        await getVideos((res) => {
            const videos = res.data.data.videos || []
            let locations = []
            let result = videos.map((item, index) => {
                let location = item.location || "Unknown"
                locations.push(location.charAt(0).toUpperCase() + location.slice(1))
                let type = item.tag
                let date = new Date(item.metadata.timestamp * 1000)
                date.setMinutes(date.getMinutes()-120)
                let utcString = date.toUTCString()
                let time = date.toTimeString()
                time = time.split(' ')[0]
                let new_element = {
                    id: index + 1,
                    "date": date.toISOString().slice(0, 10),
                    "time": time.substr(0, 8), //(date.getHours()+2) +":"+date.getMinutes(),
                    "type": type.charAt(0).toUpperCase() + type.slice(1),
                    "location": location.charAt(0).toUpperCase() + location.slice(1),
                    "url": item.path_in_s3
                }
                return new_element
            })

            let unique = [...new Set(locations)];
            let filter = unique.map((item) => {
                let option = {
                    "label": item,
                    "value": item
                }
                return option
            })
            console.log(filter)
            this.setState({ display_data: result, video_data: result, rooms: filter })

        }, (e) => {
            console.log(e)
        })
        this.applyFilter()
        this.setState({ loading: false })
    }

    showFilter() {
        this.setState({ visible: true })
    }

    componentDidMount = () => {
        this.getData()
        //this.props.fetch();
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleStop = () => {
        this.setState({ url: '', playing: false })
    }

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }
    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }
    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }

    ref = player => {
        this.player = player
    }

    handleClearDateFilter() {
        this.setState({
            date: new Date
        }, this.applyFilter);


    }

    handleChangeDateFilter(value) {
        this.setState({
            date: value.value
        }, this.applyFilter);
        console.log(value.value)


    }

    handleChangeStartTime(value) {
        this.setState({ timefrom: value.value }, this.applyFilter)
        console.log(value.value)

    }

    handleClearStartTime() {
        this.setState({ timefrom: [] }, this.applyFilter)
    }

    handleChangeEndTime(value) {
        this.setState({ timeto: value.value }, this.applyFilter)
        console.log(value.value)

    }

    handleClearEndTime() {
        this.setState({ timeto: null }, this.applyFilter)
        console.log(this.state.timeto)
    }

    handleChangeVideoType(e) {
        this.setState({ type: e.value }, this.applyFilter)
        console.log(e.value)
    }

    handleChangeCameraLocation(value, event) {
        this.setState({ selected_rooms: value.value }, this.applyFilter)
        console.log(value.value)

    }


    render() {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner={<MoonLoader color={'#25b3f5'} />}
                style={{ wrapper: { width: '100vw', height: '100vh' } }}

            >
                <div
                    className=""
                >

                    <div className="p-grid p-align-stretch">
                        <div
                            className="p-col-12 p-md-6 p-lg-6 p-align-stretch"
                        // style={{ backgroundColor: 'white', borderStyle: 'dashed' }}
                        >
                            <div className="p-grid">
                                <div className="p-col-12" style={{ minHeight: '50vh' }}>
                                    <Panel
                                        header={
                                            (url == '') ?
                                                <span>Choose a Video to Begin Playing</span>
                                                :
                                                <div style={{ padding: 0, margin: 0 }} className="p-grid p-nogutter p-align-center p-justify-between">
                                                    <div className="p-col-11">{this.state.header}</div>
                                                    <div className="p-col-1">
                                                        <Button style={{ textAlign: 'right', padding: 0, marginTop: 0, marginBottom: 0, color: 'red' }} icon="pi pi-times" className="p-button-rounded p-button-text" onClick={() => this.setState({ url: '' })} />
                                                    </div>
                                                </div>
                                        }

                                        className="video-player p-shadow-8"
                                    >
                                        {
                                            (url == '') ?
                                                <img style={{ height: '43vh', width: '100%' }} src={'static.gif'}></img>
                                                :
                                                <ReactPlayer
                                                    // style={{ display: (url == '') ? 'none' : 'block' }}
                                                    ref={this.ref}
                                                    className='react-player p-shadow-8'
                                                    width='100%'
                                                    height='400px'
                                                    url={this.state.url}
                                                    pip={pip}
                                                    playing={true}
                                                    controls={true}
                                                    light={light}
                                                    loop={loop}
                                                    playbackRate={playbackRate}
                                                    volume={0.0}
                                                    muted={muted}
                                                    onReady={() => console.log('onReady')}
                                                    onStart={() => console.log('onStart')}
                                                    onPlay={this.handlePlay}
                                                    onPause={this.handlePause}
                                                    onBuffer={() => console.log('onBuffer')}
                                                    onSeek={e => console.log('onSeek', e)}
                                                    onEnded={this.handleEnded}
                                                    onError={e => console.log('onError', e)}
                                                    onProgress={this.handleProgress}
                                                    onDuration={this.handleDuration}
                                                />
                                        }
                                    </Panel>

                                </div>


                            </div>
                        </div>
                        <div className="p-col-12 p-md-6 p-lg-6" >
                            <VideoList videos={this.state.display_data} locations={this.state.rooms}
                                onPlay={
                                    (video) => {
                                        console.log(video.url);

                                        this.setState(produce(draft => {
                                            draft.url = video.url
                                            //draft.header = moment.unix(video.metadata.timestamp).format('DD-MM-YYYY hh:mm:ss')
                                        }))
                                    }
                                }
                                filter={this.showFilter}

                                fetch={this.getData}
                            />
                        </div>
                    </div>
                </div>
                <Sidebar visible={this.state.visible} onHide={() => this.setState({ visible: false })}>
                    <div className='p-grid'>
                        <div className="p-field p-col-12  ">
                            <span  ><h4>Select Date</h4></span>
                            <div style={{ alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0px auto', display: 'flex', alignContent: 'center', textAlign: 'center' }} className="p-inputgroup">
                                <Calendar showIcon showButtonBar id="range" value={this.state.date} onChange={this.handleChangeDateFilter} selectionMode="range" readOnlyInput />

                            </div>
                        </div>
                        <div className="p-field p-col-12 ">
                            <span  ><h4>Select Time</h4></span>
                            <div style={{ alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0px auto', display: 'flex', alignContent: 'center', textAlign: 'center' }} className="p-inputgroup">

                                <Calendar showIcon icon={'pi pi-clock'} showButtonBar id="time24" value={this.state.timefrom} onChange={this.handleChangeStartTime} showTime showSeconds timeOnly readOnlyInput />

                                <div style={{ width: '25px', margin: '5px' }}>TO:</div>

                                <Calendar showButtonBar showIcon icon='pi pi-clock' id="time24" value={this.state.timeto} onChange={this.handleChangeEndTime} showTime showSeconds timeOnly readOnlyInput />

                            </div>


                        </div>

                        <div className="p-field p-col-12  ">
                            <span  ><h4>Select Room</h4></span>
                            <div style={{ alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0px auto', display: 'flex', alignContent: 'center', textAlign: 'center' }} className="p-inputgroup">
                                <MultiSelect style={{ width: '185px' }} value={this.state.selected_rooms} options={this.state.rooms} onChange={this.handleChangeCameraLocation} />

                            </div>
                        </div>

                        <div className="p-field p-col-12">
                            <span  ><h4>Select Video Type </h4></span>
                            <div style={{ alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0px auto', display: 'flex', alignContent: 'center', textAlign: 'center' }} className="p-inputgroup">
                                <MultiSelect style={{ width: '185px' }} value={this.state.type} options={type} onChange={this.handleChangeVideoType} />

                            </div>
                        </div>
                    </div>
                </Sidebar>
            </LoadingOverlay>
        );
    }
}

const mapStoreToProps = (store) => ({
    videos: store.Data.videos,
    locations: store.Data.locations,
    loading: store.UI.Recordings.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(getRecordings())
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(RecordingsScreen);