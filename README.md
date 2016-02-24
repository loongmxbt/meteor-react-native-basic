# Meteor React Native 示例应用

## 说明
实现了React Native -> Meteor 的 Posts 实时同步计数

## 常见问题

1. babel
rm node_modules/react-deep-force-update/.babelrc

2. process.nextTick is not a function
http://stackoverflow.com/questions/34845760/process-nexttick-is-not-a-function-react-native-ddp-meteor
https://github.com/spencercarli/meteor-todos-react-native/blob/master/ReactNativeTodos/app/config/db/lib/process.polyfill.js

3. 操作 Meteor App，React Native App 没有实时更新
可能与node-ddp包的observe有关，如何与React的组件生命周期联合使用，从而达到双向实时绑定呢？