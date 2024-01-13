// index.js
const express = require('express');
const app = express();
const port = 3000; // Choose your desired port
const connectDB = require('./db');

connectDB(); // Call the function to connect to the database

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



