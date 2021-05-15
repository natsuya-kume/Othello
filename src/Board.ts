// 盤面を管理するクラスの定義

// アクセス修飾子・・・メンバのアクセス範囲を限定的にすることができる機能
// メンバ・・・クラス内に定義されている変数やメソッドの総称。

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

  // 座標が盤面にあるか判定する
  public inBoard(x: number, y: number): boolean {
    return this.inBoardX(x) && this.inBoardY(y);
  }

  // X座標が盤面内にあるか判定する
  private inBoardX(x: number) {
    return 0 <= x && x < this.columnNumber;
  }

  // Y座標が盤面内にあるか判定する
  private inBoardY(y: number) {
    return 0 <= y && y < this.rowNumber;
  }

  // X座標、Y座標で駒を取得する
  public getSquare(x: number, y: number): string {
    return this.squares[x][y];
  }

  // 指定した座標に駒を設定する
  public setSquare(x: number, y: number, isFirst: boolean): void {
    // ここで返ってくる値に応じて駒を設定
    this.squares[x][y] = Board.getNextPiece(isFirst);
  }

  // 次のコマの値を取得する
  public static getNextPiece(firstIsNext: boolean): string {
    // trueなら"○",falseなら"●"
    return firstIsNext ? "○" : "●";
  }

  // 相手の駒を反転することができるかを判定
  public checkReverse(x: number, y: number, isFirst: boolean): boolean {
    for (let vectorX = -1; vectorX <= 1; vectorX++) {
      for (let vectorY = -1; vectorY <= 1; vectorY++) {
        if (vectorX === 0 && vectorY === 0) {
          continue;
        }
        if (this.checkReverseInternal(x, y, isFirst, vectorX, vectorY)) {
          return true;
        }
      }
    }
    return false;
  }

  // 相手のコマを反転することができるか判定する時の内部処理
  private checkReverseInternal(
    startX: number,
    startY: number,
    isFirst: boolean,
    proceedX: number,
    proceedY: number
  ): boolean {
    // クリックされたマスを除く、周囲のマスの二次元配列の添字を取得する
    let neighbourX = startX + proceedX;
    let neighbourY = startY + proceedY;
    // 周囲のマスが盤面にない時はfalse
    if (!this.inBoard(neighbourX, neighbourY)) {
      return false;
    }
    // isFirst(true or false)に応じて駒を取得
    let nextPiece = Board.getNextPiece(isFirst);
    // 周囲のマスの情報を取得(nullか駒が置かれているか)
    let neighbourPiece = this.getSquare(neighbourX, neighbourY);
    // 周囲のマスに駒が無かった場合　or 周囲のマスにある駒とこれから置く駒の色が同じ場合
    if (!neighbourPiece || neighbourPiece === nextPiece) {
      return false;
    }
    // クリックされたマスから一つ飛ばししたマスの二次元配列の添字を取得する;
    let x = neighbourX + proceedX;
    let y = neighbourY + proceedY;
    // 一つ飛ばししたマスが盤面内にある時は繰り返す;
    while (this.inBoard(x, y)) {
      // そのマスの情報を取得(nullか駒が置かれているか)
      let seekPiece = this.getSquare(x, y);
      // 駒がない場合はfalse
      if (!seekPiece) {
        return false;
      }
      // 一つ飛ばししたマスに駒があってその駒がこれから置く駒と同じ色の場合
      if (seekPiece === nextPiece) {
        return true;
      }
      // その次のマスをチェックするためx,yを更新
      x += proceedX;
      y += proceedY;
    }
    return false;
  }

  // 反転処理の実行
  public executeReverse(x: number, y: number, isFirst: boolean): void {
    // 二重ループでクリックされたマスを中心とする9つのマスを調べる
    for (let vectorX = -1; vectorX <= 1; vectorX++) {
      for (let vectorY = -1; vectorY <= 1; vectorY++) {
        if (vectorX === 0 && vectorY === 0) {
          continue;
        }
        // 相手の駒を反転できる時
        if (this.checkReverseInternal(x, y, isFirst, vectorX, vectorY)) {
          this.executeReverseInternal(x, y, isFirst, vectorX, vectorY);
        }
      }
    }
  }

  private executeReverseInternal(
    startX: number,
    startY: number,
    isFirst: boolean,
    vectorX: number,
    vectorY: number
  ) {
    let x = startX + vectorX;
    let y = startY + vectorY;
    let nextPiece = Board.getNextPiece(isFirst);
    while (this.inBoard(x, y)) {
      let seekPiece = this.getSquare(x, y);
      if (!seekPiece) {
        return;
      }
      if (seekPiece === nextPiece) {
        return;
      }
      this.setSquare(x, y, isFirst);
      x += vectorX;
      y += vectorY;
    }
  }
}
