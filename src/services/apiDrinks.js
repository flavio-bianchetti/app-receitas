const drinksRequest = (drinksUrl) => fetch(drinksUrl)
  .then((response) => response.json()
    .then((data) => (data.drinks ? Promise.resolve(data) : Promise.reject(data))));

export const drinksByIngredient = (ingredient) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
);
export const drinksByName = (name) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
);

export const drinksByLastLetter = (lastLetter) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${lastLetter}`
);

export const drinksById = (id) => (
  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
);

export default drinksRequest;
