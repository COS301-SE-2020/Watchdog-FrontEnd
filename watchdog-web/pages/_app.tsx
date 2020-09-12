import 'primereact/resources/themes/arya-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '../scss/DashboardScreen.scss'
import '../scss/CameraView.scss';
import '../scss/RecordingsScreen.scss';
import { Provider } from 'react-redux';

import SocketManager from '../app-redux/socketManager';
import store from '../app-redux/store';
import { useEffect } from 'react'

SocketManager.init(store.dispatch)

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    SocketManager.connect()
    return function disconnect() {
      SocketManager.disconnect()
    }
  })
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}