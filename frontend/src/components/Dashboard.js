function Dashboard({ apps }) {
  const total = apps.length;
  const interviews = apps.filter((a) => a.status === "Interview").length;
  const offers = apps.filter((a) => a.status === "Offer").length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Interviews</h3>
        <p>{interviews}</p>
      </div>

      <div className="stat-card">
        <h3>Offers</h3>
        <p>{offers}</p>
      </div>
    </div>
  );
}

export default Dashboard;
