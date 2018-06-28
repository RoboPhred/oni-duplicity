declare module "string-natural-compare" {
  interface NaturalCompare {
    (a: string, b: string): number;
    caseInsensitive(a: string, b: string): number;
  }
  const naturalCompare: NaturalCompare;
  export = naturalCompare;
}
