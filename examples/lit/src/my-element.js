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
      count: { type: Number }
    }
  }

  constructor() {
    super()
    this.count = 0
  }

  render() {
    return html`
      <div>
          <img src=${viteLogo} class="logo" alt="Vite logo" />
          <img src=${litLogo} class="logo" alt="Lit logo" />
      </div>
      <slot></slot>
      <div class="card">
        <button is="kendo-button" text="Count is: ${this.count}" icon="gear" @click=${this._increment}></button>
      </div>
    `
  }

  _increment() {
    this.count++
  }
}

window.customElements.define('my-element', MyElement)
