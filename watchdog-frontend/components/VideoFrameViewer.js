import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import {Button,ButtonToolbar,Dropdown,Modal}  from 'rsuite'
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;


// import './reset.css'
// import './defaults.css'
// import './range.css'
// import '../public/App.css'
// require('../public/App.css')

// import { version } from '../../package.json'
// import ReactPlayer from '../index'
import ReactPlayer from 'react-player'
import Duration from './Duration'
import { button } from 'aws-amplify'

const MULTIPLE_SOURCES = [
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogv' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm' }
]

class App extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      show: true 
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
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

  renderLoadButton = (url, label) => {
    return (
      <Button onClick={() => this.load(url)}>
        {label}
      </Button>
    )
  }

  ref = player => {
    this.player = player
  }
  constructor(props) {
        super(props);
        this.state = {
          show: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
      }
      close() {
        this.setState({ show: false });
      }
      open() {
        this.setState({ show: true });
      }

  render () {
    
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    const SEPARATOR = ' · '

    return (
        <div>
        <div className="modal-container">
        <ButtonToolbar>
          <Button onClick={()=>this.load('https://www.youtube.com/watch?v=oUFJJNQGwhk')} style={{margin:"10px"}}> Submit </Button>
        </ButtonToolbar>
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title><h1>Playing Recorded Video</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='section'>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={e => console.log('onError', e)}
              
            />
          </div>

          <table >
            
              <tr>
                <th>Controls</th>
                <td>
                  <Button onClick={this.handleStop}>Stop</Button>
                  <Button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</Button>
                  <Button onClick={this.handleClickFullscreen}>Fullscreen</Button>
                  {light &&
                    <Button onClick={() => this.player.showPreview()}>Show preview</Button>}
                  {ReactPlayer.canEnablePIP(url) &&
                    <Button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</Button>}
                </td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>
                  <Button onClick={this.handleSetPlaybackRate} value={1}>1x</Button>
                  <Button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</Button>
                  <Button onClick={this.handleSetPlaybackRate} value={2}>2x</Button>
                </td>
              </tr>
              <tr>
                <th>Seek</th>
                <td>
                  <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='muted'>Muted</label>
                </th>
                <td>
                  <input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='loop'>Loop</label>
                </th>
                <td>
                  <input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} />
                </td>
              </tr>
          </table>
          <div className="Download">
          <Button  appearance='primary'>Download Video Clip</Button>
        </div>
        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Ok
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Table
          virtualized
          height={400}
          data={this.props.data}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={130}>
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column width={130}>
            <HeaderCell>Time</HeaderCell>
            <Cell dataKey="time" />
          </Column>

          <Column width={200}>
            <HeaderCell>Type</HeaderCell>
            <Cell dataKey="type" />
          </Column>

          <Column width={200}>
            <HeaderCell>Camera Location</HeaderCell>
            <Cell dataKey="location" />
          </Column>
        

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell>
            {rowData => {
                return (
                  <span>
                    <a  onClick={()=>this.load(`${rowData.url}`)}> Play </a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
      </div>
    )
  }
}

export default hot(module)(App)