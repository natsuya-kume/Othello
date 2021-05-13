// 盤面を管理するクラスの定義

export class Board {
  //クラスの型宣言
  columnNumber: number;
  rowNumber: number;
  //二次元配列
  squares: string[][];

  // Boardからオブジェクトを生成し、初期化する際に実行される特殊な初期化用メソッド
  constructor(columnNumber: number, rowNumber: number) {
    this.columnNumber = columnNumber;
    this.rowNumber = rowNumber;
    this.squares = [];

    for (let i = 0; i < this.columnNumber; i++) {
      // squaresのi番目を配列にしてrowNumberの個数分nullで埋める
      this.squares[i] = Array(rowNumber).fill(null);
    }
    // 開始前の盤面の設定
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        this.setSquare(
          Math.floor(this.columnNumber / 2) - 1 + i,
          Math.floor(rowNumber / 2) - 1 + j,
          i === j
        );
      }
    }
  }
  // メソッドの定義

  // 指定した座標に駒を設定する
  public setSquare(x: number, y: number, isFirst: boolean): void {
    //ここで設定
    this.squares[x][y] = Board.getNextPiece(isFirst);
  }

  public static getNextPiece(firstIsNext: boolean): string {
    //trueなら"○",falseなら"●"
    return firstIsNext ? "○" : "●";
  }
}
