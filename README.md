[![Build status](https://travis-ci.org/PolymerElements/iron-doc-viewer.svg?branch=master)](https://travis-ci.org/PolymerElements/iron-doc-viewer)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://beta.webcomponents.org/element/PolymerElements/iron-doc-viewer)

## &lt;iron-doc-viewer&gt;

`iron-doc-viewer` renders documentation about elements, mixins, classes, and
more from a JSON descriptor output by
[Polymer Analyzer](https://github.com/Polymer/polymer-analyzer).

Provide the descriptor as a data binding to `descriptor`:

```html
<iron-doc-viewer descriptor="[[descriptor]]"></iron-doc-viewer>
```

`iron-doc-viewer` will initially display all items contained in the given
descriptor (e.g. elements, mixins, classes). `path` is used to display detail
about specific items within the descriptor (e.g. "/elements/my-component"), and
by default is bound to the current `window.location` path.
