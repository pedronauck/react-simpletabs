# React SimpleTabs

![Travis](http://img.shields.io/travis/pedronauck/react-simpletabs.svg?style=flat) ![license](http://img.shields.io/npm/l/react-simpletabs.svg?style=flat)

[![NPM](https://nodei.co/npm/react-simpletabs.png)](https://nodei.co/npm/react-simpletabs/)

![](http://f.cl.ly/items/25263r432i1W2U3p3b2m/react-simplestabs-screenshot.png)

This is a simple `<Tabs>` component built with ReactJS.

#### See the [Demo](http://embed.plnkr.co/p6YVUK/preview).

## Install

Installing this component is very easy and it has just one dependency: [React](http://facebook.github.io/react/downloads.html). So, you have a lot of options to do that:

- Using NPM *~the quickest way~*
```bash
  $ npm install --save react-simpletabs
```

- Using Bower
```bash
  $ bower install --save react-simpletabs
```

- Or if you want to [download the lastest release](https://github.com/pedronauck/react-simpletabs/archive/v0.0.4.zip) and put in your website, it will work too! :smile_cat:

Then you're done!

## Usage

Using the component is simpler than installing. See an example with [browserify](http://truongtx.me/2014/07/18/using-reactjs-with-browserify-and-gulp/) to bundle your script:

```javascript
/** @jsx React.DOM */

var Tabs = require('react-simpletabs');
var App = React.createClass({
  render: function() {
    return (
      <Tabs>
        <Tabs.Panel title='Tab #1'>
          <h2>Content #1 here</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #2'>
          <h2>Content #2 here</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #3'>
          <h2>Content #3 here</h2>
        </Tabs.Panel>
      </Tabs>
    );
  }
});

React.renderComponent(<App />, mountNode);
```

If you decide to use just Javascript without any module loader, you can get the global variable `window.ReactSimpleTabs` *(or just `ReactSimpleTabs`)*:

```javascript
  /** @jsx React.DOM */

  var Tabs = ReactSimpleTabs;
  var App = React.createClass({
    render: function() {
      ...
    }
  });
```

##### `<Tabs.Panel>`

Well, the `Tabs.Panel` component is a [namespaced component](http://facebook.github.io/react/blog/2014/07/17/react-v0.11.html#jsx) of the `Tabs`, this is easiest way and you avoid to declare a bunch of variables.

**NOTE:** It is required that you put the `title` property to the `Tabs.Panel` component. Without this, the component won't work, ok?

## Behind the Scene

There are some things that you should know about the component. The first one is the structure created inside by the component if you wish to stylize it.

So, the semantic HTML structure will be something like this:

```html
  <div class='tabs'>
    <nav class='tabs-navigation'>
      <ul class='tabs-menu'>
        <li class='tabs-menu-item'>Tab #1</li>
      </ul>
    </nav>
    <section class='tabs-panels'>
      <article class='tabs-panel'>
        The panel content here
      </article>
    </section>
  <div>
```

This is a very simple structure to stylize however you want. So, if you are lost, don't panic, there is a [real functional example](/example) that you can follow.

The other thing that I have to share with you is that the component has some properties that you can use. Example:

If you want to set a default tab active you can use the `tabActive` property:

```javascript
  ...
  render: function() {
    return (
      <Tabs tabActive={2}>
        ...
      </Tabs>
    );
  }
  ...
```

And if you want to do something before or after the changed tab, you can do use the `onBeforeChange` or `onAfterChange` property (or both together):

```javascript
  ...
  handleBefore: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('Something before tab ' + selectedIndex);
  },
  handleAfter: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
    console.log('Something after tab ' + selectedIndex);
  },
  render: function() {
    return (
      <Tabs
        tabActive={2}
        onBeforeChange={this.handleBefore}
        onAfterChange={this.handleAfter}>
        ...
      </Tabs>
    );
  }
  ...
```

For more details, check out the API below.

## Component API

`<Tab>` component:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
tabActive | `Number` | 1 | no | The default tab active
onBeforeChange | `Function` | n/a | no | The function that will be executed **before** the state of the component change
onAfterChange | `Function` | n/a | no | The function that will be executed **after** the state of the component change

`<Tab.Panel>` component:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
title | `String` | n/a | yes | The title that will generate the *tab menu items*

## Contributing

Please, if you see anything wrong you can fix/improve it :ghost:

1. Fork it!
1. Create your feature branch: git checkout -b my-new-feature
1. Commit your changes: git commit -m 'Add some feature'
1. Push to the branch: git push origin my-new-feature
1. Submit a pull request :D

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
