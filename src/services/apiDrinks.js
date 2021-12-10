const drinksRequest = (drinksUrl) => fetch(drinksUrl)
  .then((data) => data.json()
    .then((drink) => (data.ok ? Promise.resolve(drink) : Promise.reject(drink))));

export const drinksByIngredient = (ingredient) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
);
export const drinksByName = (name) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
);

export const drinksByLastLetter = (lastLetter) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${lastLetter}`
);

export default drinksRequest;
