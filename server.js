const express= require('express');
const hbs= require('hbs');
const fs= require('fs');
const port= process.env.PORT || 80;

var app= express();

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now= new Date().toString();
    var log= `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+ '\n', (err) => {
        if(err)
            console.log('Unable to append to file log.server');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

//Render Home Page
app.get('/', (req, res) =>{
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Hey! Welcome to Express Server.'
    });
});

//Listen on port 80
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});