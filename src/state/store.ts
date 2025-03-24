// create a new zustand store:
import {
  create,
  ExtractState,
} from "zustand";
import {
  combine,
  devtools,
} from "zustand/middleware";

import { SquaresType } from "../types";

// Instead of explicitly defining the store structure for typescript,
// we can use the ExtractState function to extract it for us.
// We use this with combine() below, which infers the state for us
export type State = ExtractState<typeof useGameStore>;

export const useGameStore = create(
  devtools(
    combine(
      {
        squares: Array(9).fill(null) as SquaresType,
        xIsNext: true,
      },
      (set) => ({
        // set is the way to change the specific part of state only
        setSquares: (nextSquares: SquaresType) =>
          set({ squares: nextSquares }, undefined, "game/setSquares"),
        toggleXIsNext: () => {
          set(
            (state: State) => ({
              xIsNext: !state.xIsNext,
            }),
            undefined,
            "game/toggleXIsNext"
          );
        },
      })
    )
  )
);
