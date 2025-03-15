import {
  calculateStatus,
  calculateTurns,
  calculateWinner,
} from "./helpers/boardHelpers";
import Square from "./Square";
import {
  State,
  useGameStore,
} from "./state/store";
import { SquaresType } from "./types";

export default function Board() {
  const xIsNext = useGameStore((state: State) => state.xIsNext);
  const setXIsNext = useGameStore((state: State) => state.setXIsNext);
  const squares = useGameStore((state: State) => state.squares);
  const setSquares = useGameStore((state: State) => state.setSquares);

  const player = xIsNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const status = calculateStatus(winner, turns, player);

  const handleClick = (i: number) => {
    if (squares[i]) return;
    const nextSquares = squares.slice() as SquaresType;
    nextSquares[i] = player;
    setSquares(nextSquares);
    setXIsNext();
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          width: "calc(3 * 2.5rem)",
          height: "calc(3 * 2.5rem)",
          border: "1px solid #999",
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
      <div>{status}</div>
    </>
  );
}
