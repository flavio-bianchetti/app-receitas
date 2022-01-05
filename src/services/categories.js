export const getDishCategories = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  .then(((response) => response.json()
    .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))));

export const getDrinksCategories = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
  .then(((response) => response.json()
    .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))));