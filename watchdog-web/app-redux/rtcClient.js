import socketIO from 'socket.io-client'
import { LIVE_SERVER_URL } from './constants'
import moment from 'moment'
import { Auth } from 'aws-amplify';
import store from './store';
import { SSL_OP_NO_TICKET } from 'constants';


const socket = socketIO(LIVE_SERVER_URL, {
    secure: true,
})

// socket.connect()

function tuneIn(pc, camera_list, dispatch, config) {
    camera_list.forEach((camera_id) => {
        console.log(`tuning into ${camera_id}...`)
        pc[camera_id] = new RTCPeerConnection(config);
        pc[camera_id]['camera_id'] = camera_id;
        dispatch({ type: 'SET_LOADER', camera_id, status: true });
        setTimeout(() => dispatch({ type: 'SET_LOADER', camera_id, status: false }), 30*1000)
        pc[camera_id].addEventListener('track', function (evt) {
            if (evt.track.kind === 'video')
                console.log(evt)
            global[camera_id + "_stream"] = evt.streams[0];
            document.getElementById(camera_id).srcObject = evt.streams[0];
            document.getElementById(camera_id).controls = true;
            document.getElementById(camera_id).style.width = '200';
            // } else {
            //     document.getElementById('audio').srcObject = evt.streams[0];
            // }
            // dispatch({
            // type: 'CONSUME_VIEW',
            // camera_id: evt.currentTarget["camera_id"],
            // frame: 'on'
            // })
        });
        negotiate(pc[camera_id], camera_id, socket)
    })
}

function negotiate(pc, camera_id, socket) {
    console.log('Preparing Negotiation...')
    pc.addTransceiver('video', { direction: 'recvonly' });
    pc.addTransceiver('audio', { direction: 'recvonly' });
    return pc.createOffer().then(function (offer) {
        return pc.setLocalDescription(offer);
    }).then(function () {
        // wait for ICE gathering to complete
        return new Promise(function (resolve) {
            if (pc.iceGatheringState === 'complete') {
                resolve();
            } else {
                function checkState() {
                    if (pc.iceGatheringState === 'complete') {
                        pc.removeEventListener('icegatheringstatechange', checkState);
                        resolve();
                    }
                }
                pc.addEventListener('icegatheringstatechange', checkState);
            }
        });
    }).then(function () {
        var offer = pc.localDescription;

        console.log('Sending negotiate event...')
        socket.emit('negotiate', {
            camera_id,
            offer
        })
    }).catch(function (e) {
        alert(e);
    });
}

const fetch_user_id = () => {
    return new Promise(
        (resolve, reject) => {
            Auth.currentAuthenticatedUser().then((params) => {
                resolve(params.attributes.sub)
            }).catch((err) => {
                reject(err)
            })
        }
    )
}

var SocketManager = (function (store) {

    var dispatch = store.dispatch
    var user_id = null
    var config = {
        sdpSemantics: 'unified-plan',
        iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]

    };
    var pc = {};


    socket.on('connect', () => {
        console.log('connected to server.');
        dispatch({
            type: "LIVE_CONNECTED",
        })

        fetch_user_id().then(user_id => {
            socket.emit('register', {
                user_id
            })
        }).catch((err) => {
            console.log(err);
        })


        socket.on('disconnect', () => {
            console.log('disconnected from server.');
            dispatch({
                type: 'LIVE_DISCONNECTED'
            })
        })

        socket.on('registered', (data) => {
            console.log({ 'registered': data })
        })

        socket.on('camera-available', (data) => {
            console.log('camera-available: ' + data.camera_id)
            dispatch({
                type: 'UPDATE_PRODUCERS',
                user_id,
                'data': [data.camera_id]
            })
            // tuneIn(pc, [data['camera_id']], dispatch, config)
        })

        socket.on('producer-shutdown-camera', (data) => {
            dispatch({
                type: 'REMOVE_PRODUCER',
                camera_id: data['camera_id']
            })
        })

        socket.on('producer-answer', (data) => {
            console.log('producer-answer: ' + data)
            let camera_id = data['camera_id']
            let answer = data['answer']
            if (camera_id in pc) {
                pc[camera_id].setRemoteDescription(answer).then((res) => {
                    console.log('Setting remote description\t' + camera_id + "\t" + res)
                    dispatch({
                        type: 'UPDATE_PRODUCERS',
                        user_id,
                        'data': [data.camera_id]
                    })
                    dispatch({ type: 'SET_LOADER', camera_id, status: false });

                }).catch((err) => {
                    console.log('Setting remote description FAILED!!L\t' + err)
                    dispatch({ type: 'SET_LOADER', camera_id, status: false });
                });
            }
        })

        socket.on('not-registered-error', (data) => {
            console.log({ 'not-registered-error': data });
            fetch_user_id().then(user_id => {
                socket.emit('register', {
                    user_id
                })
            }).catch((err) => {
                console.log(err);
            })
        })

        socket.on('camera-connection-failed', (data) => {
            console.log(`connection failed: ${data}`);
            dispatch({ type: 'SET_LOADER', camera_id: data.camera_id, status: false });
        })

        socket.on('cameras-online', (data) => {
            dispatch({
                type: 'UPDATE_PRODUCERS',
                user_id,
                'data': data['cameras']
            })
        })

        socket.on('camera-offline', (data) => {
            dispatch({
                type: 'REMOVE_PRODUCER',
                camera_id: data.camera_id
            })
        })


    })

    return { // public interface
        init: function (dispatcher) {
            store
        },
        connect: function () {
            console.log("connect...");
            socket.connect()
        },
        disconnect: function () {
            console.log("disconnect...");
            socket.disconnect()
        },
        register: function (user_id) {
            fetch_user_id().then(user_id => {
                socket.emit('register', {
                    user_id
                })
            }).catch((err) => {
                console.log(err);
            })
        },
        fetchOnlineCameras: function () {
            console.log('fetching-online-cameras');
            socket.emit('fetch-online-cameras')
        },
        tuneInToFeed: function (camera_list) {
            tuneIn(pc, camera_list, dispatch, config);
        }
    };
})

// Object.freeze(SocketManager)
export default SocketManager
export const tuneIntoFeed = SocketManager.tuneInToFeed
export const register = SocketManager.register
export const fetchOnlineCameras = SocketManager.fetchOnlineCameras