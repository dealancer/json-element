import { unsafeCSS } from 'lit-element';
import SharedStyles from '../../../src/js/shared-styles';
import '../../../src/js/json-form';
import '../../../src/js/json-editor';
import '../css/style.css';
import JEExamle from './je-example';

const COMPONENT_CSS = require('../css/element.css').toString();

/*
 * Load component shared styles and define name of the component.
 */
SharedStyles.styles = unsafeCSS(COMPONENT_CSS);
customElements.define('jc-example', JEExamle);

/*
 * Ensure schema and data are syncrhonized among the components.
 */
var component = document.getElementById('component');
var form = document.getElementById('form');
var editor = document.getElementById('editor');
form.schema = component.constructor.schema;
form.setAttribute('data', component.getAttribute('data'));
editor.schema = component.constructor.schema;
editor.setAttribute('data', component.getAttribute('data'));

/*
 * Bind component, form, and editor to each other.
 */
var data = form.getAttribute('data');
function updateData() {
  if (component.getAttribute('data') !== data) {
    component.setAttribute('data', data);
  }
  if (form.getAttribute('data') !== data) {
    form.setAttribute('data', data);
  }
  if (editor.getAttribute('data') !== data) {
    editor.setAttribute('data', data);
  }
}
new MutationObserver(function(mutations) {
  data = component.getAttribute('data');
  updateData();
}).observe(component, {
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
