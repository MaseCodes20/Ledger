const capitalizeFirstLetter = (string) => {
  let stringArray = string.split("");
  const upperCaseFirstLetter = stringArray[0].toUpperCase();
  stringArray.shift();
  stringArray.unshift(upperCaseFirstLetter);
  return stringArray;
};

export default capitalizeFirstLetter;
