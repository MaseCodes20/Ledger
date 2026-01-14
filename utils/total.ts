type NumericData = Record<string, number>

const total = (array: NumericData[], money: string) =>
  array?.map((income) => income[money]).reduce((a, c) => a + c, 0);

export default total;
