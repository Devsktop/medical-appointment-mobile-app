import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class Loading extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'LoginController')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading esta vaina</Text>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})