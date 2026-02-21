const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "resume_tracker",
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// GET ALL
app.get("/all", (req, res) => {
  db.query("SELECT * FROM applications ORDER BY applied_date DESC", (err, data) => {
    if (err) return res.send(err);
    res.send(data);
  });
});


// ADD
app.post("/add", (req, res) => {
  const { company, role, status } = req.body;

  // 🔐 Backend validation
  if (!company || !role || !status) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const validStatus = ["Applied", "Interview", "Offer", "Rejected"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  db.query(
    "INSERT INTO applications (company, role, status, applied_date) VALUES (?, ?, ?, CURDATE())",
    [company, role, status],
    (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("Added");
    }
  );
});


// DELETE
app.delete("/delete/:id", (req, res) => {
  db.query(
    "DELETE FROM applications WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.send(err);
      res.send("Deleted");
    }
  );
});

// UPDATE
app.put("/update/:id", (req, res) => {
  const { company, role, status } = req.body;

  // 🔐 Backend validation
  if (!company || !role || !status) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const validStatus = ["Applied", "Interview", "Offer", "Rejected"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  db.query(
    "UPDATE applications SET company=?, role=?, status=? WHERE id=?",
    [company, role, status, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Updated");
    }
  );
});


app.listen(5000, () => console.log("Server running on port 5000"));
