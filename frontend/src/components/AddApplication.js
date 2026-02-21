import { useState, useEffect } from "react";

function AddApplication({ saveApp, editApp }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editApp) {
      setCompany(editApp.company);
      setRole(editApp.role);
      setStatus(editApp.status);
    }
  }, [editApp]);

  const handleSubmit = () => {
    if (!company.trim()) {
      setError("Company name is required");
      return;
    }

    if (!role.trim()) {
      setError("Role is required");
      return;
    }

    setError(""); // clear error
    saveApp({ company, role, status });

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <div className="form-grid">
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      {error && <p className="error-text">{error}</p>}

      <button onClick={handleSubmit} disabled={!company || !role}>
        {editApp ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default AddApplication;
