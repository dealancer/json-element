import { LitElement, html } from 'lit-element';
import { JSON_SCHEMA } from './json-schema'
import Ajv from 'ajv';

class JsonComponent extends LitElement {
  static get schema() {
    return JSON_SCHEMA;
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }

  render() {
    var ajv = new Ajv({ useDefaults: true });

    if (!ajv.validate(JsonComponent.schema, this.data)) {
      return html`
        <h2>Fruits and veggies</h2>
        Invalid data!
      `;
    }
  
    return html`
      <h2>Fruits and veggies</h2>
      <p>Fruits:</p>
      ${this.data.fruits?
        html`<ul>
          ${this.data.fruits.map(i => html`<li>${i}</li>`)}
        </ul>`:
        html`-`
      }
      <p>Veggies:<p>
      ${this.data.vegetables?
        html`<ul>
          ${this.data.vegetables.map(i => html`<li>${i.veggieName} ${i.veggieLike?html`❤️`:''}</li>`)}
        </ul>`:
        html`-`
      }
    `;
  }
}

customElements.define('json-component', JsonComponent);