'use strict';

var React = require('react');
var classNames = require('classnames');

if (process.env.NODE_ENV !== 'test') {
  require('./react-simpletabs.css');
}

var Tabs = React.createClass({
  displayName: 'Tabs',
  propTypes: {
    className: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    tabActive: React.PropTypes.number,
    onMount: React.PropTypes.func,
    onBeforeChange: React.PropTypes.func,
    onAfterChange: React.PropTypes.func,
    children: React.PropTypes.node.isRequired
  },
  getDefaultProps () {
    return { tabActive: 1 };
  },
  getInitialState () {
    return {
      tabActive: this.props.tabActive
    };
  },
  componentDidMount() {
    var index = this.state.tabActive;
    var $selectedPanel = this.refs['tab-panel'];
    var $selectedMenu = this.refs[`tab-menu-${index}`];

    if (this.props.onMount) {
      this.props.onMount(index, $selectedPanel, $selectedMenu);
    }
  },
  componentWillReceiveProps: function(newProps){
    if(newProps.tabActive){ this.setState({tabActive: newProps.tabActive}) }
  },
  render () {
    var className = classNames('tabs', this.props.className);
    return (
      <div className={className}>
        {this._getMenuItems()}
        {this._getSelectedPanel()}
      </div>
    );
  },
  setActive(index, e) {
    e.preventDefault();

    var onAfterChange = this.props.onAfterChange;
    var onBeforeChange = this.props.onBeforeChange;
    var $selectedPanel = this.refs['tab-panel'];
    var $selectedTabMenu = this.refs[`tab-menu-${index}`];

    if (onBeforeChange) {
      var cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
      if(cancel === false){ return }
    }

    this.setState({ tabActive: index }, () => {
      if (onAfterChange) {
        onAfterChange(index, $selectedPanel, $selectedTabMenu);
      }
    });

  },
  _getMenuItems () {
    if (!this.props.children) {
      throw new Error('Tabs must contain at least one Tabs.Panel');
    }

    var $menuItems = React.Children
      .map(this.props.children, ($panel, index) => {
        if (typeof $panel === 'function') {
          $panel = $panel()
        }

        var ref = `tab-menu-${index + 1}`;
        var title = $panel.props.title;

        var classes = classNames(
          'tabs-menu-item',
          this.state.tabActive === (index + 1) && 'is-active'
        );

        return (
          <li ref={ref} key={index} className={classes}>
            <a href='#' onClick={this.setActive.bind(this, index + 1)}>
              {title}
            </a>
          </li>
        );
      });

    return (
      <nav className='tabs-navigation'>
        <ul className='tabs-menu'>{$menuItems}</ul>
      </nav>
    );
  },
  _getSelectedPanel () {
    var index = this.state.tabActive - 1;
    var $panel
    React.Children.forEach(this.props.children, function ($item, i) {
      if (index === i) {
        $panel = $item;
        return;
      }
    })

    return (
      <article ref='tab-panel' className='tab-panel'>
        {$panel}
      </article>
    );
  }
});

Tabs.Panel = React.createClass({
  displayName: 'Panel',
  propTypes: {
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]).isRequired,
    children: React.PropTypes.node.isRequired
  },
  render () {
    return <div>{this.props.children}</div>;
  }
});

module.exports = Tabs;
