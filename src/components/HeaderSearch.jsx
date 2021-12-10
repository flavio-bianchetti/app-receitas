import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function Header({ title, handleSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const { dishesOrDrinks } = useContext(AppDeReceitasContext);
  const history = useHistory();
  // const [radioSearchDisabled, setRadioSearchDisabled] = useState(true);

  const handleSearchType = (e) => {
    const { value } = e.target;
    setSearchType(value);
  };

  useEffect(() => {
    if (dishesOrDrinks.length === 1) {
      const id = dishesOrDrinks[0].idMeal || dishesOrDrinks[0].idDrink;
      history.push(`/${title.toLowerCase()}/${id}`);
    }
  }, [dishesOrDrinks, history]);

  // useEffect(() => {
  //   if (searchInput !== '') {
  //     return setRadioSearchDisabled(false);
  //   }
  //   setRadioSearchDisabled(true);
  // }, [searchInput]);

  const searchForm = () => (
    <div>
      {showSearch && (
        <>
          <input
            type="text"
            data-testid="search-input"
            value={ searchInput }
            onChange={ (e) => setSearchInput(e.target.value) }
          />
          <div>
            <label htmlFor="search-type-ingredient">
              Ingrediente
              <input
                type="radio"
                data-testid="ingredient-search-radio"
                id="search-type-ingredient"
                name="search-type"
                value="search-ingredient"
                checked={ searchType === 'search-ingredient' }
                onChange={ (e) => handleSearchType(e) }
                // disabled={ title === 'Bebidas' ? radioSearchDisabled : false }
              />
            </label>
          </div>
          <div>
            <label htmlFor="search-type-name">
              Nome
              <input
                type="radio"
                data-testid="name-search-radio"
                id="search-type-name"
                name="search-type"
                value="search-name"
                checked={ searchType === 'search-name' }
                onChange={ (e) => handleSearchType(e) }
              />
            </label>
          </div>
          <div>
            <label htmlFor="search-type-first-letter">
              Primeira letra
              <input
                type="radio"
                data-testid="first-letter-search-radio"
                id="search-type-first-letter"
                name="search-type"
                value="search-first-letter"
                checked={ searchType === 'search-first-letter' }
                onChange={ (e) => handleSearchType(e) }
                // disabled={ radioSearchDisabled }
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => handleSearch(searchType, searchInput) }
          >
            Buscar

          </button>
        </>
      )}
    </div>
  );
  return (
    <>
      <header>
        <Link to="/perfil">
          <div>
            <img src={ profile } alt="ProfileIcon" data-testid="profile-top-btn" />
          </div>
        </Link>
        <div>
          <h2 data-testid="page-title">
            {title}
          </h2>
        </div>
        <div>
          <input
            type="image"
            src={ search }
            alt="searchIcon"
            data-testid="search-top-btn"
            onClick={ () => setShowSearch(!showSearch) }
          />
        </div>
      </header>
      {searchForm()}
    </>
  );
}

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
