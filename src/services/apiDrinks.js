export const drinksIngredientsList = () => (
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
);

export const drinksById = (id) => (
  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const randomDrink = () => (
  'https://www.thecocktaildb.com/api/json/v1/1/random.php'
);
