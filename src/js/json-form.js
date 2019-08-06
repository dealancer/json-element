import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { JSON_SCHEMA } from './json-schema';
import 'brutusin-json-forms';

class JsonForm extends LitElement {
  static get schema() {
    return JSON_SCHEMA;
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }

  static get styles() {
    return unsafeCSS(require('brutusin-json-forms/src/css/brutusin-json-forms.css').toString());
  }

  render() {
    var BrutusinForms = window.brutusin["json-forms"];
    var bf = BrutusinForms.create(JsonForm.schema); 

    bf.render(this.shadowRoot, this.data);
  }
}

customElements.define('json-form', JsonForm);