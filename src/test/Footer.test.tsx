import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Importando userEvent
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('contains social media icons with correct links', () => {
    render(<Footer />);

    const facebookIcon = screen.getByAltText('icon-face');
    const instagramIcon = screen.getByAltText('icon-inst');
    const twitterIcon = screen.getByAltText('icon-twitter');

    expect(facebookIcon).toBeInTheDocument();
   

    // Simular clique nos ícones
    userEvent.click(facebookIcon);
    expect(window.location.href).toBe('https://pt-br.facebook.com/');

    userEvent.click(instagramIcon);
    expect(window.location.href).toBe('https://www.instagram.com/');

    userEvent.click(twitterIcon);
    expect(window.location.href).toBe('https://twitter.com/');
  });
});
