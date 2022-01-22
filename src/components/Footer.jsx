import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-container">
        <Link to="/bebidas">
          <img
            className="footerIcon"
            src={ drinkIcon }
            alt="Go to drinks"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            className="footerIcon"
            src={ exploreIcon }
            alt="Explore"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">
          <img
            className="footerIcon"
            src={ mealIcon }
            alt="Go to meals"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
