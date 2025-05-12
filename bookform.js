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

app.post('/books', (req, res) => {
  const { b_name, b_age } = req.body;

  const query = 'INSERT INTO books (b_name, b_age) VALUES (?, ?)';

  db.query(query, [b_name, b_age], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Failed to add book' });
    } else {
      res.status(201).json({
        message: 'Book added successfully!',
        book: { b_name, b_age },
      });
    }
  });
});

app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Failed to fetch books' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
