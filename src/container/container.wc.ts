import {html, css, LitElement} from 'lit';
import {customElement, queryAssignedElements} from 'lit/decorators.js';

import type {Board} from '../board/board.wc';

@customElement('lk-container')
export class Container extends LitElement {
  static styles = css`
    :host {
      contain: content;
    }
    .box {
      border: var(--box-border-width) solid #fc6;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 5px;
    }
    .row {
      display: flex;
      overflow-x: auto;
      gap: 1px;
      background-color: #333;
    }
    .row span {
      font-family: sans-serif;
      font-size: 24px;
      line-height: var(--letter-card-height);
      display: inline-block;
      padding: 10px;
      flex-grow: 1;
      text-align: center;
      cursor: pointer;
      color: #333;
    }
    .row span:hover {
      color: #000;
    }
    .row0 span {
      background-color: #f0f8ff;
    }
    .row1 span {
      background-color: #ffe4b5;
    }
    .row2 span {
      background-color: #f0fff0;
    }
    .row3 span {
      background-color: #fffacd;
    }
    .row4 span {
      background-color: #ffe4e1;
    }
  `;

  @queryAssignedElements({selector: '#board'})
  boards!: Board[];

  letters = [
    ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', '.', ',', '?'],
    ['I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Qu', 'qu'],
    ['R', 'r', 'S', 's', 'ß', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y'],
    ['Z', 'z', 'Ä', 'ä', 'Ö', 'ö', 'Ü', 'ü', 'ai', 'Au', 'au', 'äu', 'Ch', 'ch', 'ck'],
    ['Ei', 'ei', 'Eu', 'eu', 'ie', 'Sch', 'sch', 'Sp', 'sp', 'St', 'st', '!', ' ']
  ];

  render() {
    return html`
      <slot></slot>
      <div class="box">
        ${this.letters.map((row, idx) => {
          return html`
            <div class="row row${idx}">
              ${row.map(letter => html`<span @click=${this.sendLetter(letter)}>${letter}</span>`)}
            </div>
          `;
        })}
      </div>
    `;
  }

  sendLetter(letter: string) {
    return () => {
      console.log(letter);
      this.boards[0]?.addLetter(letter);
    };
  }
}
