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
  if(genres===''){
    return res.status(400).json({error:'Please enter a genre.'});
  }
  if(genres) {
    if(!genresArray.find(each => each.toLowerCase().includes(genres.toLowerCase()))){
      return res.status(400).json({error:'Genre has to be one of the following: Action,Puzzle,Strategy,Casual,Arcade,Card'});
    }
    
    filteredData = filteredData.filter(each=>
      each.Genres.toLowerCase().includes(genres.toLowerCase()));
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

module.exports = app;