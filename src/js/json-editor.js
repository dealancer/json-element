import { schema } from './json-schema';
import { LitElement, html, unsafeCSS } from 'lit-element';
import JSONEditor from 'jsoneditor';
const CSS = require('jsoneditor/dist/jsoneditor.min.css').toString();

class JsonEditor extends LitElement {
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

  render() {
    return html`
      <div id="editor"></div>
      <button @click="${this.reflectData}">Apply</button>
      <button @click="${this.showEditor}">Reset</button>
    `;  
  }

  updated() {
    this.showEditor();
  }

  showEditor() {
    var editor = this.shadowRoot.querySelector('#editor');
    if (editor) {
      if (editor.innerHTML.trim() == '') {
        this.editor = new JSONEditor(editor, {
          mode: 'text',
          schema: JsonEditor.schema,
        });
      }
      this.editor.set(this.data);
    }
  }

  reflectData() {
    this.data = this.editor.get();
  }
}

customElements.define('json-editor', JsonEditor);