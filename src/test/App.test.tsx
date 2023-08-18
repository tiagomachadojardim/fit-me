import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
  it('renders header and footer correctly', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

   
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });
});
