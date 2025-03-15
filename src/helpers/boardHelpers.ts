import { SquaresType } from "../types";

/**
 * Determine the winner of a game of Tic Tac Toe, given the current state of
 * the board.
 *
 * This function checks all possible winning combinations of squares on the
 * board, and returns the player who has won if there is a winner, or null if
 * there is not.
 *
 * @param squares the current state of the game board
 * @returns the player who has won, or null if there is no winner
 */
export const calculateWinner = (squares: SquaresType) => {
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
    // find em filled, all the same
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

/**
 * Calculate the number of turns that have been taken
 * @param squares - The current state of the game board
 * @returns The number of turns that have been taken
 */
export const calculateTurns = (squares: SquaresType) => {
  return squares.filter((square) => !square).length;
};

export const calculateStatus = (
  winner: "X" | "O" | null,
  turns: number,
  player: "X" | "O"
) => {
  if (!winner && !turns) return "Draw";
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
};
