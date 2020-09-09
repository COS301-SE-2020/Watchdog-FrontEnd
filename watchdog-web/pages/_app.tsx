import 'primereact/resources/themes/arya-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '../scss/DashboardScreen.scss'
import '../scss/CameraView.scss';
import '../scss/RecordingsScreen.scss';

import { Provider } from 'react-redux';
import store from '../app-redux/store';

export default function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}