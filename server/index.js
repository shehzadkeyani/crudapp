const express = require("express");
const bodyParser = require("body-parser");
const cors = require ("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool(
  {
    host: "localhost",
    user: "newuser",
    password: "newpassword",
    database: "skdb",
  }
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM tblride";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
  console.log("WOW app.get called");
});

app.post("/api/insert", (req, res) => {
  const svarPloc = req.body.svarPloc;
  const svarDloc = req.body.svarDloc;
  const svarFareAmt = req.body.svarFareAmt;
  const svarSpNotes = req.body.svarSpNotes;

  const sqlInsert = "INSERT INTO tblride (tcPloc, tcDloc, tcFareAmt, tcSpNotes) VALUES (?,?,?,?)";
  db.query (sqlInsert, [svarPloc, svarDloc, svarFareAmt, svarSpNotes], (err, result) => {console.log(result);});
  console.log("app.post called");
});


app.put("/api/update", (req, res) => {
  const skvar1 = req.body.sksvar1;
  const skvar2 = req.body.sksvar2;
  const skvar3 = req.body.sksvar3;
  const skvar4 = req.body.sksvar4;

  const sqlUpdate = "UPDATE tblride SET tcPloc=?, tcDloc=?, tcFareAmt=?, tcSpNotes=? WHERE tcPloc=?";
  db.query(sqlUpdate, [skvar1, skvar2, skvar3, skvar4, skvar1] , (err, result) => {
    if (err) console.log(err);
  });
});


app.delete(`/api/delete/:skvar`, (req, res) => {
  const skvarloc = req.params.skvar;
  const sqlDelete = "DELETE FROM tblride WHERE tcPloc = ?";
  
  db.query (sqlDelete, skvarloc, (err, result) => {
    if (err) console.log (err);
  });
});

app.listen(3001, ()=>{console.log("Running SK on Port 3001");});
