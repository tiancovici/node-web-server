const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// Middleware that serves static
app.use(express.static(__dirname + '/public'));

// Middleware that logs requests to screen
app.use((req, res, next) => {
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;
   fs.appendFile('server.log', log + '\n');


   next();
});

// app.use((req, res, next) => {
//    res.render('maint.hbs');
//
// })

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
})

hbs.registerHelper('screamit', (text) => {
   return text.toUpperCase();
})

app.get('/', (req, res) => {
   res.render('home.hbs', {
      pageTitle: 'Home',
      welcomeMessage: 'Welcome Home!',
      currentYear: new Date().getFullYear()
   })
});

app.get('/about', (req,res) => {
   res.render('about.hbs', {
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear()
   })
});

app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to fullfill this request'
   })
});

port = 4200;
app.listen(port, () =>{
   console.log(`Server is up on port ${port}`);
});