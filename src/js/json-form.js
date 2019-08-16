import { LitElement, html, unsafeCSS } from 'lit-element';
import 'brutusin-json-forms';
const CSS = require('brutusin-json-forms/dist/css/brutusin-json-forms.min.css').toString();

class JsonForm extends LitElement {
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

    this.schema = {};
  }

  get schema() {
    return this._schema;
  }

  set schema(schema) {
    this._schema = schema;

    var BrutusinForms = window.brutusin["json-forms"];
    this.bf = BrutusinForms.create(this._schema);

    this.render();
  }

  render() {
    return html`
      <div id="form"></div>
      <br>
      <div>
        <button @click="${this.reflectData}">Apply</button>
        <button @click="${this.showForm}">Reset</button>
      </div>
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