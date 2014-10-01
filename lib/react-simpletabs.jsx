/** @jsx React.DOM */
'use strict';

var Tabs = React.createClass({
  displayName: 'Tabs',
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
      <div className='tabs'>
        {menuItems}
        {panelsList}
      </div>
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
        <li ref={ref} key={index} className={classes}>
          <a href='#' data-tab-id={index + 1} onClick={this.setActive}>{title}</a>
        </li>
      );
    }.bind(this));

    return (
      <nav className='tabs-navigation'>
        <ul className='tabs-menu'>{$menuItems}</ul>
      </nav>
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
        <article ref={ref} key={index} className={classes}>{$panel}</article>
      );
    }.bind(this));

    return (
      <section className='tabs-panels'>{$panels}</section>
    );
  }
});

Tabs.Panel = React.createClass({
  displayName: 'Panel',
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  render: function() {
    return <div>{this.props.children}</div>;
  }
});
