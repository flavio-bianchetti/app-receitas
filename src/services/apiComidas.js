const dishesRequest = (dishesUrl) => fetch(dishesUrl)
  .then((data) => data.json()
    .then((dishes) => (data.ok ? Promise.resolve(dishes) : Promise.reject(dishes))));

export const dishesByIngredient = (ingredient) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

export const dishesByName = (name) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
);

export const dishesByLastLetter = (lastLetter) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${lastLetter}`
);

export default dishesRequest;
