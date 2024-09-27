const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const countryRoutes = require('./routes/country');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');
const isAuth = require('./middlewares/isAuth');

const app = express();

app.use(express.json(), isAuth);

// app.use((req, res, next) => {
//     console.log('Request incoming!');
//     next();
// })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/countries', countryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

app.use(express.static('client'));
app.use('/', (req, res, next) => {
    const clientPath = path.join(__dirname, 'client', 'index.html');
    res.status(200).sendFile(clientPath);
})

app.use('/', (err, req, res, next) => {
    let statusCode = err.statusCode;
    let message = err.message;
    res.status(statusCode).json({ message: message });
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        const httpServer = app.listen(process.env.PORT || 8080, () => console.log('Server is ready'));
        require('./socketIO/socketio').init(httpServer);
        //const io = require('./socketIO/socketio').init(httpServer);
        // io.on('connection', socket => {
        //     console.log('Client connected!');
        // })
    })
    .catch(err => {
        //console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
        console.log(err)
    });
