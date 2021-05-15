import { Component } from "react";
import { Board } from "./Board";
import { SquareComponent } from "./SquareComponent";

// 受け取るpropsの型を定義
export interface IBoardComponentProps {
  board: Board;
  onClick(x: number, y: number): void;
}

// 盤面を扱うコンポーネント
export class BoardComponent extends Component<IBoardComponentProps, {}> {
  // 正方形を描画する関数
  renderSquare(x: number, y: number) {
    //　下のfor文で回った全ての座標を受け取り、getSquareメソッドで全てのマスの情報を取得
    return (
      <SquareComponent
        value={this.props.board.getSquare(x, y)}
        onClick={() => this.props.onClick(x, y)}
      />
    );
  }

  render() {
    const rows = [];
    // this.props.board.rowNumber=8
    for (let i = 0; i < this.props.board.rowNumber; i++) {
      let columns = [];
      for (let j = 0; j < this.props.board.columnNumber; j++) {
        // jを0~7まで繰り返してcolumnsに追加
        columns.push(<span>{this.renderSquare(j, i)}</span>);
      }
      // 上でできた８つの正方形をrowに追加 これを8回繰り返す
      rows.push(<div className="board-row">{columns}</div>);
    }
    return <div>{rows}</div>;
  }
}
