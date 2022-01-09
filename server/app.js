const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const authRoutes = require('./routes/authRoutes')
const classRoutes = require('./routes/classRoutes')
const userRoutes = require('./routes/userRoutes')


const PORT = process.env.PORT || 3344;
const MONGOURI = "mongodb://127.0.0.1:27017/cms"
const app = express();



app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
})


app.get('/', (req, res, next) => {
    // console.log(getSocket.getIO());
    res.json({message: 'hello'});

})
app.use(authRoutes)
app.use(classRoutes)
app.use(userRoutes)


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;


    if (error.errors) {
        res.status(status).json({
            message: message,
            error: error.errors
        })
    } else {
        res.status(status).json({
            message: message
        })
    }


    res.status(500);

})


mongoose.connect(MONGOURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


console.log(`connected! at post ${PORT}`)
let server = app.listen(PORT)
