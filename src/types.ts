export type Mutable<T> = T extends [] ?
  Array<{ -readonly [P in keyof T]: Mutable<T[P]> }>
  : { -readonly [P in keyof T]: Mutable<T[P]> };

export type DeeplyNonNullable<T> = T extends [] ?
  Array<
    NonNullable<
      { [P in keyof T]: NonNullable<DeeplyNonNullable<T[P]>> }
    >
  >
  : NonNullable<
    { [P in keyof T]: NonNullable<DeeplyNonNullable<T[P]>> }
  >;

export type DeeplyNullable<T> = T extends [] ?
  Array<
    {
      [P in keyof T]: P extends ' $refType' | ' $fragmentRefs' ? T[P] : DeeplyNullable<T[P]> | null
    } | null
  >
  : {
    [P in keyof T]: P extends ' $refType' | ' $fragmentRefs' ? T[P] : DeeplyNullable<T[P]> | null
  } | null;
