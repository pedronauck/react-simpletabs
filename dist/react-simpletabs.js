/*!
 * 
 *  React Simpletabs - Just a simple tabs component built with React
 *  @version v0.1.0
 *  @link https://github.com/pedronauck/react-simpletabs
 *  @license MIT
 *  @author Pedro Nauck (https://github.com/pedronauck)
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSimpleTabs"] = factory(require("react"));
	else
		root["ReactSimpleTabs"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict';

	var React = __webpack_require__(1);
	var classSet = __webpack_require__(2);

	if (true) {
	  __webpack_require__(3);
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
	  getDefaultProps:function () {
	    return { tabActive: 1 };
	  },
	  getInitialState:function () {
	    return { tabActive: this.props.tabActive };
	  },
	  render:function () {
	    var menuItems = this._getMenuItems();
	    var panelsList = this._getPanels();

	    return (
	      React.DOM.div({className: "tabs"}, 
	        menuItems, 
	        panelsList
	      )
	    );
	  },
	  setActive:function (e) {
	    var id = parseInt(e.target.getAttribute('data-tab-id'));
	    var onAfterChange = this.props.onAfterChange;
	    var onBeforeChange = this.props.onBeforeChange;
	    var $selectedPanel = this.refs['tab-panel-' + id];
	    var $selectedTabMenu = this.refs['tab-menu-' + id];

	    if (onBeforeChange) {
	      onBeforeChange(id, $selectedPanel, $selectedTabMenu);
	    }

	    this.setState({ tabActive: id }, function()  {
	      if (onAfterChange) {
	        onAfterChange(id, $selectedPanel, $selectedTabMenu);
	      }
	    });

	    e.preventDefault();
	  },
	  _getMenuItems:function () {
	    if (!this.props.children) {
	      throw new Error('Tabs must contain at least one Tabs.Panel');
	    }

	    if (!Array.isArray(this.props.children)) {
	      this.props.children = [this.props.children];
	    }

	    var $menuItems = this.props.children.map(function($panel, index)  {
	      var ref = 'tab-menu-${index + 1}';
	      var title = $panel.props.title;
	      var classes = classSet({
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
	  _getPanels:function () {
	    var $panels = this.props.children.map(function($panel, index)  {
	      var ref = 'tab-panel-${index + 1}';
	      var classes = classSet({
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

	Tabs.Panel = React.createClass({
	  displayName: 'Panel',
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    children: React.PropTypes.oneOfType([
	      React.PropTypes.array,
	      React.PropTypes.component
	    ]).isRequired
	  },
	  render:function () {
	    return React.DOM.div(null, this.props.children);
	  }
	});

	module.exports = Tabs;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//**
	 * Produces the same result as React.addons.classSet
	 * @param  {object} classes
	 * @return {string}
	 *
	 * @author Ciro S. Costa <https://github.com/cirocosta>
	 */

	module.exports = function(classes)  {
	  return typeof classes !== 'object' ?
	    Array.prototype.join.call(arguments, ' ') :
	    Object.keys(classes).filter(function(className)  {return classes[className];}).join(' ');
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
