import { useState } from 'react';
import { Form } from './form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      await axios.post(
        'https://food-recipe-backend-pya7.onrender.com/auth/register',
        {
          username,
          password,
        }
      );
      alert('Registration Completed! Now Login.');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // User already exists, redirect to login page
        setErrorMessage('User already exists! Please log in.');
        // navigate('/login');
      } else {
        setErrorMessage(
          'An error occurred during registration. Please try again.'
        );
        console.log('register', err);
      }
      console.error(err);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <div className="auth">
        <Form
          className="auth"
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          label="Register"
          onSubmit={onSubmit}
          idPrefix="register"
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};
