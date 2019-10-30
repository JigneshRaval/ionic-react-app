const path = require('path'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 3002;
const jwt = require('jsonwebtoken');
// console.log('process.argv :', process.argv);
// console.log('process.env :', process.env, process.env.npm_package_config_myPort);

const bodyParser = require('body-parser');
const fs = require('fs');
const articleRoutes = require('./router/index');
// var cors = require('cors');
// const bookmarkRoutes = require('../server/router/bookmarks.router');

// Compress all the assets and server response
const compression = require('compression');
// app.use(cors());

/* Options route used for preflight request to the login POST route (cors) */
/* router.options("/*", (req, res, next) => {
    res.header('access-control-allow-origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('access-control-allow-methods', 'POST');
    // res.header('access-control-allow-headers', ' Accept, access-control-allow-origin, Content-Type');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    // res.sendStatus(204);
    next();
}); */

// compress all responses and files
app.use(compression());

// This will help to load other included files in index.html
app.use(bodyParser.json({ limit: '50mb' })); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.resolve(__dirname, 'public')));

// Caches the static files for a year.
// let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
// app.use('/', express.static(__dirname + '/public/', { maxAge: oneYear }));

/* app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('access-control-allow-methods', 'POST');
    res.header("Access-Control-Allow-Headers", "Accept, access-control-allow-origin, Content-Type, token, Origin, X-Requested-With");
    next();
}); */

// CORS middleware
// https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)


app.use('/api', articleRoutes);
// app.use('/api', bookmarkRoutes);

/* app.get('**', (req, res) => {
    // res.sendFile(path.resolve(__dirname, '../public', './index.html'));
    res.json({ message: 'Hi' });
});
 */

// Handle 404 Error
app.use(function (req, res) {
    res.status(400).send({ error: '404: File Not Found', message: "Plese Go Back to Home page." });
});

// Handle 500 Error
app.use(function (error, req, res, next) {
    res.status(500).send({ error: '500: Internal Server Error', message: error });
});

app.listen(port, () => { console.log(`App is listening on port http://localhost:${port}`) });


// 1. Car brands page ( cars.js )
/* router.get('/brands', function (req, res) {
    res.send('Audi, BMW, Mercedes')
});
app.use('/cars', require('./cars'))
// This app will respond to /cars/brands

// 2. router.index.js
router.use('/animals', require('./animals'))
router.use('/cars', require('./cars'))

router.get('/', function(req, res) {
  res.send('Home page')
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

// 3. finally
app.use(require('./router.index'))
*/
