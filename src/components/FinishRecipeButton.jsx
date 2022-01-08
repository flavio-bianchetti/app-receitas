import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppDeReceitasContext from '../context/AppDeReceitasContext';

function FinishRecipeButton() {
  const { isRecipeButtonEnable } = useContext(AppDeReceitasContext);
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ isRecipeButtonEnable }
      onClick={ () => history.push('/receitas-feitas') }
    >
      Finalizar receita
    </button>
  );
}

export default FinishRecipeButton;
