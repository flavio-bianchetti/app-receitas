export const getIngredients = (dishOrDrink) => Object.keys(dishOrDrink)
  .filter((key) => key.includes('strIngredient'))
  .map((key) => dishOrDrink[key])
  .filter((ingredient) => ingredient !== '' && ingredient !== null);

export const getMeasures = (dishOrDrink) => Object.keys(dishOrDrink)
  .filter((key) => key.includes('strMeasure'))
  .map((key) => dishOrDrink[key])
  .filter((measure) => measure !== '' && measure !== null);

export const getIngredientsAndMeasures = (ingredients, measures) => (
  ingredients.map((ingredient, index) => (
    {
      ingredient,
      measure: measures[index],
    }
  )));
