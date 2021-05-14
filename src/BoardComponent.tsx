import { Component } from "react";
import { Board } from "./Board";
import { SquareComponent } from "./SquareComponent";

export interface IBoardComponentProps {
  board: Board;
  onClick(x: number, y: number): void;
}
// 盤面を扱うコンポーネント

export class BoardComponent extends Component<IBoardComponentProps, {}> {
  // 駒を描画する関数
  renderSquare(x: number, y: number) {
    return (
      <SquareComponent
        value={this.props.board.getSquare(x, y)}
        onClick={() => this.props.onClick(x, y)}
      />
    );
  }

  render() {
    const rows = [];
    for (let i = 0; i < this.props.board.rowNumber; i++) {
      let columns = [];
      for (let j = 0; j < this.props.board.columnNumber; j++) {
        columns.push(<span>{this.renderSquare(j, i)}</span>);
      }
      rows.push(<div className="borad-row">{columns}</div>);
    }
    return <div>{rows}</div>;
  }
}
