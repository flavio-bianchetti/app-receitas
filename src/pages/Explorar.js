import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" />
      <div className="pages-background">
        <section className="profile-content">
          <button
            className="profileBtn"
            data-testid="explore-food"
            type="button"
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explorar Comidas
          </button>
          <button
            className="profileBtn"
            data-testid="explore-drinks"
            type="button"
            onClick={ () => history.push('/explorar/bebidas') }
          >
            Explorar Bebidas
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
