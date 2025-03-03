import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
 
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
 
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
 
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
 
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return
   
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }
 
  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }
 
  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every(square => square !== null)
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Game is a draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`
 
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status" data-testid="status">{status}</div>
      <div className="board">
        {squares.map((square, i) => (
          <button
            key={i}
            className="square"
            data-testid={`square-${i}`}
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>
      <button
        className="reset-button"
        data-testid="reset-button"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  )
}
 
export default App