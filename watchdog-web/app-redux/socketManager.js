import socketIO from 'socket.io-client'
import { LIVE_SERVER_URL } from './constants'
import { Auth } from 'aws-amplify'
import store from './store';

// const socket = socketIO(LIVE_SERVER_URL, {
//     secure: true,
// })

var SocketManager = (function () {

    // var dispatch = null
    // var user_id = null

    // socket.on('connect', () => {
    //     dispatch({
    //         type: "LIVE_CONNECTED",
    //     })

    //     // socket.emit('authorize', {
    //     //     user_id: user_id,
    //     //     client_type: 'consumer',
    //     //     client_key: 'string'
    //     // })

    //     socket.on('disconnect', () => {
    //         dispatch({
    //             type: 'LIVE_DISCONNECTED'
    //         })
    //     })

    //     socket.on('available-views', (data) => dispatch({
    //         type: "UPDATE_PRODUCERS",
    //         data,
    //         user_id
    //     }))

        // socket.on("consume-frame", (message) => {
        //     console.log("Consuming");
        //     console.log(message);
        //     dispatch({
        //         type: "CONSUME_FRAME",
        //         camera_id: message.camera_id,
        //         frame: message.frame
        //     })
        // })

        // setInterval(() => {
        //     socket.emit('pulse', {})
        //     // console.log('pulse')
        // }, 5)
    // })

    return { // public interface
        init: function (dispatcher) {
            // dispatch = dispatcher
            console.log("DEPRECIATED!! tuneInTOFeed being used");
        },
        connect: function () {
            // console.log("CONNECTING TO LIVE SERVER");
            // socket.connect()
            console.log("DEPRECIATED!! tuneInTOFeed being used");
        },
        disconnect: function () {
            // socket.disconnect()
            console.log("DEPRECIATED!! tuneInTOFeed being used");
        },
        authorise: function () {
            // user_id = store.getState().Data.user_id
            // console.log("AUTHENTICATING " + user_id);
            // socket.emit('authorize', {
            //     user_id: user_id,
            //     client_type: 'consumer',
            //     client_key: 'string'
            // })
            console.log("DEPRECIATED!! tuneInTOFeed being used");
        },
        tuneInToFeed: function (camera_list, site_id, producers) {
            // console.log("Tuning in");
            // console.log(camera_list);
            // console.log(site_id);
            // dispatch({
            //     type: "START_STREAM",
            //     view: { site_id, camera_list, producers }
            // })
            // socket.emit("consume-view", {producers})
            console.log("DEPRECIATED!! tuneInTOFeed being used");
        }
    };
})();

Object.freeze(SocketManager)
export default SocketManager
export const tuneIntoFeed = SocketManager.tuneInToFeed
export const authenticate = SocketManager.authorise