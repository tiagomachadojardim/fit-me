import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Login from '../components/Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Login
          handlePageTitleChange={() => {}}
          hideHeader={false}
          hideMenu={false}
        />
      </Router>
    );
  });

  it('displays alert message on failed login', async () => {
    render(
      <Router>
        <Login
          handlePageTitleChange={() => {}}
          hideHeader={false}
          hideMenu={false}
        />
      </Router>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'tiago' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please check your credentials.')).toBeInTheDocument();
    });
  });
});
