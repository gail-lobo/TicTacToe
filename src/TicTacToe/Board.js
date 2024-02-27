import React, { useState, useEffect } from "react";
import "./Board.css";

const Board = () => {
  // State for player's turn ("X" or "O", default:X)
  const [player, setPlayer] = useState("X");

  // State for tracking the state of each tile on the board
  const [tiles, setTiles] = useState(Array(9).fill(""));

  // State to store the winner of the game
  const [winner, setWinner] = useState("");

  const [noWinner, setNoWinner] = useState("");

  // useEffect to check for winning combinations after each move
  useEffect(() => {
    // Define winning combinations on the board
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for a winner based on the winning combinations
    let win = null;
    let isDraw = null;

    // function to check if it's a draw
    const checkDraw = (element) => {
      const [a, b, c] = element;
      return tiles[a] && tiles[b] && tiles[c];
    };

    winningCombos.forEach((winningCombo) => {
      const [a, b, c] = winningCombo;
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        win = tiles[a];
      }
    });

    // If a winner is found, update the winner state
    if (win) {
      setWinner(win);
    }

    // If no winner is found and all tiles are played, it's a draw.
    if (!win) {
      isDraw = winningCombos.every(checkDraw);
      if (isDraw) {
        setNoWinner("It' a draw");
      }
    }
  }, [tiles]);

  // Function to handle a player's move
  const updatePlayer = (tileNum) => {
    // Check for invalid moves or if the game is over
    if (tiles[tileNum] !== "" && !winner && !noWinner) {
      alert("Double clicking is not allowed");
    } else if (winner || noWinner) {
      alert("Game Over! Reset Game to play again");
    } else {
      // Update the state of the board and switch to the next player
      setTiles((prevTiles) => {
        let newTiles = [...prevTiles];
        newTiles[tileNum] = player;
        return newTiles;
      });

      setPlayer(() => (player === "X" ? "O" : "X"));
    }
  };

  // Component for individual tiles on the board
  const Tiles = ({ tileNum }) => {
    return (
      <td
        className="tile"
        onClick={() => {
          updatePlayer(tileNum);
        }}
      >
        {tiles[tileNum]}
      </td>
    );
  };

  // Function to reset the game
  const resetGame = () => {
    setTiles(Array(9).fill(""));
    setPlayer("X");
    setWinner("");
    setNoWinner("");
  };

  return (
    <div className="Board">
      <table>
        <thead>
          <tr>
            <th colSpan={3}>Tic Tac Toe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Tiles tileNum={0} />
            <Tiles tileNum={1} />
            <Tiles tileNum={2} />
          </tr>
          <tr>
            <Tiles tileNum={3} />
            <Tiles tileNum={4} />
            <Tiles tileNum={5} />
          </tr>
          <tr>
            <Tiles tileNum={6} />
            <Tiles tileNum={7} />
            <Tiles tileNum={8} />
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              {(winner && `Winner: ${winner}`) ||
                (noWinner && `${noWinner}`) ||
                `Player turn: ${player}`}
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <button onClick={resetGame}>Reset Game</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Board;
