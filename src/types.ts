export type Tuple<
  T,
  N extends number,
  R extends T[] = []
> = R["length"] extends N ? R : Tuple<T, N, [...R, T]>;

export type SquaresType = Tuple<"X" | "O" | null, 9>;
