/* jshint -W117 */
'use strict';

var React = require('react/addons');

var Tabs = React.createClass({
	getInitialState: function() {
		return {
			tabActive: 1
		}
	},
	setActive: function(e) {
		var id = parseInt(e.target.getAttribute('data-id'));

		this.setState({ tabActive: id });
		e.preventDefault();
	},
	getMenuItems: function() {
		var $menuItems = this.props.children.map(function($panel, index) {
			var title = $panel.props.title;
			var classes = React.addons.classSet({
				'tabs-menu-item': true,
				'is-active': this.state.tabActive === index + 1
			});

			return (
				<li key={index} className={classes}>
					<a href='#' data-id={index + 1} onClick={this.setActive}>{title}</a>
				</li>
			);
		}.bind(this));

		return (
			<nav className='tabs-navigation'>
				<ul className='tabs-menu'>{$menuItems}</ul>
			</nav>
		);
	},
	getPanels: function() {
		var $panels = this.props.children.map(function($panel, index) {
			var classes = React.addons.classSet({
				'tabs-panel': true,
				'is-active': this.state.tabActive === index + 1
			});

			return (
				<article key={index} className={classes}>
					{$panel.props.children}
				</article>
			);
		}.bind(this));

		return (
			<section className='tabs-panels'>{$panels}</section>
		);
	},
	render: function() {
		var menuItems = this.getMenuItems();
		var panelsList = this.getPanels();

		return (
			<div className='tabs'>
				{menuItems}
				{panelsList}
			</div>
		);
	}
});

Tabs.Panel = require('./TabsPanel');
module.exports = Tabs;
