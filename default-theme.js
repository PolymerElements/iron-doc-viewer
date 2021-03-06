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
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/typography.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="iron-doc-default-theme">
  <template>
    <style>
      :host, html {
        --iron-doc-accent-color: var(--paper-pink-600);

        --iron-doc-font-body: {
          @apply --paper-font-body1;
        };

        --iron-doc-font-code: {
          @apply --paper-font-code1;
        };

        --iron-doc-title: {
          @apply --paper-font-headline;
        }

        --iron-doc-heading: {
          @apply --paper-font-title;
          font-weight: 400;
        };
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
