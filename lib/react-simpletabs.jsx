/** @jsx React.DOM */
'use strict';

var React = require('react');
var classSet = require('../utils/classSet');

if (process.env.NODE_ENV !== 'test') {
  require('./react-simpletabs.styl');
}

var Tabs = React.createClass({
  displayName: 'Tabs',
  propTypes: {
    tabActive: React.PropTypes.number,
    onBeforeChange: React.PropTypes.func,
    onAfterChange: React.PropTypes.func,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.component
    ]).isRequired
  },
  getDefaultProps () {
    return { tabActive: 1 };
  },
  getInitialState () {
    return { tabActive: this.props.tabActive };
  },
  render () {
    var menuItems = this._getMenuItems();
    var panelsList = this._getPanels();

    return (
      <div className='tabs'>
        {menuItems}
        {panelsList}
      </div>
    );
  },
  setActive (e) {
    var id = parseInt(e.target.getAttribute('data-tab-id'));
    var onAfterChange = this.props.onAfterChange;
    var onBeforeChange = this.props.onBeforeChange;
    var $selectedPanel = this.refs['tab-panel-' + id];
    var $selectedTabMenu = this.refs['tab-menu-' + id];

    if (onBeforeChange) {
      onBeforeChange(id, $selectedPanel, $selectedTabMenu);
    }

    this.setState({ tabActive: id }, () => {
      if (onAfterChange) {
        onAfterChange(id, $selectedPanel, $selectedTabMenu);
      }
    });

    e.preventDefault();
  },
  _getMenuItems () {
    if (!this.props.children) {
      throw new Error('Tabs must contain at least one Tabs.Panel');
    }

    if (!Array.isArray(this.props.children)) {
      this.props.children = [this.props.children];
    }

    var $menuItems = this.props.children.map(($panel, index) => {
      var ref = 'tab-menu-${index + 1}';
      var title = $panel.props.title;
      var classes = classSet({
        'tabs-menu-item': true,
        'is-active': this.state.tabActive === (index + 1)
      });

      return (
        <li ref={ref} key={index} className={classes}>
          <a href='#' data-tab-id={index + 1} onClick={this.setActive}>{title}</a>
        </li>
      );
    });

    return (
      <nav className='tabs-navigation'>
        <ul className='tabs-menu'>{$menuItems}</ul>
      </nav>
    );
  },
  _getPanels () {
    var $panels = this.props.children.map(($panel, index) => {
      var ref = 'tab-panel-${index + 1}';
      var classes = classSet({
        'tabs-panel': true,
        'is-active': this.state.tabActive === (index + 1)
      });

      return (
        <article ref={ref} key={index} className={classes}>{$panel}</article>
      );
    });

    return (
      <section className='tabs-panels'>{$panels}</section>
    );
  }
});

Tabs.Panel = React.createClass({
  displayName: 'Panel',
  propTypes: {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.component
    ]).isRequired
  },
  render () {
    return <div>{this.props.children}</div>;
  }
});

module.exports = Tabs;
