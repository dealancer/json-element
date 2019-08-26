import JsonComponent from '../../../src/js/json-component';
import { css, html } from 'lit-element';
import Ajv from 'ajv';

class JCExamle extends JsonComponent {
  static get schema() {
    return {
      "$id": "https://example.com/arrays.schema.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "description": "A representation of a person, company, organization, or place",
      "type": "object",
      "properties": {
        "fruits": {
          "type": "array",
          "items": {
            "type": "string",
          },
          "default": ["default"],
        },
        "vegetables": {
          "type": "array",
          "items": { "$ref": "#/definitions/veggie" }
        }
      },
      "definitions": {
        "veggie": {
          "type": "object",
          "required": [ "veggieName", "veggieLike" ],
          "properties": {
            "veggieName": {
              "type": "string",
              "description": "The name of the vegetable."
            },
            "veggieLike": {
              "type": "boolean",
              "description": "Do I like this vegetable?"
            }
          }
        }
      }
    };
  }

  static get styles() {
    return css`
      ${JsonComponent.styles}

      :host {
        font-weight: bold;
      }
    `;
  }

  render() {
    if (!this.isValid()) {
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

export default JCExamle;
