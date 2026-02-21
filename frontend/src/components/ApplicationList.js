function getBadgeClass(status) {
  switch (status) {
    case "Applied":
      return "badge blue";
    case "Interview":
      return "badge orange";
    case "Offer":
      return "badge green";
    case "Rejected":
      return "badge red";
    default:
      return "badge";
  }
}

function ApplicationList({ apps, onEdit, onDelete }) {
  return (
    <div>
      {apps.map((app) => (
        <div key={app.id} className="app-row">
          <div>
            <strong>{app.company}</strong> — {app.role}
          </div>

          <div className={getBadgeClass(app.status)}>
            {app.status}
          </div>

          <div>
            <button onClick={() => onEdit(app)}>Edit</button>
            <button
              className="delete-btn"
              onClick={() => onDelete(app.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;
