import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Menu from '../components/Menu';

describe('Menu Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Menu pageTitle="Home" />
      </Router>
    );
  });

  it('toggles login status and button text on button click', () => {
    render(
      <Router>
        <Menu pageTitle="Home" />
      </Router>
    );

    const loginButton = screen.getByText('Sign In');

    fireEvent.click(loginButton);

    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    fireEvent.click(loginButton);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('prevents navigation to Restaurant page when on Restaurant page', () => {
    render(
      <Router>
        <Menu pageTitle="Home" />
      </Router>
    );

    const bagIcon = screen.getByAltText('bag');

    fireEvent.click(bagIcon);

  
    expect(window.location.pathname).toBe('/');
  });

  it('navigates to Restaurant page when not on Restaurant page', () => {
    render(
      <Router>
        <Menu pageTitle="Home" />
      </Router>
    );

   
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/',
      },
      writable: true,
    });

    const bagIcon = screen.getByAltText('bag');

    fireEvent.click(bagIcon);

 
    expect(window.location.pathname).toBe('/Restaurant');
  });
});
