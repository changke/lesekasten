import {html, css, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('lk-board')
export class Board extends LitElement {
  static styles = css`
    :host {
      contain: content;
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
      background-color: #f5f5f5;
      height: var(--row-height);
      display: flex;
      align-items: center;
      gap: var(--gap05);
      padding: 0 var(--gap05);
    }
    .row[data-current] {
      outline: 2px dashed #999;
    }
    .row span {
      display: inline-block;
      font-family: sans-serif;
      font-size: 24px;
      line-height: var(--letter-card-height);
      height: var(--letter-card-height);
      padding: 0 var(--gap05);
      background-color: #fff;
      color: #000;
    }
    .row span:nth-child(even) {
      color: #191970;
    }
  `;

  @state() rows = [
    ['M', 'i', 'm', 'i'],
    ['B', 'i', 'b', 'u'],
    ['T', 'ü', 't', 'e'],
    ['M', 'a', 'u', 's']
  ];
  @state() currentRow = 0;

  render() {
    return html`
      <div class="box">
        ${this.rows.map((row, idx) => html`
          <div class="row" ?data-current=${this.currentRow === idx} id="row${idx}" @click=${this.setCurrentRow(idx)}>
            ${this.getRowHtml(idx)}
          </div>
        `)}
      </div>
    `;
  }

  getRowHtml(rowIdx: number) {
    const letterArray = this.rows[rowIdx];
    if (Array.isArray(letterArray)) {
      return letterArray.map((letter, idx) => html`<span @click=${this.removeLetter(rowIdx, idx)}>${letter}</span>`);
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
}
