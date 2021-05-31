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
    const winner = this.judgeWinner(this.board);
    let status: string;
    if (winner) {
      status = winner;
    } else {
      status = "Next player:" + Board.getNextPiece(this.state.firstIsNext);
    }
    return (
      <div className="game">
        <div className="game-board">
          <BoardComponent
            board={this.board}
            onClick={(x, y) => this.handleClick(x, y)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
  private judgeWinner(board: Board): string | null {
    // オブジェクト型リテラル　任意の文字列キー(piece)を許容したオブジェクト
    let sumDictionary: { [piece: string]: number } = {};
    for (let x = 0; x < board.columnNumber; x++) {
      for (let y = 0; y < board.rowNumber; y++) {
        // 二重ループで盤面の駒を取得する(valueはか○か●)
        const value = board.getSquare(x, y);
        // 駒の数を管理するif文
        if (value) {
          // sumDictionaryのvalue番目が既に存在する時
          if (sumDictionary[value]) {
            sumDictionary[value] = sumDictionary[value] + 1;
          } else {
            //初めてその駒を取得した時
            sumDictionary[value] = 1;
          }
        }
      }
    }
    console.log(sumDictionary);
    // sumDictionaryオブジェクトのプロパティの名前を配列で取得
    let keys = Object.keys(sumDictionary);
    console.log(keys);
    // ゲームが終わるときの判定　○か●の数が足して64になった時　または 先手も後手も駒をおく場所がない場合
    let isEnd =
      sumDictionary[keys[0]] + sumDictionary[keys[1]] ===
        board.rowNumber * board.columnNumber ||
      (!this.canPlacePiece(true) && !this.canPlacePiece(false));
    if (!isEnd) {
      return null;
    }
    // ○と●の数が同じ時は引き分け
    if (sumDictionary[keys[0]] === sumDictionary[keys[1]]) {
      return "Draw";
    }
    let result = "";
    // keys[0]の方が数が多い場合はtrue
    let isWinnerIndex0 = sumDictionary[keys[0]] > sumDictionary[keys[1]];
    console.log(isWinnerIndex0);
    if (isWinnerIndex0) {
      // sumDictionary[keys[0]]が勝者になる
      result += `Winner:${keys[0]}`;
    } else {
      // sumDictionary[keys[1]]の方が多い場合
      result += `Winner:${keys[1]}`;
    }
    // isWinnerIndex0の結果によってkeysから○か●を取得
    let winnerKey = keys[isWinnerIndex0 ? 0 : 1];
    let loserKey = keys[isWinnerIndex0 ? 1 : 0];
    // 結果を表示
    result += ` [ ${winnerKey} ${sumDictionary[winnerKey]} - ${sumDictionary[loserKey]} ${loserKey} ] `;
    return result;
  }

  // マスがクリックされた時の処理
  private handleClick(x: number, y: number) {
    // console.log(x, y);
    // console.log(this.state.firstIsNext);
    // getSquareメソッドを使用
    if (this.board.getSquare(x, y)) {
      // 値がnullではなく返ってきた場合(駒が設置されていた時)
      alert("既に駒が置かれています");
      return;
    }
    if (!this.board.checkReverse(x, y, this.state.firstIsNext)) {
      alert("相手の駒を返せる位置に駒を置いてください");
      return;
    }
    if (!this.canPlacePiece(this.state.firstIsNext)) {
      alert("置ける場所がないので、手番をスキップします");
      // プレイヤーを変更する
      this.setState({
        firstIsNext: !this.state.firstIsNext,
      });
      return;
    }

    // 反転処理の実行
    this.board.executeReverse(x, y, this.state.firstIsNext);
    // クリックした場所に駒を置く
    this.board.setSquare(x, y, this.state.firstIsNext);
    // 順番の交代
    this.setState({ firstIsNext: !this.state.firstIsNext });
  }

  // 前回：canPlacePiece関数とコメントを追加
  private canPlacePiece(firstIsNext: boolean): boolean {
    for (let i = 0; i < this.board.rowNumber; i++) {
      for (let j = 0; j < this.board.columnNumber; j++) {
        // 駒が置かれている時は除く
        if (this.board.getSquare(i, j)) {
          continue;
        }
        // firstIsNextの値で返せる駒が見つかった時
        if (this.board.checkReverse(i, j, firstIsNext)) {
          return true;
        }
      }
    }
    // 上記for文に該当しない場合はfalseを返す
    return false;
  }
}
