const dishesOrDrinksRequest = (drinksUrl) => fetch(drinksUrl)
  .then((response) => response.json()
    .then((data) => (data.drinks || data.meals
      ? Promise.resolve(data) : Promise.reject(data))));

export const searchByIngredient = (url, ingredient) => (
  `https://www.${url}.com/api/json/v1/1/filter.php?i=${ingredient}`);

export const searchByName = (url, name) => (
  `https://www.${url}.com/api/json/v1/1/search.php?s=${name}`
);

export const searchByLastLetter = (url, lastLetter) => (
  `https://www.${url}.com/api/json/v1/1/search.php?f=${lastLetter}`
);

export default dishesOrDrinksRequest;

// thecocktaildb themealdb
