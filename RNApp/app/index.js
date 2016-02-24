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
      posts: {},
      count: 0
    }
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) connected = false;

      this.setState({ connected: connected });
      this.makeSubscription();
      // this.observePosts();
    });
  },

  makeSubscription() {
    ddpClient.subscribe("posts", [], () => {
      this.setState({posts: ddpClient.collections.posts});
      this.getPostsCount();
    });
  },

  // observePosts() {
  //   let observer = ddpClient.observe("posts");
  //   observer.added = (id) => {
  //     this.setState({posts: ddpClient.collections.posts});
  //     this.getPostsCount();
  //   }
  //   observer.changed = (id, oldFields, clearedFields, newFields) => {
  //     this.setState({posts: ddpClient.collections.posts});
  //     this.getPostsCount();
  //   }
  //   observer.removed = (id, oldValue) => {
  //     this.setState({posts: ddpClient.collections.posts});
  //     this.getPostsCount();
  //   }
  // },

  handleIncrement() {
    ddpClient.call('addPost', [], (err, result) => {
      console.log('called function, result: ' + result);
    }, () => {
      this.getPostsCount();
    });
    
  },

  handleDecrement() {
    ddpClient.call('deletePost', [], (err, result) => {
      console.log('called function, result: ' + result);
    }, () => {
      this.getPostsCount();
    });
  },

  getPostsCount() {
    let items = this.state.posts.items || {};
    this.setState({count: Object.keys(items).length});
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Posts: {this.state.count}</Text>
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