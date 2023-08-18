import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import Header from './Header';
import Menu from './Menu';
import { gql, GraphQLClient } from 'graphql-request'; 

interface LoginProps {
  handlePageTitleChange: (newTitle: string) => void;
  hideHeader: boolean; 
  hideMenu: boolean;
}





const Login: React.FC<LoginProps> = ({ handlePageTitleChange, hideHeader, hideMenu }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null); 

  handlePageTitleChange("Login");

  const [loginStatus, setLoginStatus] = useState<'default' | 'success' | 'error'>('default');

  const navigate = useNavigate();

  useEffect(() => {
    handlePageTitleChange("Login");
    return () => {
      handlePageTitleChange("Título Padrão Login");
    };
  }, [handlePageTitleChange]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  interface LogInResponse {
    logIn: {
      viewer: {
        user: {
          id: string;
          createdAt: string;
          updatedAt: string;
          username: string;
        };
        sessionToken: string;
      };
    };
  }
  

  const handleLogin = async () => {
    try {
      const endpointUrl = 'https://parseapi.back4app.com/graphql';
      
      
      //  GraphQL com os cabeçalhos apropriados
      const client = new GraphQLClient(endpointUrl, {
        headers: {
          'X-Parse-Application-Id': 'DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL',
          'X-Parse-Master-Key': '0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9',
          'X-Parse-Client-Key': 'zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V',
        },
      });

      const query = gql`
        mutation LogIn($username: String!, $password: String!) {
          logIn(input: { username: $username, password: $password }) {
            viewer {
              user {
                id
                createdAt
                updatedAt
                username
              }
              sessionToken
            }
          }
        }
      `;

      const variables = {
        username,
        password,
      };

     
      const response = await client.request<LogInResponse>(query, variables);
      if (response.logIn) {
        setLoginStatus('success');
        setAlertMessage('Login successful');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setAlertMessage('Login failed. Please check your credentials.');
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      setAlertMessage('An error occurred. Please try again.');
      setLoginStatus('error');
    }
  };

  return (
    <div className="login">
      {hideHeader ? null : <Header pageTitle="Login" />}
      {hideMenu ? null : <Menu pageTitle="Login" />}
      <div className="login-container">
        {alertMessage && <div className={`alert ${alertMessage === 'Login successful' ? 'success' : 'error'}`}>{alertMessage}</div>}
        <label><strong>Username</strong></label>
        <div>
          <input type="text"  value={username} onChange={handleUsernameChange} />
        </div>
        <label><strong>Password</strong></label>
        <div>
          <input type="password"  value={password} onChange={handlePasswordChange} onKeyDown={handleKeyDown} />
        </div>
        <div>
          <button
            className={`login-button ${loginStatus === 'success' ? 'success' : loginStatus === 'error' ? 'error' : ''}`}
            onClick={handleLogin}
            onAnimationEnd={() => setLoginStatus('default')} 
          >
            {loginStatus === 'success' ? 'Success' : loginStatus === 'error' ? 'Error' : 'Login'}
          </button>
          <p>Don't have an account? <Link className='login-register' to="/Register"> <strong>Register</strong> </Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
