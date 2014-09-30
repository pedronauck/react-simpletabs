/* jshint -W117 */
'use strict';

var React = require('react');
var Tabs = require('./components/Tabs');

var App = React.createClass({
  render: function() {
    return (
      <Tabs>
        <Tabs.Panel title='Tab #1'>
          <h2>Hello World 1</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #2'>
          <h2>Hello World 2</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #3'>
          <h2>Hello World 3</h2>
        </Tabs.Panel>
      </Tabs>
    );
  }
});

React.renderComponent(
	<App />,
	document.getElementById('tabs')
);
