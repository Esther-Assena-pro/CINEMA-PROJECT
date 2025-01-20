const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'publique')));

// MongoDB connection
const mongoURI = 'your_mongodb_connection_string'; // Remplacez par votre URI de connexion MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publique', 'index.html'));
});

app.post('/contact', (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  newContact.save()
    .then(() => res.json({ msg: 'Message received' }))
    .catch(err => res.status(400).json({ error: 'Unable to save message' }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});