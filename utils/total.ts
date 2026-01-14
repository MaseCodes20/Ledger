const total = <T extends Record<string, any>>(
  array: T[] | undefined, 
  money: keyof T | string
): number => {
  if (!array) return 0;

  return array
    .map((item) => {
      const value = item[money as string];
      return typeof value === 'number' ? value : 0;
    })
    .reduce((a, c) => a + c, 0);
};

export default total;
