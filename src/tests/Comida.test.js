import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/comidas/52977');
});

const maxLengthIngredientsList = 13;
const maxLengthRecomendation = 6;

describe('Testa a correta renderização da página de detalhes da comida (Parte 1)):',
  () => {
    it('testa se o header está presente na página.', async () => {
      const header = await screen.findByTestId('page-title');
      expect(header).toBeInTheDocument();
      expect(header.textContent).toBe('Comidas');
    });

    it('testa se a imagem da Comida está presente na página.', async () => {
      const imgCorba = await screen.findByTestId('recipe-photo');
      expect(imgCorba).toBeInTheDocument();
    });

    it('testa se o nome da receita está presente na página.', async () => {
      const corbaTitle = await screen.findByText('Corba');
      expect(corbaTitle).toBeInTheDocument();
    });

    it('testa se a categoria da receita está presente na página e possui a'
    + 'descrição correta.', async () => {
      const category = await screen.findByTestId('recipe-category');
      expect(category).toBeInTheDocument();
      expect(category.textContent).toBe('Side');
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
  });

describe('Testa a correta renderização da página de detalhes da comida (Parte 2):',
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

    it('testa se o vídeo encontra-se presente na página.', async () => {
      const video = await screen.findByTestId('video');
      expect(video).toBeInTheDocument();
    });

    it('testa se a lista de recomendações de bebidas possui a quantidade correta',
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
