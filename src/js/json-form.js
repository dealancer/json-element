import { schema } from './json-schema';
import { LitElement, html, css, unsafeCSS } from 'lit-element';
import 'brutusin-json-forms';
const CSS = require('brutusin-json-forms/src/css/brutusin-json-forms.css').toString();


class JsonForm extends LitElement {
  static get schema() {
    return schema();
  }

  static get properties() {
    return {
      data: { type: Object, reflect: true }
    };
  }

  static get styles() {
    return unsafeCSS(CSS);
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