import React from 'react';
import {
  Text,
} from 'react-native';
const createReactClass = require('create-react-class');

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default createReactClass({
  render() {
    return <ScrollableTabView
      style={{marginTop: 20, }}
      renderTabBar={() => <DefaultTabBar />}
    >
      <Text tabLabel='Tab #1'>My</Text>
      <Text tabLabel='Tab #2'>favorite</Text>
      <Text tabLabel='Tab #3'>project</Text>
    </ScrollableTabView>;
  },
});
