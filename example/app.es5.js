'use strict';

var Tabs = ReactSimpleTabs;
var App = React.createClass({
  displayName: 'App',

  onMount: function (selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('on mount, showing tab ' + selectedIndex);
  },
  onBeforeChange: function (selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('before the tab ' + selectedIndex);
  },
  onAfterChange: function (selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('after the tab ' + selectedIndex);
  },
  render: function () {
    return React.createElement(
      Tabs,
      { tabActive: 2, onBeforeChange: this.onBeforeChange, onAfterChange: this.onAfterChange, onMount: this.onMount },
      React.createElement(
        Tabs.Panel,
        { title: 'Tab #1' },
        React.createElement(
          'h2',
          null,
          'Content #1'
        )
      ),
      React.createElement(
        Tabs.Panel,
        { title: 'Tab #2' },
        React.createElement(
          'h2',
          null,
          'Content #2'
        )
      ),
      React.createElement(
        Tabs.Panel,
        { title: 'Tab #3' },
        React.createElement(
          'h2',
          null,
          'Content #3'
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('tabs'));
