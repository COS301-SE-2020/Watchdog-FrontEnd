import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


class App extends Component{
  constructor(props: any){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
       <StatusBar style="auto" />
     </View>
    )
  }

}


export default App
