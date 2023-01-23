const express = require('express')
const app = express();
//Documenting logs
const morgan = require('morgan');
const bodyParser = require('body-parser');
//connecting mongoose
const mongoose = require('mongoose');

const clientRoutes = require('./api/routes/clients');
const { mongo } = require('mongoose');
//the connection to mongoDB
const LOCALHOST= '127.0.0.1'
mongoose.connect(`mongodb://${LOCALHOST}:27017/Client_Database`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set('strictQuery', true);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow_Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
}); 


// Routes which should handle requests
app.use('/clients', clientRoutes);

//For errors that pass the routes because they are not caught by the routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status=404;
    next(error);
})

//For handling errors from before or handling different errors from the application (for failed operations)
app.use((error, req, res, next) => {
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message

        }
    })
});

module.exports = app;