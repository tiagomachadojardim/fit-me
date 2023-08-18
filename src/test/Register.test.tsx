import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Register from '../components/Register';

describe('Register Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Register
          handlePageTitleChange={() => {}}
          hideHeader={false}
          hideMenu={false}
        />
      </Router>
    );
  });

  it('displays alert message on successful registration', async () => {
    render(
      <Router>
        <Register
          handlePageTitleChange={() => {}}
          hideHeader={false}
          hideMenu={false}
        />
      </Router>
    );

    const fullNameInput = screen.getByLabelText('Full Name');
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(fullNameInput, { target: { value: 'tiago' } });
    fireEvent.change(usernameInput, { target: { value: 'tiago1' } });
    fireEvent.change(emailInput, { target: { value: 'tiago1@hotmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '12345678' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
  });

  it('displays alert message on failed registration', async () => {
    render(
      <Router>
        <Register
          handlePageTitleChange={() => {}}
          hideHeader={false}
          hideMenu={false}
        />
      </Router>
    );

    const registerButton = screen.getByRole('button', { name: 'Register' });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });
});
