/* eslint-disable no-mixed-spaces-and-tabs */
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('./app.js');

describe('Testing App module', () => {
  it('GET /apps with valid genres should return 200 with JSON', () => {
  	const query = 'genres=Card';
  	const expected = [
	    {
	        'App': 'Solitaire',
	        'Category': 'GAME',
	        'Rating': 4.7,
	        'Reviews': '254258',
	        'Size': '23M',
	        'Installs': '10,000,000+',
	        'Type': 'Free',
	        'Price': '0',
	        'Content Rating': 'Everyone',
	        'Genres': 'Card',
	        'Last Updated': 'August 1, 2018',
	        'Current Ver': '2.137.0',
	        'Android Ver': '4.1 and up'
	    }
    ];

  	return supertest(app)
  	  .get('/apps')
  	  .query(query)
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .then(res => {
  	  	expect(res.body).to.eql(expected);
  	  });
  });

  it('GET /apps with valid genres and is case insensitive should return 200 with JSON', () => {
  	const query = 'genres=card';
  	const expected = [
	    {
	        'App': 'Solitaire',
	        'Category': 'GAME',
	        'Rating': 4.7,
	        'Reviews': '254258',
	        'Size': '23M',
	        'Installs': '10,000,000+',
	        'Type': 'Free',
	        'Price': '0',
	        'Content Rating': 'Everyone',
	        'Genres': 'Card',
	        'Last Updated': 'August 1, 2018',
	        'Current Ver': '2.137.0',
	        'Android Ver': '4.1 and up'
	    }
    ];

  	return supertest(app)
  	  .get('/apps')
  	  .query(query)
  	  .expect(200)
  	  .expect('Content-Type', /json/)
  	  .then(res => {
  	  	expect(res.body).to.eql(expected);
  	  });
  });
  
  it('GET /apps with invalid genres should return 400', () => {
  	const query = 'genres=cool';

  	return supertest(app)
  	  .get('/apps')
  	  .query(query)
  	  .expect(400);
  });


});






