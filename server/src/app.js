const   express = require('express'),
        bodyParser = require('body-parser'),
        logger = require('morgan'),
        cors = require('cors'),
        port = process.env.PORT || 5000,
        posts = require('../routes/api/posts'),
        app = express();

require ('./passport');
require('./mongooseConnect');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/posts', posts);


app.listen(port, function (error) {
    if(error) {
        throw err;
    }
    console.log(`The Web Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
})