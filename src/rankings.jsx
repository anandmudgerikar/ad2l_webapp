import { useEffect, useState } from 'react';

export default function Rankings() {
  const [rankings, setRankings] = useState([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.25);

  useEffect(() => {
    // Fetch rankings data from your API or JSON file
    fetch('https://anandmudgerikar.github.io/ad2l_rankings_json_api/latest_player_rankings_dk.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        if (Array.isArray(data)) {
          setRankings(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleThresholdChange = (event) => {
    setConfidenceThreshold(parseFloat(event.target.value));
  };

  const filteredRankings = rankings.filter(player => player.rank_confidence > confidenceThreshold);

  return (
    <div className="container mx-auto p-4 ad2l-rankings">
      <h1 className="text-2xl font-bold mb-4 ad2l-title">AD2L Dota 2 Player Rankings</h1>
      <div className="mb-4">
        <label htmlFor="confidence-threshold" className="mr-2">MMR Confidence Value Cut-Off:</label>
        <input
          type="number"
          id="confidence-threshold"
          value={confidenceThreshold}
          onChange={handleThresholdChange}
          step="0.01"
          min="0"
          max="1"
          className="p-2 border rounded"
        />
      </div>
      <table className="min-w-full bg-white ad2l-table">
        <thead>
          <tr>
            <th className="py-2 ad2l-th">Rank</th>
            <th className="py-2 ad2l-th">Player Name</th>
            <th className="py-2 ad2l-th">Current MMR</th>
            <th className="py-2 ad2l-th">Rank Confidence</th>
            <th className="py-2 ad2l-th">Teams</th>
            <th className="py-2 ad2l-th">Reliable Base MMR?</th>
            <th className="py-2 ad2l-th">Base MMR</th>
          </tr>
        </thead>
        <tbody>
          {filteredRankings.length > 0 ? (
            filteredRankings.map((player, index) => (
              <tr key={index} className="text-center ad2l-tr">
                <td className="py-2 ad2l-td">{index + 1}</td>
                <td className="py-2 ad2l-td">{player.player_name}</td>
                <td className="py-2 ad2l-td">{player.mmr}</td>
                <td className="py-2 ad2l-td">{player.rank_confidence}</td>
                <td className="py-2 ad2l-td">{player.player_teams.join(', ')}</td>
                <td className="py-2 ad2l-td">{player.reliable_mmr ? 'Yes' : 'No'}</td>
                <td className="py-2 ad2l-td">{player.stratz_mmr}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-2 text-center ad2l-no-data">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}