import React, {Component} from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import DashboardTab from './DashboardTab'
import LiveTab from './LiveTab'
import RecordingsTab from './RecordingsTab'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather, FontAwesome  } from '@expo/vector-icons'
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon  } from '@ui-kitten/components'


const BottomTab = createBottomTabNavigator();
const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );

const camera = (props) => (
<Icon {...props} name='video-outline'/>
);

const film = (props) => (
    <Icon {...props} name='film-outline'/>
  );

  const settings = (props) => (
    <Icon {...props} name='settings-2-outline'/>
  )

  const home = (props) => (
    <Icon {...props} name='home-outline'/>
  )

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Dashboard' icon={home} style={{ height:55,  paddingBottom: 15}} />
    <BottomNavigationTab title='Recordings' icon={film} style={{ height:55,  paddingBottom: 15}}/>
    <BottomNavigationTab title='Live' icon={camera } style={{ height:55,  paddingBottom: 15}}/>
    <BottomNavigationTab title='Settings' icon={settings} style={{ height:55,  paddingBottom: 15}}/>
    
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator  tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Dashboard' component={DashboardTab}  />
    <Screen name='Recordings' component={RecordingsTab}/>
    <Screen name='Live' component={LiveTab}/>
    <Screen name='Settings' component={LiveTab}/>
    
  </Navigator>
);



class TabNavigation extends Component{
    constructor(props: any){
        super(props)
    }

    render(){

        return(           
            <TabNavigator/>
        )
    }
}

export default TabNavigation