const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
const passport = require('./models/passport/passportuser');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));
const port = process.env.PORT || 3001;

mongoose.connect(process.env.DB,
{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Database connected successfully'))
	.catch(err => console.log(err)
);

app.use(logger('dev'));
app.use( session({ secret: 'whatthehellisthis' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use('/api', routes);
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
app.use((err, req, res, next) => {
    console.log(err);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => { console.log('Server running on port ' + port) });