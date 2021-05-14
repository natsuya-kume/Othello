import { Component } from "react";

export interface ISquareComponentProps {
  onClick(): void;
  value: string;
}

// マスを扱うコンポーネント
export class SquareComponent extends Component<ISquareComponentProps, {}> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
