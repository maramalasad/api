const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');


const dotenv = require('dotenv');
dotenv.config();


// db
// mongodb://kaloraat:dhungel8@ds257054.mlab.com:57054/nodeapi
// MONGO_URI=mongodb://localhost/nodeapi
// mongodb+srv://kaloraat_admin:kkkkkk9@nodeapi-pbn7j.mongodb.net/nodeapi?retryWrites=truenodeAPI?retryWrites=true
// mongodb+srv://robertchou_admin:Aeiourc2491@nodeapi-p2o93.mongodb.net/nodeapi?retryWrites=true&w=majority
mongoose.connect(process.env.MONGO_URI).then(()=> console.log(`DB Connected`));
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


// middleware -
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/post/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});
