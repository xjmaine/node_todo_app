const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/todos', route);
// app.use('', route);

//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle 404 Errors
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });


  //run with: node --env-file .env app.js 
  /**
   * if run fail, comment env import in connection.js and uncomment hard coded db variables then
   * nope app.js
   */