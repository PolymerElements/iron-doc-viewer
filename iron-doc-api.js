/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import './iron-doc-function.js';
import './iron-doc-hide-bar.js';
import './iron-doc-property.js';
import './iron-doc-viewer-styles.js';

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import {IronDocViewerBehavior} from './iron-doc-viewer-behavior.js';

Polymer({
  _template: html`
    <style include="iron-doc-viewer-styles">
      .checkbox {
        margin-left: 16px;
        cursor: pointer;
        display: flex;
      }

      .checkbox input {
        width: 18px;
        height: 18px;
      }
    </style>

    <section anchor-id$="[[fragmentPrefix]]properties" hidden$="[[!_anyVisible(descriptor.properties)]]">
      <h2>
        <a href$="#[[fragmentPrefix]]properties" class="deeplink">Properties</a>
      </h2>

      <template is="dom-repeat" items="[[_public(descriptor.properties)]]" sort="_compareDescriptors">
        <iron-doc-property descriptor="[[item]]" anchor-id="[[fragmentPrefix]]property-[[item.name]]">
        </iron-doc-property>
      </template>

      <template is="dom-if" if="[[_protectedCount(descriptor.properties)]]">
        <template is="dom-if" if="[[_showProtectedProperties]]">
          <template is="dom-repeat" items="[[_protected(descriptor.properties)]]" sort="_compareDescriptors">
            <iron-doc-property descriptor="[[item]]" anchor-id="[[fragmentPrefix]]property-[[item.name]]">
            </iron-doc-property>
          </template>
        </template>

        <iron-doc-hide-bar visible="{{_showProtectedProperties}}">
          [[_protectedCount(descriptor.properties)]] protected properties
        </iron-doc-hide-bar>
      </template>
    </section>

    <section id="methods" anchor-id$="[[fragmentPrefix]]methods" hidden$="[[!_hasMethods]]">
      <h2>
        <a href$="#[[fragmentPrefix]]methods" class="deeplink">Methods</a>
      </h2>

      <template is="dom-repeat" items="[[_public(descriptor.staticMethods)]]" sort="_compareDescriptors">
        <iron-doc-function descriptor="[[item]]" static anchor-id="[[fragmentPrefix]]staticmethod-[[item.name]]">
        </iron-doc-function>
      </template>

      <template is="dom-repeat" items="[[_public(descriptor.methods)]]" sort="_compareDescriptors">
        <iron-doc-function descriptor="[[item]]" anchor-id="[[fragmentPrefix]]method-[[item.name]]">
        </iron-doc-function>
      </template>

      <template is="dom-if" if="[[_protectedCount(descriptor.methods, _staticMethods)]]">
        <template is="dom-if" if="[[_showProtectedMethods]]">
          <template is="dom-repeat" items="[[_protected(descriptor.staticMethods)]]" sort="_compareDescriptors">
            <iron-doc-function descriptor="[[item]]" static anchor-id="[[fragmentPrefix]]method-[[item.name]]">
            </iron-doc-function>
          </template>

          <template is="dom-repeat" items="[[_protected(descriptor.methods)]]" sort="_compareDescriptors">
            <iron-doc-function descriptor="[[item]]" anchor-id="[[fragmentPrefix]]method-[[item.name]]">
            </iron-doc-function>
          </template>
        </template>

        <iron-doc-hide-bar visible="{{_showProtectedMethods}}">
          [[_protectedCount(descriptor.methods, _staticMethods)]]
          protected methods
        </iron-doc-hide-bar>
      </template>
    </section>

    <section anchor-id$="[[fragmentPrefix]]events" hidden$="[[!_anyVisible(descriptor.events)]]">
      <h2>
        <a href$="#[[fragmentPrefix]]events" class="deeplink">Events</a>
      </h2>

      <template is="dom-repeat" items="[[_public(descriptor.events)]]" sort="_compareDescriptors">
        <iron-doc-property descriptor="[[item]]" anchor-id="[[fragmentPrefix]]event-[[item.name]]">
        </iron-doc-property>
      </template>

      <template is="dom-if" if="[[_protectedCount(descriptor.events)]]">
        <template is="dom-if" if="[[_showProtectedEvents]]">
          <template is="dom-repeat" items="[[_protected(descriptor.events)]]" sort="_compareDescriptors">
            <iron-doc-property descriptor="[[item]]" anchor-id="[[fragmentPrefix]]event-[[item.name]]">
            </iron-doc-property>
          </template>
        </template>

        <iron-doc-hide-bar visible="{{_showProtectedEvents}}">
          [[_protectedCount(descriptor.events)]] protected events
        </iron-doc-hide-bar>
      </template>
    </section>
`,

  is: 'iron-doc-api',
  behaviors: [IronDocViewerBehavior],

  properties: {
    descriptor: Object,

    _showProtectedProperties: Boolean,
    _showProtectedMethods: Boolean,
    _showProtectedEvents: Boolean,

    _staticMethods: {computed: '_computeStaticMethods(descriptor)'},

    _hasMethods: {computed: '_computeHasMethods(descriptor)'},
  },

  _anyVisible: function(items) {
    for (var i = 0; i < (items || []).length; i++) {
      var item = items[i];
      if (!item.privacy || item.privacy === 'public' ||
          item.privacy === 'protected') {
        return true;
      }
    };
    return false;
  },

  _public: function(items) {
    var filtered = [];
    for (var i = 0; i < (items || []).length; i++) {
      var item = items[i];
      if (!item.privacy || item.privacy === 'public') {
        filtered.push(item);
      }
    }
    return filtered;
  },

  _protected: function(items) {
    var filtered = [];
    for (var i = 0; i < (items || []).length; i++) {
      var item = items[i];
      if (item.privacy === 'protected') {
        filtered.push(item);
      }
    }
    return filtered;
  },

  _protectedCount: function(/** arguments */) {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
      sum += this._protected(arguments[i]).length
    }
    return sum;
  },

  _computeStaticMethods: function(descriptor) {
    return descriptor.staticMethods || [];
  },

  _computeHasMethods: function(descriptor) {
    return (descriptor.methods && descriptor.methods.length > 0) ||
        (descriptor.staticMethods && descriptor.staticMethods.length > 0);
  }
});
