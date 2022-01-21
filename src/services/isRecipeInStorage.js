const isRecipeInStorage = (storage, dishOrDrink) => storage && dishOrDrink && storage
  .find(({ id }) => id === dishOrDrink.idMeal || id === dishOrDrink.idDrink);

export default isRecipeInStorage;
