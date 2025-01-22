# CINEMA PROJECT

## Description

CINEMA PROJECT is a web application that allows users to explore and discover movies. Users can search for movies, view top-rated movies, and contact the support team through a contact form. The application is built using HTML, CSS, JavaScript, and Node.js, with MongoDB as the database.

## Features

- **Home Page**: Welcome page with an introduction to the cinema experience.
- **Search Movies**: Real-time search functionality to find movies without reloading the page.
- **Top-Rated Movies**: Display a list of top-rated movies.
- **Contact Form**: Users can send messages to the support team.

## Project Structure
CINEMA PROJECT/
├── publique/
│ ├── api.js │
├── contact.html │
├── contact.js │
├── index.html │
├── index.js │
├── movie.bundle.js │ 
├── movie.html │ 
├── movie.js │
├── search.bundle.js │ 
├── search.html │
├── search.js │
├── serveur.js 
│ ├── styles.css │
├── top-movies.bundle.js │
└── webpack.config.js 
└── node_modules/ └── ...


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Esther-Assena-pro/CINEMA-PROJECT.git
   cd CINEMA-PROJECT
  2. Install dependencies:
      npm install

  3.Set up MongoDB:

Create a MongoDB Atlas account and set up a cluster.
Add your IP address to the whitelist.
Create a database user and get the connection string.
Configure the server:
   Update the MongoDB connection string in serveur.js:
              const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
4.Run server
               node publique/serveur.js
5.Open the application:

Open your browser and go to http://localhost:3000.

Usage

Home Page: Navigate to the home page to see the introduction.
Search Movies: Use the search bar to find movies in real-time.
Top-Rated Movies: View the list of top-rated movies.
Contact Form: Fill out the contact form to send a message to the support team.

  Contributing
1.Fork the repository:

Go to the GitHub page of the repository and click the "Fork" button at the top right corner of the page.
Create a new branch:

2.Create a new branch for your feature or bug fix:
    git checkout -b feature/contributecinema
3.Commit your changes:

Stage and commit your changes with a descriptive message:
    git add .
git commit -m "Add your commit message"

4.Push to the branch:

Push your changes to the remote repository:
  git push origin feature/contributecinema
  Create a pull request:

Go to the GitHub page of your forked repository, switch to the branch you created, and click the "New pull request" button. Follow the instructions to create the pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
For any questions or suggestions, please contact [assenacamela@gmail.com].




   
