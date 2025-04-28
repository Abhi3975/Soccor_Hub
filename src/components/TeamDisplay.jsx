import React, { useState } from 'react';

function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [leagueId, setLeagueId] = useState(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '664f4fa5980bb8ae224bcfcd7fe2135f7a839c4798a80d35d52be6f2e79a1286'; 

  const fetchTeams = async () => {
    if (!leagueId) {
      setError('Please enter a League ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://apiv3.apifootball.com/?action=get_teams&league_id=${leagueId}&APIkey=${API_KEY}`);
      const data = await response.json();
      console.log('Teams data:', data);

      if (Array.isArray(data)) {
        setTeams(data);
      } else {
        setError('Unexpected error.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch teams.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Football Teams</h1>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter League ID (b/w 1 - 725)"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchTeams} style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Load Teams'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.teamsGrid}>
        {teams.map((team) => (
          <div key={team.team_key} style={styles.teamCard}>
            <h2 style={styles.teamName}>{team.team_name}</h2>
            {team.team_badge && (
              <img
                src={team.team_badge}
                alt={team.team_name}
                style={styles.teamLogo}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '6rem 2rem',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  inputGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    width: '220px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#1d4ed8',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  teamsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  teamCard: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  teamName: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  teamLogo: {
    width: '100px',
    height: 'auto',
    objectFit: 'contain',
  },
};

export default TeamsList;
