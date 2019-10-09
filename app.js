const express = require('express');
const morgan = require('morgan');
const appData = require('./app-data.js');
const app = express();
const cors = require('cors');
// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('common'));
app.use(cors())

app.get('/apps', (req, res) => {
    // get the mark from the query
    const { sort, genres } = req.query;
    let appFilter = [...appData];

    if ('genres' in req.query) {
    // do some validation
        if (!['Action','Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
        // mark is required
        return res
            .status(400)
            .send('Provide genres');
        }
    }
    // do some validation
    // if (!genres) {
    //     // mark is required
    //     return res
    //       .status(400)
    //       .send('Please provide genres');
    //   }

      if (genres) {
        appFilter = appData.filter(app =>
          app.Genres.toLowerCase().includes(genres.toLowerCase())
        );
      }
    
      
      if ('sort' in req.query) {
        // do some validation
            if (!['Rating','App'].includes(sort)) {
            // mark is required
            return res
                .status(400)
                .send('Provide sort with rating or app name');
            }
        
        if (sort === 'Rating'){
            appFilter.sort((a, b) => {
                return a.Rating - b.Rating
            })
        }
        if (sort === 'App') { 
            appFilter.sort(function(a, b) 
            { 
            if (a.App < b.App) { return -1;} 
            if (a.App > b.App) { return 1;} 
                return 0; 
            }); 
            }
        res.json(appFilter)
    }
});
  
module.exports = app; 