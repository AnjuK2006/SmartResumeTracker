import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import AddApplication from "./components/AddApplication";
import ApplicationList from "./components/ApplicationList";
import "./App.css";

function App() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editApp, setEditApp] = useState(null);

  const fetchApps = () => {
    fetch("http://localhost:5000/all")
      .then((res) => res.json())
      .then((data) => setApps(data));
  };

  useEffect(() => fetchApps(), []);

  const saveApp = (app) => {
    if (editApp) {
      fetch(`http://localhost:5000/update/${editApp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app),
      }).then(() => {
        setEditApp(null);
        fetchApps();
      });
    } else {
      fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app),
      }).then(() => fetchApps());
    }
  };

  const deleteApp = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    }).then(() => fetchApps());
  };

  const filteredApps = apps
    .filter((app) => filter === "All" || app.status === filter)
    .filter(
      (app) =>
        app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.role.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="app-bg">
      <div className="container">
        <h1 className="title">Smart Resume Tracker</h1>

        <Dashboard apps={apps} />

        <div className="card">
          <h2>{editApp ? "Update Application" : "Add Application"}</h2>
          <AddApplication saveApp={saveApp} editApp={editApp} />
        </div>

        <div className="card">
          <div className="top-bar">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <input
              type="text"
              placeholder="Search Company or Role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ApplicationList
            apps={filteredApps}
            onEdit={setEditApp}
            onDelete={deleteApp}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
