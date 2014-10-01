/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  render: function() {
    return this.props.children;
  }
});
