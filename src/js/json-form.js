import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { JSON_SCHEMA } from './json-schema';
import 'brutusin-json-forms';

class JsonForm extends LitElement {
  static get schema() {
    return JSON_SCHEMA;
  }

  static get properties() {
    return {
      data: { type: Object, reflect: true }
    };
  }

  static get styles() {
    return unsafeCSS(require('brutusin-json-forms/src/css/brutusin-json-forms.css').toString());
  }

  constructor() {
    super();

    var BrutusinForms = window.brutusin["json-forms"];
    this.bf = BrutusinForms.create(JsonForm.schema);
  }

  render() {
    return html`
      <div id="form"></div>
      <button @click="${this.reflectData}">Apply</button>
      <button @click="${this.showForm}">Reset</button>
    `;  
  }

  updated() {
    this.showForm();
  }

  showForm() {
    var form = this.shadowRoot.querySelector('#form');
    if (form) {
      form.innerHTML = '';
      this.bf.render(form, this.data);
    }
  }

  reflectData() {
    if (this.bf.validate()) {
      this.data = this.bf.getData();
    }
  }
}

customElements.define('json-form', JsonForm);