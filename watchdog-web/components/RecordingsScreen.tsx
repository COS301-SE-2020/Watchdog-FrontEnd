import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Panel } from 'primereact/panel'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

import moment from 'moment';
import { connect } from 'react-redux';

import { getRecordings } from '../app-redux/actions';
import VideoList from './VideoList'
import { produce } from 'immer';
import { Button } from 'primereact/button'

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
}

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
        header: ''
    }
    player: any;

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.fetch();
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

    render() {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
        return (
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
                                                    <Button style={{ textAlign: 'right', padding: 0, marginTop: 0, marginBottom: 0, color: 'red' }} icon="pi pi-times" className="p-button-rounded p-button-text" onClick={() => this.setState({url: ''})} />
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
                                                height='100%'
                                                url={this.state.url}
                                                pip={pip}
                                                playing={false}
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
                            <div className="p-col-12" style={{ minHeight: '30vh' }}>
                                Filters
                            </div>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6" style={{ minHeight: '82vh' }}>
                        <VideoList videos={this.props.videos} locations={this.props.locations}
                            onPlay={
                                (video) => {
                                    console.log(video.path_in_s3);

                                    this.setState(produce(draft => {
                                        draft.url = video.path_in_s3
                                        draft.header = moment.unix(video.metadata.timestamp).format('DD-MM-YYYY hh:mm:ss')
                                    }))
                                }
                            }

                            fetch={this.props.fetch}
                        />
                    </div>
                </div>
            </div>
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