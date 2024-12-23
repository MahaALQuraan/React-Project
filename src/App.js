
import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      fetchUserData(userInput.trim());
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {userData && (
          <div className="user-card">
            <div className="user-card-header">
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="user-avatar"
              />
              <h2>{userData.name || 'No Name Provided'}</h2>
              <p className="username">@{userData.login}</p>
            </div>
            <div className="user-card-body">
              <p><strong>Repositories:</strong> {userData.public_repos}</p>
              <p><strong>Followers:</strong> {userData.followers}</p>
              <p><strong>Following:</strong> {userData.following}</p>
              <p>
                          <strong>Repos:</strong>{userData.public_repos}
                          </p>
                          <p>
                          <strong>Created_at:</strong>{userData.created_at}
                          </p>
                          <p>
                          <strong>Twitter:</strong>{userData.twitter_username || "Nothing"}
                          </p>
                          <p>
                          <strong>Company:</strong>{userData.company || "Nothing"}
                          </p>
                          <p>
                          <strong>Location:</strong>{userData.location || "Nothing"}
                       </p>
            </div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
