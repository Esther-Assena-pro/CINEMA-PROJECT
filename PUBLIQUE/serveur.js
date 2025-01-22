const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Sers les fichiers statiques depuis le répertoire publique

// MongoDB connection
const mongoURI = 'mongodb+srv://assenacamela:Z11VVWeVraLsR1H5@esther1.3hc9a.mongodb.net/?retryWrites=true&w=majority&appName=Esther1'; // Remplacez par votre URI de connexion MongoDB
mongoose.connect(mongoURI)
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
  res.sendFile(path.join(__dirname, 'index.html')); 
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