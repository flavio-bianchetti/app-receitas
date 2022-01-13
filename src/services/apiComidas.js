export const dishesIngredientsList = () => (
  'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
);

export const dishesById = (id) => (
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const randomDish = () => (
  'https://www.themealdb.com/api/json/v1/1/random.php'
);

export const dishesAreaCategories = () => (
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
);

export const dishesByArea = (area = 'All') => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
);
