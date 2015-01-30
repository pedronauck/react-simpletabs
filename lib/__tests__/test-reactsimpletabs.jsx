/**
 * @jsx React.DOM
 */

'use strict';

jest.dontMock('../../dist/react-simpletabs.js');

/**
 * Verifies if a given rendered component
 * actually contains all of the props exposed on
 * PropTypes, which seems to be a best pratice.
 * @param  {ReactComponent} renderedComponent
 * @return {bool}
 */
function usedPropsAreInPropTypes (renderedComponent) {
  var propTypes = Object.keys(renderedComponent.constructor.propTypes);

  return !Object.keys(renderedComponent.props).filter(function (elem) {
    return !~propTypes.indexOf(elem);
  }).length;
};

describe('Tabs', function() {
  var React;
  var TU;
  var Tabs;

  beforeEach(function () {
    React = require('react/addons');
    TU = React.addons.TestUtils;
    Tabs = require('../../dist/react-simpletabs.js');
  });

  it('should be sane', function() {
    expect(Tabs).toBeDefined();
  });

  it('should throw if no children pannels passed to Tabs', function() {
    expect(function () {
      TU.renderIntoDocument(<Tabs></Tabs>);
    }).throws;
  });

  it('be renderable if pannels passed to tabs', function() {
    var instance = TU.renderIntoDocument(
      <Tabs><Tabs.Panel></Tabs.Panel></Tabs>
    );

    expect(TU.isCompositeComponent(instance)).toBe(true);
  });

  it('should instantiate propTypes correctly', function() {
    var instance = TU.renderIntoDocument(
      <Tabs><Tabs.Panel></Tabs.Panel></Tabs>
    );

    expect(!!usedPropsAreInPropTypes(instance)).toBe(true);
  });

  describe('regarding its functionality,', function() {
    it('show only one pannel at a time, multiple tabs', function() {
      var instance = TU.renderIntoDocument(
        <Tabs>
          <Tabs.Panel><h1>1</h1></Tabs.Panel>
          <Tabs.Panel><h1>2</h1></Tabs.Panel>
        </Tabs>
      );

      expect(TU.scryRenderedDOMComponentsWithTag(instance, 'li').length).toEqual(2);
      expect(function () {
        TU.findRenderedDOMComponentWithClass(instance, 'is-active');
      }).not.toThrow;
    });

    it('show the first pannel if no active passed', function() {
      var instance = TU.renderIntoDocument(
        <Tabs>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>
      );

      var menuItem = TU.findRenderedDOMComponentWithClass(instance, 'tabs-menu-item is-active');
      var pannel = TU.findRenderedDOMComponentWithClass(instance, 'tab-panel');

      expect(pannel.getDOMNode().children[0].innerHTML).toEqual('content1');
      expect(menuItem.getDOMNode().children[0].innerHTML).toEqual('item1');
    });

    it('show the second pannel if tabActive == 2', function() {
      var instance = TU.renderIntoDocument(
        <Tabs tabActive={2}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>
      );

      var menuItem = TU.findRenderedDOMComponentWithClass(instance, 'tabs-menu-item is-active');
      var pannel = TU.findRenderedDOMComponentWithClass(instance, 'tab-panel');

      expect(pannel.getDOMNode().children[0].innerHTML).toEqual('content2');
      expect(menuItem.getDOMNode().children[0].innerHTML).toEqual('item2');
    });

    it('changes the tabActive if it receives new props', function(){
      var find = TU.findRenderedDOMComponentWithClass;
      var instance = React.render(
        <Tabs tabActive={2}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>, document.body
      );
      var menuItem = find(instance, 'tabs-menu-item is-active');
      var pannel = find(instance, 'tab-panel');
      expect(pannel.getDOMNode().children[0].innerHTML).toEqual('content2');
      expect(menuItem.getDOMNode().children[0].innerHTML).toEqual('item2');
      instance = React.render(
        <Tabs tabActive={1}>
          <Tabs.Panel title='item1'>content1</Tabs.Panel>
          <Tabs.Panel title='item2'>content2</Tabs.Panel>
        </Tabs>, document.body
      );
      menuItem = find(instance, 'tabs-menu-item is-active');
      pannel = find(instance, 'tab-panel');
      expect(pannel.getDOMNode().children[0].innerHTML).toEqual('content1');
      expect(menuItem.getDOMNode().children[0].innerHTML).toEqual('item1');
    });
  });

});
