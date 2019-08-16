import { css, unsafeCSS } from 'lit-element';

import SharedStyles from './shared-styles';
import JCExamle from './jc-example';
import './json-form';
import './json-editor';

import '../css/style.css';
const COMPONENT_CSS = require('../css/component.css').toString();


SharedStyles.styles = unsafeCSS(COMPONENT_CSS);
customElements.define('json-component', JCExamle);


var component = document.getElementById('component');

var form = document.getElementById('form');
var editor = document.getElementById('editor');

form.schema = component.constructor.schema;
form.setAttribute('data', component.getAttribute('data'));

editor.schema = component.constructor.schema;
editor.setAttribute('data', component.getAttribute('data'));


new MutationObserver(function(mutations) {
  component.setAttribute('data', form.getAttribute('data'));
  if (editor.getAttribute('data') !== form.getAttribute('data')) {
    editor.setAttribute('data', form.getAttribute('data'));
  }
}).observe(form, {
  attributes: true,
  attributeFilter: ['data']
});

new MutationObserver(function(mutations) {
  component.setAttribute('data', editor.getAttribute('data'));
  if (form.getAttribute('data') !== editor.getAttribute('data')) {
    form.setAttribute('data', editor.getAttribute('data'));
  }
}).observe(editor, {
  attributes: true,
  attributeFilter: ['data']
});
