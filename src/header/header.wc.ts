import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('lk-header')
export class Header extends LitElement {
  static styles = css`
    :host {contain: content;}
  `;

  render() {
    return html``;
  }
}
