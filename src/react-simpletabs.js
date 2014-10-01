(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.ReactTabs = factory(root.React);
  }
}(this, function(React) {
/** @jsx React.DOM */
'use strict';

var Tabs = React.createClass({displayName: 'Tabs',
  propTypes: {
    tabActive: React.PropTypes.number,
    onBeforeChange: React.PropTypes.func,
    onAfterChange: React.PropTypes.func
  },
  getDefaultProps: function() {
    return { tabActive: 1 };
  },
  getInitialState: function() {
    return { tabActive: this.props.tabActive };
  },
  render: function() {
    var menuItems = this._getMenuItems();
    var panelsList = this._getPanels();

    return (
      React.DOM.div({className: "tabs"}, 
        menuItems, 
        panelsList
      )
    );
  },
  setActive: function(e) {
    var id = parseInt(e.target.getAttribute('data-tab-id'));
    var onAfterChange = this.props.onAfterChange;
    var onBeforeChange = this.props.onBeforeChange;
    var $selectedPanel = this.refs['tab-panel-' + id];
    var $selectedTabMenu = this.refs['tab-menu-' + id];

    if (onBeforeChange) {
      onBeforeChange(id, $selectedPanel, $selectedTabMenu);
    }

    this.setState({ tabActive: id }, function() {
      if (onAfterChange) {
        onAfterChange(id, $selectedPanel, $selectedTabMenu);
      }
    });

    e.preventDefault();
  },
  _getMenuItems: function() {
    var $menuItems = this.props.children.map(function($panel, index) {
      var ref = 'tab-menu-' + (index + 1);
      var title = $panel.props.title;
      var classes = React.addons.classSet({
        'tabs-menu-item': true,
        'is-active': this.state.tabActive === (index + 1)
      });

      return (
        React.DOM.li({ref: ref, key: index, className: classes}, 
          React.DOM.a({href: "#", 'data-tab-id': index + 1, onClick: this.setActive}, title)
        )
      );
    }.bind(this));

    return (
      React.DOM.nav({className: "tabs-navigation"}, 
        React.DOM.ul({className: "tabs-menu"}, $menuItems)
      )
    );
  },
  _getPanels: function() {
    var $panels = this.props.children.map(function($panel, index) {
      var ref = 'tab-panel-' + (index + 1);
      var classes = React.addons.classSet({
        'tabs-panel': true,
        'is-active': this.state.tabActive === (index + 1)
      });

      return (
        React.DOM.article({ref: ref, key: index, className: classes}, $panel)
      );
    }.bind(this));

    return (
      React.DOM.section({className: "tabs-panels"}, $panels)
    );
  }
});

Tabs.Panel = React.createClass({displayName: 'Panel',
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  render: function() {
    return this.props.children;
  }
});

return Tabs;
}));
