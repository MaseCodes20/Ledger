const dividendTotal = (shares, dividend) => {
  const total = shares * dividend;
  return total.toFixed(2);
};

export default dividendTotal;
