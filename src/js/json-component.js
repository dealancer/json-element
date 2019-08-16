import { LitElement, css, html } from 'lit-element';
import SharedStyles from './shared-styles'
import Ajv from 'ajv';

class JsonComponent extends LitElement {
  constructor() {
    super();

    this.ajv = new Ajv({ useDefaults: true })
  }

  static get schema() {
    return {};
  }

  static get properties() {
    return {
      data: { type: Object, reflect: true }
    };
  }

  static get styles() {
    return css`${SharedStyles.styles}`;
  }

  isValid() {
    return this.ajv.validate(this.constructor.schema, this.data);
  }
}

export default JsonComponent;