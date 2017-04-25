import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null
        };
    }
    
    render() {
        return (
            // this.props.onClickで親コンポーネントのクリックイベントハンドラを呼ぶ
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            // 9つの状態を保持する
            squares: Array(9).fill(null),
            // ×、○を交互に入れさせるためのフラグ
            xIsNext: true
        }
    }
    
    handleClick(i) {
        // 現在の配列を直接変更するのではなく、sliceを呼び出してコピーしている
        // 直接データを変更しないことによって、コンポーネントや全体のパフォーマンスを向上させるらしい
        // https://facebook.github.io/react/tutorial/tutorial.html#why-immutability-is-important
        const squares = this.state.squares.slice();
        
        // すでに値がある or 勝負がついている場合はreturnで終わらせる！
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        
        // フラグを確認して値を入れる
        squares[i] = this.state.xIsNext ? '×' : '○';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }
    
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        // 勝敗を確認
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            // 勝負がついていたら、winnerを表示
            status = 'Winner:' + winner;
        } else {
            // 違う時は次のプレイヤーを表示
            status = 'Next player:' + (this.state.xIsNext ? '×' : '◯');
        }
        
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('container')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
