const getIngredients = (dishOrDrink) => Object.keys(dishOrDrink)
  .filter((key) => key.includes('strIngredient'))
  .map((key) => dishOrDrink[key])
  .filter((ingredient) => ingredient !== '' && ingredient !== null);

export default getIngredients;
