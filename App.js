import React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {send, subscribe} from 'react-native-training-chat-server';
import ReversedFlatList from 'react-native-reversed-flat-list';
import Header from './Header';
import reactToString from 'react-to-string';

const DATE = new Date;
const DATESTRING = DATE.toDateString();
const NAME = 'Me';
const CHANNEL = DATESTRING;
const ME_AVATAR = 'https://i.ytimg.com/vi/Q4ZIKzRSc0s/hqdefault.jpg';
const BOT_AVATAR = 'https://i.ytimg.com/vi/I04OIfbBrTg/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLCAIAqgbtPKAQQS1mHdmefcigLktg';
let prompts = [
  'Write about a missed opportunity you wish you had taken. What could you do differently next time?',
];

export default class App extends React.Component {

  state = {
    typing: "",
    messages: [],
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
      this.setState({messages});
    });
  }

  async sendMessage() {
    //send message with user name but wait until sent to display
    await send({
      channel: CHANNEL,
      sender: NAME,
      message: this.state.typing,
      avatar: ME_AVATAR,
    });

    await send({
      channel: CHANNEL,
      sender: 'Bot',
      message: 'My man!',
      avatar: BOT_AVATAR,
    });

    //clear text input after sent
    this.setState({
      typing: '',
    });
  }

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Image
          style={styles.avatar}
          source={{uri: item.avatar}}
        />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={CHANNEL} />

        <View style={styles.row}>
          <Text style={styles.prompt}>{prompts[0]}</Text>
        </View>

        <ReversedFlatList data={this.state.messages} renderItem={this.renderItem} />

        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              onChangeText={text => this.setState({typing: text})}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Write something here..."
            />
            <TouchableOpacity onPress={this.sendMessage.bind(this)}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  prompt: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    paddingRight: 30,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 30,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
});