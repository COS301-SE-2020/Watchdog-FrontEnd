import React, { Component } from 'react'
import { StyleSheet, Appearance } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardTab from './DashboardTab'
import LiveTab from './LiveTab'
import RecordingsTab from './RecordingsTab'
import SettingsTab from './SettingsTab'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons'
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import {
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'

const BottomTab = createBottomTabNavigator();
const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const camera = (props) => (
  <Icon {...props} name='video-outline' />
);

const film = (props) => (
  <Icon {...props} name='film-outline' />
);

const settings = (props) => (
  <Icon {...props} name='settings-2-outline' />
)

const home = (props) => (
  <Icon {...props} name='home-outline' />
)

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={{borderTopWidth: 1}}
  >
    <BottomNavigationTab title='Dashboard' icon={home} style={{ marginBottom: 15 }} />
    <BottomNavigationTab title='Recordings' icon={film} style={{ marginBottom: 15 }} />
    <BottomNavigationTab title='Live' icon={camera} style={{ marginBottom: 15 }} />

  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Dashboard' component={DashboardTab} />
    <Screen name='Recordings' component={RecordingsTab} />
    <Screen name='Live' component={LiveTab} />

  </Navigator>
);


interface stateTab {
  theme: any
}
interface propsTab {

}
class TabNavigation extends Component<propsTab, stateTab>{
  constructor(props: any) {
    super(props)
    let colorScheme = Appearance.getColorScheme();
    //console.log(colorScheme)
    this.state = {
      theme: colorScheme
    }

    Appearance.addChangeListener((color) => {
      this.setState({ theme: color.colorScheme })
      //console.log(color.colorScheme)
    })
  }

  render() {

    return (
      <NavigationContainer theme={this.state.theme === 'dark' ? DarkTheme : DefaultTheme}>
        <TabNavigator />
      </NavigationContainer>
    )
  }
}

export default TabNavigation