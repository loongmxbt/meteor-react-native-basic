"use strict";

import React, {  
  View,
  Text,
  StyleSheet
} from 'react-native';

import Button from './button';

import DDPClient from 'ddp-client';  
let ddpClient = new DDPClient();

import process from './process';

export default React.createClass({  
  getInitialState() {
    return {
      connected: false,
      posts: {}
    }
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) {
        connected = false;
      } else {
        this.makeSubscription();
        this.observePosts();
      }
      this.setState({ connected: connected });
    });
  },

  makeSubscription() {
    ddpClient.subscribe("posts", [], () => {
      this.setState({posts: ddpClient.collections.posts});
    });
  },

  observePosts() {
    let observer = ddpClient.observe("posts");
    observer.added = (id) => {
      this.setState({posts: ddpClient.collections.posts});
    }
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      this.setState({posts: ddpClient.collections.posts});
    }
    observer.removed = (id, oldValue) => {
      this.setState({posts: ddpClient.collections.posts});
    }
  },

  handleIncrement() {
    ddpClient.call('addPost', [], (err, result) => {
      console.log('called function, result: ' + result);
    }, () => {
      this.setState({posts: ddpClient.collections.posts});
    });
  },

  handleDecrement() {
    ddpClient.call('deletePost', [], (err, result) => {
      console.log('called function, result: ' + result);
    }, () => {
      this.setState({posts: ddpClient.collections.posts});
    });
  },

  render() {
    var items = this.state.posts.items || {};
    var count = Object.keys(items).length;  
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Posts: {count}</Text>
          <Button text="Increment" onPress={this.handleIncrement}/>
          <Button text="Decrement" onPress={this.handleDecrement}/>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  center: {
    alignItems: 'center'
  }
});