// create a new zustand store:
import { create } from "zustand";

import { SquaresType } from "../types";

type StateProps = {
  squares: SquaresType;
  xIsNext: boolean;
};
type StateActions = {
  setXIsNext: (xIsNext: StateProps["xIsNext"]) => void;
  setSquares: (squares: StateProps["squares"]) => void;
};

export type State = StateProps & StateActions;

export const useGameStore = create<State>((set) => ({
  squares: Array(9).fill(null) as SquaresType,
  xIsNext: true,
  // set is the way to change the specific part of state only
  setSquares: (nextSquares: SquaresType) => set({ squares: nextSquares }),
  setXIsNext: () => {
    set((state: State) => ({
      xIsNext: !state.xIsNext,
    }));
  },
}));
