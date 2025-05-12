const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'memberDB',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.post('/publishers', (req, res) => {
  const { p_name, country } = req.body;

  const query = 'INSERT INTO publishers (p_name, country) VALUES (?, ?)';

  db.query(query, [p_name, country], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Failed to add publisher' });
    } else {
      res.status(201).json({
        message: 'Publisher added successfully!',
        publisher: { p_name, country },
      });
    }
  });
});

app.get('/publishers', (req, res) => {
  const query = 'SELECT * FROM publishers';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Failed to fetch publishers' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
