const express = require('express');
const morgan = require('morgan');
const appData = require('./app-data.js');
const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('common'));


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
        
            if (sort){
                appFilter.sort((Rating, App) =>{
                    if (Rating[sort]> App[sort]) {return -1;}
                    if (Rating[sort]< App[sort]) {return -1;}
                    return 0;
                })
            }
        res.json(appFilter)
    }
});
  
app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});