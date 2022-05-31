import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Tests Login Page:', () => {
  it('renders all correct inputs and submit buttons', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const nameInput = screen.getByPlaceholderText(/insert your name/i);
    expect(playBtn).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it('renders with disabled play button', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    expect(playBtn).toBeDisabled();
  });

  it('enables button after complete input fields', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const nameInput = screen.getByPlaceholderText(/insert your name/i);
    userEvent.type(nameInput, 'Rafael');
    expect(playBtn).toBeEnabled();
  });

  it('play button redirects to /game', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const nameInput = screen.getByPlaceholderText(/insert your name/i);
    userEvent.type(nameInput, 'Rafael');
    userEvent.click(playBtn);
    const score = await screen.findByText(/score: 0/i)
    expect(score).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game');
  });
});