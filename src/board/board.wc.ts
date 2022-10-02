import {html, css, LitElement, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('lk-board')
export class Board extends LitElement {
  static styles = css`
    :host {
      contain: content;
      --row-bg: #f5f5f5;
      --input-cursor-color: #aaa;
    }
    .box {
      border: var(--box-border-width) solid #fc6;
      display: flex;
      flex-direction: column;
      gap: var(--gap05);
      padding: var(--gap05);
      margin: 0 0 var(--gap05);
    }
    .row {
      background-color: var(--row-bg);
      height: var(--row-height);
      display: flex;
      align-items: center;
      gap: var(--gap05);
      padding: 0 var(--gap05);
    }
    .row[data-current] {
      outline: 2px dashed #999;
    }
    .row .card {
      display: inline-block;
      font-family: 'ABeeZee', sans-serif;
      font-size: 24px;
      line-height: var(--letter-card-height);
      height: var(--letter-card-height);
      padding: 0 var(--gap05);
      background-color: #fff;
      color: #000;
    }
    .row .card:nth-child(even) {
      color: #33c;
    }
    .row .cursor {
      display: inline-block;
      height: calc(var(--letter-card-height) - 10px);
      width: 1px;
      background-color: var(--input-cursor-color);
      border-width: 5px;
      border-style: solid;
      border-color: var(--input-cursor-color) var(--row-bg);
    }
    .row .pusher {
      flex: 1;
    }
    .row button {
      border: 0;
      background-color: #ffe4e1;
      padding: 3px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  @state() rows = [
    ['T', 'ü', 't', 'e'],
    ['B', 'i', 'b', 'u'],
    ['M', 'i', 'm', 'i'],
    ['M', 'a', 'u', 's']
  ];
  @state() currentRow = 0;

  render() {
    return html`
      <div class="box">
        ${this.rows.map((row, idx) => html`
          <div class="row" ?data-current=${this.currentRow === idx} id="row${idx}" @click=${this.setCurrentRow(idx)}>
            ${this.getRowHtml(idx)}
            ${(this.currentRow === idx) ? this.getRowOpHtml(idx) : nothing}
          </div>
        `)}
      </div>
    `;
  }

  getRowOpHtml(rowIdx: number) {
    return html`
      <i class="cursor"></i>
      <span class="pusher"></span>
      <button @click=${this.clearRow(rowIdx)}>
        <img src="assets/backspace_black_24dp.svg" width="24" height="24" />
      </button>
    `;
  }

  getRowHtml(rowIdx: number) {
    const letterArray = this.rows[rowIdx];
    if (Array.isArray(letterArray)) {
      return letterArray.map((letter, idx) => html`
        <span class="card" @click=${this.removeLetter(rowIdx, idx)}>${letter}</span>
      `);
    }
  }

  setCurrentRow(idx: number) {
    return () => {
      this.currentRow = idx;
    };
  }

  removeLetter(rowIdx: number, colIdx: number) {
    return () => {
      const newRows = this.rows.slice();
      newRows[rowIdx].splice(colIdx, 1);
      this.rows = newRows;
    };
  }

  addLetter(letter: string) {
    const newRows = this.rows.slice();
    newRows[this.currentRow].push(letter); // add to the last pos.
    this.rows = newRows;
  }

  clearRow(rowIdx: number) {
    return () => {
      const newRows = this.rows.slice();
      newRows[rowIdx] = []; // clear the row;
      this.rows = newRows;
    };
  }
}
