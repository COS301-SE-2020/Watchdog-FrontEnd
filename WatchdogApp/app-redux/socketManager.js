import socketIO from 'socket.io-client'
import LIVE_SERVER_URL from './constants'

const socket = socketIO('http://192.168.0.192:8080', {
    transports: ['websocket'], jsonp: false
})

var SocketManager = (function () {

    var dispatch = null

    socket.on('connect', () => {
        dispatch({
            type: "LIVE_CONNECTED"
        })

        socket.emit('authorize', {
            user_id: 'dcdaeb64-e23f-46d1-84f7-dd8d1f1a8847',
            client_type: 'consumer',
            client_key: 'string'
        })

        socket.on('disconnect', () => {
            dispatch({
                type: 'LIVE_DISCONNECTED'
            })
        })

        socket.on('available-views', (data) => dispatch({
            type: "UPDATE_PRODUCERS",
            data
        }))

        socket.on("consume-frame", (message) => dispatch({
            type: "CONSUME_FRAME",
            frame: message.frame
        }))
    })

    return { // public interface
        init: function (dispatcher) {
            dispatch = dispatcher
        },
        connect: function () {
            socket.connect()
        },
        disconnect: function () {
            socket.disconnect()
        },
        tuneInToFeed: function (camera_list, site_id) {
            dispatch({
                type: "START_STREAM",
                view: { site_id, camera_list }
            })
            socket.emit("consume-view", { "camera_list": camera_list, "producer_id": site_id })
        }
    };
})();

Object.freeze(SocketManager)
export default SocketManager