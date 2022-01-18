import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import favoriteRecipes from './mocks/favoriteRecipes';

describe('Testa a correta renderização da página "Receitas Favoritas":', () => {
  beforeEach(() => {
    localStorage.removeItem('favoriteRecipes');
  });

  beforeEach(() => {
    renderWithRouterAndProvider(<App />, '/receitas-favoritas');
  });

  it('testa se não há lista de receitas favoritas', () => {
    const recipesCard = screen.queryAllByTestId(/favorite-recipes-card/);
    console.log(recipesCard);
    expect(recipesCard.length).toBe(0);
  });
});

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

beforeEach(() => {
  renderWithRouterAndProvider(<App />, '/receitas-favoritas');
});

describe('Testa a correta renderização da página "Receitas Favoritas":', () => {
  it('testa se o header está presente na página.', async () => {
    const header = await screen.findByTestId('page-title');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('Receitas Favoritas');
  });

  it('testa se o botão de perfil está corretamente renderizado na página.', () => {
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });

  it('testa se há três botões renderizados no alto da página', async () => {
    const buttons = await screen.findAllByTestId(/filter-by-/i);
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toBe('All');
    expect(buttons[1].textContent).toBe('Food');
    expect(buttons[2].textContent).toBe('Drinks');
  });

  it('testa se o destaque dos Cards foram renderizados corretamente.', async () => {
    const h1Cards = await screen.findAllByTestId(/horizontal-top-text/i);
    expect(h1Cards.length).toBe(2);
    expect(h1Cards[0].textContent).toBe('British - Beef');
    expect(h1Cards[1].textContent).toBe('Optional alcohol');
  });

  it('testa nomes das receitas favoritas foram renderizadas corretamente.', async () => {
    const favoriteRecipe1 = await screen.findByText('Beef and Mustard Pie');
    const favoriteRecipe2 = await screen.findByText('GG');
    expect(favoriteRecipe1).toBeInTheDocument();
    expect(favoriteRecipe2).toBeInTheDocument();
  });

  it('testa se as imagens das receitas favoritas foram renderizadas corretamente.',
    async () => {
      const images = await screen.findAllByTestId(/horizontal-image/i);
      expect(images.length).toBe(2);
    });

  it('testa se os botões "Compartilhar" "Favoritar" estão presentes nos cards.',
    async () => {
      const horizontalShareBtn = await screen.findAllByTestId(/horizontal-share-btn/i);
      const horizontalFavoriteBtn = await screen
        .findAllByTestId(/horizontal-favorite-btn/i);
      expect(horizontalShareBtn.length).toBe(2);
      expect(horizontalFavoriteBtn.length).toBe(2);
    });
});

describe('Testa a correta renderização da página "Receitas Favoritas" - apenas Comidas:',
  () => {
    beforeEach(async () => {
      const foodBtn = await screen.findByTestId('filter-by-food-btn');
      userEvent.click(foodBtn);
    });

    it('testa se o destaque do Card foi renderizado corretamente.', async () => {
      const h1Cards = await screen.findAllByTestId(/horizontal-top-text/i);
      expect(h1Cards.length).toBe(1);
      expect(h1Cards[0].textContent).toBe('British - Beef');
    });

    it('testa se nome da receita favorita foi renderizada corretamente.',
      async () => {
        const favoriteRecipe1 = await screen.findByText('Beef and Mustard Pie');
        expect(favoriteRecipe1).toBeInTheDocument();
      });

    it('testa se a imagem da receita favorita foi renderizada corretamente.',
      async () => {
        const images = await screen.findAllByTestId(/horizontal-image/i);
        expect(images.length).toBe(1);
      });

    it('testa se os botões "Compartilhar" "Favoritar" estão presentes no card.',
      async () => {
        const horizontalShareBtnComida = await screen
          .findAllByTestId(/horizontal-share-btn/i);
        const horizontalFavoriteBtnComida = await screen
          .findAllByTestId(/horizontal-favorite-btn/i);
        expect(horizontalShareBtnComida.length).toBe(1);
        expect(horizontalFavoriteBtnComida.length).toBe(1);
      });
  });

describe('Testa a correta renderização da página "Receitas Favoritas" - apenas Bebidas:',
  () => {
    beforeEach(async () => {
      const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
      userEvent.click(drinkBtn);
    });

    it('testa se o destaque do Card foi renderizado corretamente.', async () => {
      const h1Cards = await screen.findAllByTestId(/horizontal-top-text/i);
      expect(h1Cards.length).toBe(1);
      expect(h1Cards[0].textContent).toBe('Optional alcohol');
    });

    it('testa se nome da receita favorita foi renderizada corretamente.',
      async () => {
        const favoriteRecipe1 = await screen.findByText('GG');
        expect(favoriteRecipe1).toBeInTheDocument();
      });

    it('testa se a imagem da receita favorita foi renderizada corretamente.',
      async () => {
        const images = await screen.findAllByTestId(/horizontal-image/i);
        expect(images.length).toBe(1);
      });

    it('testa se os botões "Compartilhar" "Favoritar" estão presentes no card.',
      async () => {
        const horizontalShareBtnBebida = await screen
          .findAllByTestId(/horizontal-share-btn/i);
        const horizontalFavoriteBtnBebida = await screen
          .findAllByTestId(/horizontal-favorite-btn/i);
        expect(horizontalShareBtnBebida.length).toBe(1);
        expect(horizontalFavoriteBtnBebida.length).toBe(1);
      });
  });

describe('Testa os botões de "Compartilhar" e "Favoritar":',
  () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText');

    it('testa o botão "Compartilhar".', async () => {
      const horizontalShareBtn = await screen
        .findAllByTestId(/horizontal-share-btn/i);
      expect(horizontalShareBtn.length).toBe(2);
      userEvent.click(horizontalShareBtn[0]);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      const shareLink = await screen.findByText(/link copiado!/i);
      expect(shareLink).toBeInTheDocument();
    });

    it('testa o botão "Favoritar".', async () => {
      const horizontalFavoriteBtn = await screen
        .findAllByTestId(/horizontal-favorite-btn/i);
      expect(horizontalFavoriteBtn.length).toBe(2);
      userEvent.click(horizontalFavoriteBtn[1]);
      const newHorizontalFavoriteBtn = await screen
        .findAllByTestId(/horizontal-favorite-btn/i);
      expect(newHorizontalFavoriteBtn.length).toBe(1);
    });
  });
