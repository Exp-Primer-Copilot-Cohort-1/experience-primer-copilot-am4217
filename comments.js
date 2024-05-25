// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Load comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Serve comments
app.get('/comments.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Parse POST data
app.use(bodyParser.urlencoded({ extended: true }));

// Add a comment
app.post('/comments.json', function(req, res) {
  comments.push(req.body);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Serve static files
app.use(express.static(__dirname));

// Start server
app.listen(3000);
console.log('Server is running at http://localhost:3000');