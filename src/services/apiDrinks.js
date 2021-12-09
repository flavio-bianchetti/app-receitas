const drinksRequest = (drinks) => fetch(drinks)
  .then((data) => data.json()
    .then((drink) => (data.ok ? Promise.resolve(drink) : Promise.reject(drink))));

export default drinksRequest;
