import { LitElement, css, html } from 'lit-element';
import SharedStyles from './shared-styles'
import Ajv from 'ajv';

class JsonElement extends LitElement {
  constructor() {
    super();

    this.ajv = new Ajv({ useDefaults: true })
  }

  static get schema() {
    return {};
  }

  static get properties() {
    return {
      src: { type: String },
      data: { type: Object, reflect: true }
    };
  }

  static get styles() {
    return css`${SharedStyles.styles}`;
  }

  updated(changed) {
    if (changed.has("src")) {
      var self = this;

      fetch(`${this.src}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.data = data;
      });
    }
  }

  isValid() {
    return this.ajv.validate(this.constructor.schema, this.data);
  }
}

export default JsonElement;