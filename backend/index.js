const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root@123",
  database:"resume_tracker",
  port:3307,
});

app.post("/add", (req,res)=>{
  const {company, role, status} = req.body;
  db.query(
    "INSERT INTO applications VALUES (NULL,?,?,?)",
    [company,role,status],
    ()=>res.send("Added")
  );
});

app.get("/all", (req, res) => {
  db.query(
    `SELECT company, role, status,
     CASE
       WHEN status='Applied'
       AND DATEDIFF(CURDATE(), applied_date) > 7
       THEN 'Follow up required'
       ELSE 'No follow up'
     END AS reminder
     FROM applications`,
    (err, data) => {
      if (err) return res.send(err);
      res.send(data);
    }
  );
});

app.listen(5000,()=>console.log("Server running"));
