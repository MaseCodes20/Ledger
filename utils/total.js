const total = (array, money) =>
  array?.map((income) => income[money]).reduce((a, c) => a + c, 0);

export default total;
