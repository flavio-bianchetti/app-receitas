const ingredientRequest = (ingredient) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
  .then((data) => data.json()
    .then((dishes) => (data.ok ? Promise.resolve(dishes) : Promise.reject(dishes))));

const nameRequest = (name) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  .then((data) => data.json()
    .then((dishes) => (data.ok ? Promise.resolve(dishes) : Promise.reject(dishes))));

const firstLetterRequest = (firstLetter) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
  .then((data) => data.json()
    .then((dishes) => (data.ok ? Promise.resolve(dishes) : Promise.reject(dishes))));

export { ingredientRequest, nameRequest, firstLetterRequest };
