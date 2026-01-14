const capitalizeFirstLetter = (str: string) => {
  let strArray = str.split("");
  const upperCaseFirstLetter = strArray[0].toUpperCase();
  strArray.shift();
  strArray.unshift(upperCaseFirstLetter);
  return strArray;
};

export default capitalizeFirstLetter;
