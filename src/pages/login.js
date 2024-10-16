import { useState } from 'react';
import { Form } from './form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        'https://food-recipe-backend-pya7.onrender.com/auth/login',
        {
          username,
          password,
        }
      );
      setCookies('access_token', response.data.token);

      window.localStorage.setItem('userID', response.data.userID);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // User doesn't exist, redirect to register page
        setErrorMessage("User doesn't exist! Please register.");
        // navigate('/register');
      } else {
        setErrorMessage('An error occurred during login. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <div className="auth">
        <Form
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          label="Login"
          onSubmit={onSubmit}
          idPrefix="login"
        />
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};
