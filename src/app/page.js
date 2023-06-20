'use client'

import { useState } from 'react';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    } else {
      squares[i] = isXNext ? 'X' : 'O';
      setSquares(squares);
      setIsXNext(!isXNext);
    }
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        handleOnSquareClick={() => {
          handleClick(i);
        }}
      />
    );
  }

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  function ResetGame() {
    if (!squares.every((x) => x === null)) {
      return (
        <button className='restart-button' onClick={handleReset}>
          Reset!
        </button>
      );
    }
  }

  const winner = calculateWinner(squares);
  let gameOver = false;

  if (squares.every((x) => x !== null)) {
    gameOver = true;
  }

  let status;
  if (winner) {
    status = `Winner is ${winner}`;
  } else if (gameOver) {
    status = `No more moves!`;
  } else {
    status = `${isXNext ? 'X' : 'O'}'s Turn`;
  }

  return (
    <>
      <h1 className='title'>Tic-Tac-Toe!</h1>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className='status'>{status}</div>
      <ResetGame />
    </>
  );
}

function Square({ value, handleOnSquareClick }) {
  return (
    <button className='button' onClick={handleOnSquareClick}>
      {value}
    </button>
  );
}

function App() {
  return (
    <div className='board'>
      <Board />
    </div>
  );
}

export default App;
