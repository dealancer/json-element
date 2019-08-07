import { schema } from './json-schema';
import { LitElement, html } from 'lit-element';
import Ajv from 'ajv';

class JsonComponent extends LitElement {
  static get schema() {
    return schema();
  }

  static get properties() {
    return {
      data: { type: Object, reflect: true }
    };
  }

  render() {
    var ajv = new Ajv({ useDefaults: true });

    if (!ajv.validate(JsonComponent.schema, this.data)) {
      return html`
        Invalid data!
      `;
    }
  
    return html`
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