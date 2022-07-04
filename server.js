const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


  // GET a random Quote.
  app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send( { quote: randomQuote} );
  });
  
  //GET all quotes or all quotes from an author.
  app.get('/api/quotes', (req, res, next) => {
    const query = req.query.person;
    const queryArray = [];
    if(query === undefined) {
        res.send({quotes: quotes});
    } else {
        for(let i =0; i < quotes.length; i++ ){
            if(quotes[i].person === query){
                queryArray.push(quotes[i]);
            }
        }
        res.send({quotes: queryArray});
    }
});

  
  //POST for adding new quotes.
  app.post('/api/quotes', (req, res, next) => {
    const query = req.query;
    const quoteQuery = query.quote;
    const nameQuery = query.person;
    if(quoteQuery !== '' && nameQuery !== '') {
        quotes.push({quote: quoteQuery, person: nameQuery});
        res.send({quote: { quote: quoteQuery, person: nameQuery}});
    }else {
        res.status(400).send();
    }
});

app.listen(PORT, () => console.log(`Simple server running on ${PORT}`));