const dishesRequest = (dishesUrl) => fetch(dishesUrl)
  .then((response) => response.json()
    .then((data) => (data.meals ? Promise.resolve(data) : Promise.reject(data))));

export const dishesByIngredient = (ingredient) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

export const dishesByName = (name) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
);

export const dishesByLastLetter = (lastLetter) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${lastLetter}`
);

export const dishesById = (id) => (
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const randomDish = () => (
  'https://www.themealdb.com/api/json/v1/1/random.php'
);

export default dishesRequest;
