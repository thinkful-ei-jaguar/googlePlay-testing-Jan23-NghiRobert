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
  let filteredData = [ ...data ];
  const genresArray = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  // genre filtering
  if(genres) {
    if(!genresArray.includes(genres)){
      return res.status(400).json({error:'Genre has to be one of the following: Action,Puzzle,Strategy,Casual,Arcade,Card'});
    }
    
    filteredData = filteredData.filter(each=>each.Genres.includes(genres));
  } 
  // sort for rating and app
  if(sort) {
    if(sort !== 'Rating' && sort !== 'App')
    {
      return res.status(400).json({error: 'can only sort "Rating" or "App"'});
    }
    filteredData.sort((a,b) =>
      a[sort] < b[sort] ? -1 : 1);
  }


  // by default return data
  res.json(filteredData);
});

app.listen(8001, () => {
  console.log('listening on port 8001');
});