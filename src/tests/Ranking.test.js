import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'

describe('Tests Ranking page:', () => {
  it('Tests if localStorage integration is working', () => {
    const previousRanking = [
      { name: 'Tester 1', assertions: 5, score: 328 },
      { name: 'Tester 2', assertions: 2, score: 128},
      { name: 'Tester 3', assertions: 4, score: 299},
    ];
    localStorage.setItem('ranking', JSON.stringify(previousRanking));
    renderWithRouterAndRedux(<App />, {} , '/ranking');
    previousRanking.forEach((player) => {
      const playerName = screen.getByText(`Name: ${player.name}`);
      expect(playerName).toBeInTheDocument();
      const playerScore = screen.getByText(`Score: ${player.score}`);
      expect(playerScore).toBeInTheDocument();
    });
  });
});