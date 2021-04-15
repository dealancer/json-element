import { unsafeCSS } from 'lit-element';
import SharedStyles from '../../../src/js/shared-styles';
import '../../../src/js/json-form';
import '../../../src/js/json-editor';
import '../css/style.css';
import JEExamle from './je-example';

const COMPONENT_CSS = require('../css/element.css').toString();

/*
 * Load element shared styles and define name of the eleme nt.
 */
SharedStyles.styles = unsafeCSS(COMPONENT_CSS);
customElements.define('jc-example', JEExamle);

/*
 * Ensure schema and data are syncrhonized.
 */
var element = document.getElementById('element');
var form = document.getElementById('form');
var editor = document.getElementById('editor');
form.schema = element.constructor.schema;
form.setAttribute('data', element.getAttribute('data'));
editor.schema = element.constructor.schema;
editor.setAttribute('data', element.getAttribute('data'));

/*
 * Bind element, form, and editor to each other.
 */
var data = form.getAttribute('data');
function updateData() {
  if (element.getAttribute('data') !== data) {
    element.setAttribute('data', data);
  }
  if (form.getAttribute('data') !== data) {
    form.setAttribute('data', data);
  }
  if (editor.getAttribute('data') !== data) {
    editor.setAttribute('data', data);
  }
}
new MutationObserver(function(mutations) {
  data = element.getAttribute('data');
  updateData();
}).observe(element, {
  attributes: true,
  attributeFilter: ['data']
});
new MutationObserver(function(mutations) {
  data = form.getAttribute('data');
  updateData();
}).observe(form, {
  attributes: true,
  attributeFilter: ['data']
});
new MutationObserver(function(mutations) {
  data = editor.getAttribute('data');
  updateData();
}).observe(editor, {
  attributes: true,
  attributeFilter: ['data']
});
