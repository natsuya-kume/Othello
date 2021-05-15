import { Component } from "react";

// 受け取るpropsの型を定義
export interface ISquareComponentProps {
  onClick(): void;
  value: string;
}

// マスを扱うコンポーネント
export class SquareComponent extends Component<ISquareComponentProps, {}> {
  render() {
    // console.log(this.props.value);
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
