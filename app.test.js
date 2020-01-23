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

  it('GET /apps with empty genres should return 400 error', () => {
    const query = 'genres=';
	
    return supertest(app)
      .get('/apps')
      .query(query)
      .expect(400);
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


  it('GET /sort with valid order on Apps should return 200 with JSON',()=>{
    const query='sort=App';
    return supertest(app)
      .get('/apps')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;
        let i=0;
        while (i < res.body.length - 1) {
          const APPAtI = res.body[i];
          const APPAtIPlus1 = res.body[i + 1];
          if (APPAtIPlus1.APP < APPAtI.APP) {
			  sorted = false;
			  break;
          }
          i++;
		  }
		  expect(sorted).to.be.true;
      });
  });
  it('GET /sort with valid order on rating for apps should return 200 with JSON',()=>{
    const query='sort=Rating';
    return supertest(app)
      .get('/apps')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;
        let i=0;
        while (i < res.body.length - 1) {
          const APPAtI = res.body[i];
          const APPAtIPlus1 = res.body[i + 1];
          if (APPAtIPlus1.Rating < APPAtI.Rating) {
			  sorted = false;
			  break;
          }
          i++;
		  }
		  expect(sorted).to.be.true;
      });
  });
  it('GET /sort with invalid sort should return 400', () => {
    const query = 'sort=cool2';
    return supertest(app)
	  .get('/apps')
	  .query(query)
	  .expect(400);
  });
});






