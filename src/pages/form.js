import React from 'react';

export const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
  idPrefix = '',
}) => {
  // const usernameId = `${idPrefix}username`;
  // const passwordId = `${idPrefix}password`;

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor={username}>Username:</label>
          <input
            type="text"
            id={username}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor={password}>Password:</label>
          <input
            type="password"
            id={password}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
