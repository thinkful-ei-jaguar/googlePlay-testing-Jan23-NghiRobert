// require local depencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const data = require('./data.js');

// create object to communicate with express
const app = express();

// enable use of middleware and CORS for requests
app.use(morgan('dev'));
app.use(cors());

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query;
  const filteredData = [ ...data ];
  // sort for rating and app
  if(sort === 'Rating' || sort === 'App') {

    filteredData.sort((a,b) =>
      a[sort] < b[sort] ? -1 : 1);
  }

  // by default return data
  res.json(filteredData);
});

app.listen(8001, () => {
  console.log('listening on port 8001');
});