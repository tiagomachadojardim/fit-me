import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Header pageTitle="Test Page" />
      </Router>
    );
  });

  it('displays the correct page title', () => {
    render(
      <Router>
        <Header pageTitle="Test Page" />
      </Router>
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('navigates to home page when clicking on logo', () => {
    render(
      <Router>
        <Header pageTitle="Test Page" />
      </Router>
    );

    const logo = screen.getByAltText('logo');

   
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/some-other-page',
      },
      writable: true,
    });

    
    logo.click();

   
    expect(window.location.pathname).toBe('/');
  });
});
