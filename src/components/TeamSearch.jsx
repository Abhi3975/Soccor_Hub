// import React, { useState } from 'react';

// function TeamPlayers() {
//   const [searchInput, setSearchInput] = useState('');
//   const [teams, setTeams] = useState([]);
//   const [filteredTeam, setFilteredTeam] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_KEY = '664f4fa5980bb8ae224bcfcd7fe2135f7a839c4798a80d35d52be6f2e79a1286'; // <-- Replace with your actual API key

//   const fetchTeams = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=${API_KEY}`);
//       const data = await response.json();
//       console.log('Fetched Team Data:', data);

//       if (Array.isArray(data)) {
//         setTeams(data);
//         if (searchInput.trim()) {
//           const team = data.find((team) =>
//             team.team_name.toLowerCase().includes(searchInput.toLowerCase())
//           );
//           setFilteredTeam(team || null);
//           if (!team) setError('No team found.');
//         }
//       } else if (data.message) {
//         setError(data.message);
//       } else {
//         setError('Unexpected error.');
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('Failed to fetch team data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     if (!teams.length) {
//       fetchTeams();
//     } else {
//       const team = teams.find((team) =>
//         team.team_name.toLowerCase().includes(searchInput.toLowerCase())
//       );
//       setFilteredTeam(team || null);
//       if (!team) setError('No team found.');
//       else setError(null);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Search for a Football Team</h1>

//       <div style={styles.searchBox}>
//         <input
//           type="text"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           placeholder="Enter team name..."
//           style={styles.input}
//         />
//         <button onClick={handleSearch} style={styles.button} disabled={loading}>
//           {loading ? 'Loading...' : 'Search'}
//         </button>
//       </div>

//       {error && <p style={styles.error}>{error}</p>}

//       {filteredTeam && (
//         <div key={filteredTeam.team_key} style={styles.teamSection}>
//           <h2>{filteredTeam.team_name}</h2>
//           {filteredTeam.team_badge && (
//             <img
//               src={filteredTeam.team_badge}
//               alt={filteredTeam.team_name}
//               style={styles.teamLogo}
//             />
//           )}

//           <div style={styles.playersGrid}>
//             {filteredTeam.players.map((player) => (
//               <div key={player.player_key} style={styles.playerCard}>
//                 <h3>{player.player_name}</h3>
//                 {player.player_image && (
//                   <img
//                     src={player.player_image}
//                     alt={player.player_name}
//                     style={styles.playerImage}
//                   />
//                 )}
//                 <p><strong>Position:</strong> {player.player_type}</p>
//                 <p><strong>Country:</strong> {player.player_country}</p>
//                 <p><strong>Goals:</strong> {player.player_goals}</p>
//                 <p><strong>Matches Played:</strong> {player.player_match_played}</p>
//                 <p><strong>Age:</strong> {player.player_age}</p>
//                 <p><strong>Number:</strong> {player.player_number}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: '100vh',
//     padding: '10rem',
//     backgroundColor: '#f9fafb',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: '2.5rem',
//     marginBottom: '1rem',
//   },
//   searchBox: {
//     display: 'flex',
//     gap: '1rem',
//     marginBottom: '2rem',
//   },
//   input: {
//     padding: '0.8rem',
//     fontSize: '1rem',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     width: '250px',
//   },
//   button: {
//     padding: '0.8rem 1.5rem',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     backgroundColor: '#4f46e5',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '8px',
//   },
//   error: {
//     color: 'red',
//     marginTop: '1rem',
//   },
//   teamSection: {
//     marginTop: '2rem',
//     textAlign: 'center',
//   },
//   teamLogo: {
//     width: '150px',
//     margin: '1rem auto',
//     display: 'block',
//   },
//   playersGrid: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '1rem',
//     marginTop: '2rem',
//   },
//   playerCard: {
//     backgroundColor: '#fff',
//     padding: '1rem',
//     borderRadius: '8px',
//     width: '220px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     textAlign: 'center',
//   },
//   playerImage: {
//     width: '100%',
//     height: 'auto',
//     borderRadius: '50%',
//     marginBottom: '0.5rem',
//   },
// };

// export default TeamPlayers;





























import React, { useState } from 'react';

function TeamPlayers() {
  const [searchInput, setSearchInput] = useState('');
  const [leagueId, setLeagueId] = useState(''); // <-- NEW: League ID input
  const [teams, setTeams] = useState([]);
  const [filteredTeam, setFilteredTeam] = useState(null);
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
      console.log('Fetched Team Data:', data);

      if (Array.isArray(data)) {
        setTeams(data);
        if (searchInput.trim()) {
          const team = data.find((team) =>
            team.team_name.toLowerCase().includes(searchInput.toLowerCase())
          );
          setFilteredTeam(team || null);
          if (!team) setError('No team found.');
        }
      } else if (data.message) {
        setError(data.message);
      } else {
        setError('Unexpected error.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch team data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!teams.length) {
      fetchTeams();
    } else {
      const team = teams.find((team) =>
        team.team_name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredTeam(team || null);
      if (!team) setError('No team found.');
      else setError(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Search for a Football Team</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter League ID..(b/w 1 - 725)"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter team name..."
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {filteredTeam && (
        <div key={filteredTeam.team_key} style={styles.teamSection}>
          <h2>{filteredTeam.team_name}</h2>
          {filteredTeam.team_badge && (
            <img
              src={filteredTeam.team_badge}
              alt={filteredTeam.team_name}
              style={styles.teamLogo}
            />
          )}

          <div style={styles.playersGrid}>
            {filteredTeam.players.map((player) => (
              <div key={player.player_key} style={styles.playerCard}>
                <h3>{player.player_name}</h3>
                {player.player_image && (
                  <img
                    src={player.player_image}
                    alt={player.player_name}
                    style={styles.playerImage}
                  />
                )}
                <p><strong>Position:</strong> {player.player_type}</p>
                <p><strong>Country:</strong> {player.player_country}</p>
                <p><strong>Goals:</strong> {player.player_goals}</p>
                <p><strong>Matches Played:</strong> {player.player_match_played}</p>
                <p><strong>Age:</strong> {player.player_age}</p>
                <p><strong>Number:</strong> {player.player_number}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '6rem 2rem',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  searchBox: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '250px',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  teamSection: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  teamLogo: {
    width: '150px',
    margin: '1rem auto',
    display: 'block',
  },
  playersGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  playerCard: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    width: '220px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  playerImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '50%',
    marginBottom: '0.5rem',
  },
};

export default TeamPlayers;
