const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { response } = require('express');



const app = express()
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Kalyan'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Kalyan'
    });
});

app.get('/help' , (req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Kalyan',
        message : 'This paragraph is coming from the dynamic data . It is very nice to send this data . Also i need to test it in my browser'
    })
});

app.get('/weather',(req,res) => {

    if(!req.query.address) {
        return res.send({
            error : 'Address Must be Provided'
        })
    }
    geoCode(req.query.address,(error,{ latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }


        forecast(latitude,longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

            res.send(
                {
                    location,
                    forecast : forecastData,
                    address : req.query.address
                }
            );
        })
       
    });
   
});


app.get('/help/*',(req,res) => {
    res.render('four-zero-four',{
        title : '404',
        name : 'Kalyan',
        errorText : 'Help Article not found'
    });
});

app.get('*',(req,res) => {
    res.render('four-zero-four',{
        title : '404',
        name : 'Kalyan',
        errorText : 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port '+ port);
});