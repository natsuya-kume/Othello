import { Component } from "react";
import { Board } from "./Board";
import { BoardComponent } from "./BoardComponent";

// オブジェクトの型を宣言
interface GameState {
  firstIsNext: boolean;
}

export default class GameComponent extends Component<{}, GameState> {
  board: Board;
  state: GameState = {
    firstIsNext: true,
  };

  // 初期化メソッド
  constructor(props: {}) {
    // 親クラスの「コンストラクタ」を呼び出すからsuperを書く 親クラスのコンストラクタに子クラスのpropsを渡して、処理を依頼する
    super(props);
    // ボードのインスタンスの作成　8*8の盤面
    this.board = new Board(8, 8);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <BoardComponent
            board={this.board}
            onClick={(x, y) => this.handleClick(x, y)}
          />
        </div>
      </div>
    );
  }

  // マスがクリックされた時の処理
  private handleClick(x: number, y: number) {
    console.log(x, y);
    console.log(this.state.firstIsNext);
    // getSquareメソッドを使用
    if (this.board.getSquare(x, y)) {
      // 値がnullではなく返ってきた場合(駒が設置されていた時)
      alert("既に駒が置かれています");
      return;
    }

    this.board.executeReverse(x, y, this.state.firstIsNext);
    this.board.setSquare(x, y, this.state.firstIsNext);
    this.setState({ firstIsNext: !this.state.firstIsNext });
  }
}
