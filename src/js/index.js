
import { html, render } from 'lit-html';

import './json-component';
import './json-form';

var component = document.getElementById('component');
var form = document.getElementById('form');

form.setAttribute('data', component.getAttribute('data'));

new MutationObserver(function(mutations) {
  component.setAttribute('data', form.getAttribute('data'));
}).observe(form, {
  attributes: true,
  attributeFilter: ['data']
});
