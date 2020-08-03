import * as React from 'react';
import {
  StyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native';

interface Styles {
    Heading: TextStyle
    Main: ViewStyle
  }

const styles = StyleSheet.create<Styles>({
    Heading: {
        fontSize: 20,
        color : '#fff'
    },
    Main:{
        backgroundColor : 'black',
        flex : 1
    }
  });

  export default styles