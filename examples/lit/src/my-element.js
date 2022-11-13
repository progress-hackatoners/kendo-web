import { LitElement, css, html } from 'lit'
import litLogo from './assets/lit.svg'
import viteLogo from './assets/vite.svg'

import '../../../src/index'

import '@progress/kendo-theme-default'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  createRenderRoot() {
    return this;
  }
  
  static get properties() {
    return {
      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
      buttonSize: { type: String },
      sizes: { type: Array }
    }
  }

  constructor() {
    super()
    this.count = 0
    this.buttonSize = 'small'

    this.sizes = [
      { text: 'Small', value: 'small'},
      { text: 'Medium', value: 'medium'},
      { text: 'Large', value: 'large'}
    ]
  }

  render() {
    return html`
      <div>
          <img src=${viteLogo} class="logo" alt="Vite logo" />
          <img src=${litLogo} class="logo" alt="Lit logo" />
      </div>
      <div class="card" style="width: 200px; margin: 0 auto;">
      <span>Button is ${this.buttonSize}</span>
        <button is="kendo-button" .text="Count is: ${this.count}" .icon="gear" @click=${this._increment} .size=${this.buttonSize}></button>
        <input is="kendo-dropdown-list" .dataSource=${this.sizes} value=${this.buttonSize} @change=${(ev) => {this.buttonSize = ev.target.value}} />
      </div>
    `
  }

  _increment() {
    this.count++
  }
}

window.customElements.define('my-element', MyElement)
