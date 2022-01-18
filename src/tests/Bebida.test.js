import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/bebidas/15997');
});

const maxLengthIngredientsList = 3;
const maxLengthRecomendation = 6;
const recipeIngredientsAndMeasureLength = 3;

describe('Testa a correta renderização da página de detalhes da bebida (Parte 1)):',
  () => {
    it('testa se o header está presente na página.', async () => {
      const header = await screen.findByTestId('page-title');
      expect(header).toBeInTheDocument();
      expect(header.textContent).toBe('Bebidas');
    });

    it('testa se a imagem da Bebida está presente na página.', async () => {
      const imgGG = await screen.findByTestId('recipe-photo');
      expect(imgGG).toBeInTheDocument();
    });

    it('testa se o nome da receita está presente na página.', async () => {
      const ggTitle = await screen.findByText('GG');
      expect(ggTitle).toBeInTheDocument();
    });

    it('testa se a categoria da receita está presente na página e possui a'
    + 'descrição correta.', async () => {
      const category = await screen.findByTestId('recipe-category');
      expect(category).toBeInTheDocument();
      expect(category.textContent).toBe('Optional alcohol');
    });
    it('testa se o botão "Compartilhar" está presente na página.', async () => {
      const share = await screen.findByTestId('share-btn');
      expect(share).toBeInTheDocument();
      expect(share.textContent).toBe('Compartilhar');
    });

    it('testa se o botão de favoritar está presente na página.', async () => {
      const favorite = await screen.findByTestId('favorite-btn');
      expect(favorite).toBeInTheDocument();
    });

    it('testa se recipe name e measure estão presentes na página', async () => {
      const ingredientNameAndMeasure = await screen
        .findAllByTestId(/ingredient-name-and-measure/i);
      expect(ingredientNameAndMeasure.length).toBe(recipeIngredientsAndMeasureLength);
    });
  });

describe('Testa a correta renderização da página de detalhes da bebida (Parte 2):',
  () => {
    it('testa se a lista de ingredientes possui a quantidade correta.', async () => {
      const ingredientsList = await screen
        .findAllByTestId(/ingredient-name-and-measure/i);
      expect(ingredientsList.length).toBe(maxLengthIngredientsList);
    });

    it('testa se as instruções da receita encontram-se presentes na página.',
      async () => {
        const instructions = await screen.findByTestId('instructions');
        expect(instructions).toBeInTheDocument();
      });

    it('testa se a lista de recomendações de comidas possui a quantidade correta',
      async () => {
        const recomendationCards = await screen.findAllByTestId(/recomendation-card/i);
        expect(recomendationCards.length).toBe(maxLengthRecomendation);
      });

    it('testa se o botão "Iniciar Receita" está presente na página.', async () => {
      const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
      expect(startRecipeBtn).toBeInTheDocument();
      expect(startRecipeBtn.textContent).toBe('Iniciar Receita');
    });
  });
