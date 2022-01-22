import React from 'react';
import failRecipe from '../images/Cooking-Failures.jpeg';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <section className="pages-background">
      <div className="container">
        <div className="notFound-container">
          <div className="notFoundImg-container">
            <img src={ failRecipe } alt="Receita má feita" />
          </div>
          <p>Receita queimou</p>
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default NotFound;
