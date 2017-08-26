import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    inputValue: "Holy !"
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <View style={styles.container}>
      
        <Text style={styles.paragraph}>
          Journal entry
        </Text>
        
        <View style={styles.box}>
        
          <TextInput
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            style={{ width: 200, height: 44, padding: 8 }}
          />
        
        </View>
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  box: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'skyblue',
    borderWidth: 2,
    borderColor: 'steelblue',
    borderRadius: 20,
  },
});

