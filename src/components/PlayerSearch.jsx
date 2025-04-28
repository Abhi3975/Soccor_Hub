
import React, { useState, useEffect } from 'react';

export default function FootballPlayerSearch() {
  const [query, setQuery] = useState('');
  const [playersData, setPlayersData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '664f4fa5980bb8ae224bcfcd7fe2135f7a839c4798a80d35d52be6f2e79a1286'; 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://apiv3.apifootball.com/?action=get_countries&APIkey=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCountriesData(data);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setPlayersData([]);

    try {
      const response = await fetch(`https://apiv3.apifootball.com/?action=get_players&player_name=${query}&APIkey=${API_KEY}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setPlayersData(data);
      } else if (data.message) {
        setError(data.message);
      } else {
        setError('No players found.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch player data.');
    } finally {
      setLoading(false);
    }
  };

  const getFlagUrl = (countryName) => {
    const found = countriesData.find(c => c.country_name.toLowerCase() === countryName.toLowerCase());
    return found ? found.country_logo : '';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Football Player Search</h1>

      <div style={styles.centerWrapper}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter player name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <div
          style={{
            ...styles.playersGrid,
            gridTemplateColumns: playersData.length === 1
              ? '1fr'
              : 'repeat(auto-fill, minmax(300px, 1fr))',
            justifyItems: playersData.length === 1 ? 'center' : 'start',
          }}
        >
          {playersData.map((player) => (
            <div key={player.player_key} style={styles.card}>
              {player.player_country && (
                <img
                  src={getFlagUrl(player.player_country)}
                  alt={player.player_country}
                  style={styles.flagTopLeft}
                />
              )}
              {player.player_image && (
                <img
                  src={player.player_image}
                  alt={player.player_name}
                  style={styles.playerImage}
                />
              )}
              <h2 style={styles.playerName}>{player.player_name}</h2>

              <div style={styles.infoGroup}>
                <p><strong>Team:</strong> {player.team_name}</p>
                <p><strong>Position:</strong> {player.player_type}</p>
                <p><strong>Age:</strong> {player.player_age}</p>
                <p><strong>Country:</strong> {player.player_country}</p>
              </div>

              <div style={styles.statsGroup}>
                <p><strong>Matches Played:</strong> {player.player_match_played}</p>
                <p><strong>Goals:</strong> {player.player_goals}</p>
                <p><strong>Jersey Number:</strong> {player.player_number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '6rem 2rem',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#1f2937',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '700px',
  },
  searchBox: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2.5rem',
    justifyContent: 'center',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    width: '250px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#111827',
    color: '#fff',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  playersGrid: {
    display: 'grid',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  card: {
    width: '320px',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    textAlign: 'center',
    position: 'relative',
    transition: 'transform 0.3s ease',
  },
  flagTopLeft: {
    width: '50px',
    height: '30px',
    objectFit: 'cover',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  playerImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '1rem',
    border: '4px solid #4f46e5',
  },
  playerName: {
    fontSize: '1.8rem',
    margin: '1rem 0',
    fontWeight: 'bold',
    color: '#111827',
  },
  infoGroup: {
    fontSize: '1rem',
    color: '#374151',
    marginBottom: '1rem',
  },
  statsGroup: {
    fontSize: '1rem',
    marginTop: '1rem',
    color: '#111827',
  },
};
