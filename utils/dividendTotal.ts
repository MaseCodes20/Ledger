const dividendTotal = (shares: number, dividend: number) => {
  const total = shares * dividend;
  return total.toFixed(2);
};

export default dividendTotal;
