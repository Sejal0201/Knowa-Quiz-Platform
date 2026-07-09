function Leaderboard() {
  const users = [
    {
      name: "Sejal",
      score: 98,
    },
    {
      name: "Rahul",
      score: 95,
    },
    {
      name: "Priya",
      score: 92,
    },
  ];

  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>

      {users.map((user, index) => (
        <div
          key={index}
          className="leaderboard-row"
        >
          <span>#{index + 1}</span>
          <span>{user.name}</span>
          <span>{user.score}%</span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;