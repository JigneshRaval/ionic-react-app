// server/router/index.js

const routes = require('express').Router();
const db = require('../db.config');
const jwt = require('jsonwebtoken');

// MOCKING DB just for test
let users = [
    {
        _id: 1,
        name: 'Hiren',
        admin: true,
        username: 'test',
        password: 'test',
        image: ''
    },
    {
        _id: 2,
        name: 'Lalit',
        admin: false,
        username: 'admin',
        password: 'admin',
        image: ''
    }
];

// Generate Token using secret from process.env.JWT_SECRET
// process.env.JWT_SECRET = 'keyboard cat 4 ever'
function generateToken(user) {
    //1. Don't use password and other sensitive fields
    //2. Use fields that are useful in other parts of the
    // app/collections/models
    var u = {
        name: user.name,
        username: user.username,
        admin: user.admin,
        _id: user._id.toString(),
        image: user.image
    };

    return token = jwt.sign(u, 'keyboard cat 4 ever', {
        // expiresIn: 60 * 60 * 24 // expires in 24 hours
        expiresIn: 2000 // expires in 2000 milliseconds
    });
}

// GET /api
routes.get('/', (request, response) => {
    // res.header('Access-Control-Allow-Origin', '*');

    let token = request.headers.token || null;
    let user = users[0];
    if (!token || token === 'null') {
        return response.status(401).json({ message: 'Must pass token' });
    }

    // Check token that was passed by decoding token using secret
    jwt.verify(token, 'keyboard cat 4 ever', function (err, user) {
        console.log('Error : ', err);
        if (err) throw new Error('Error in verifing token.');

        response.status(200).send({
            success: true,
            error: null,
            user: user,
            token: token
        });

        //return user using the id from w/in JWTToken
        // User.findById({
        //     '_id': user._id
        // }, function (err, user) {
        //     if (err) throw err;
        //     user = utils.getCleanUser(user);
        //     //Note: you can renew token by creating new token(i.e.
        //     //refresh it)w/ new expiration time at this point, but I’m
        //     //passing the old token back.
        //     // var token = utils.generateToken(user);
        //     response.json({
        //         user: user,
        //         token: token
        //     });
        // });

    });
});

// LOGIN ROUTE
routes.post('/login', (req, res) => {
    const { username, password } = req.body;
    // res.header('Access-Control-Allow-Origin', '*');

    // Use your DB ORM logic here to find user and compare password
    for (let user of users) { // I am using a simple array users which i made above
        if (username === user.username && password === user.password /* Use your password hash checking logic here !*/) {
            // If all credentials are correct do this
            // jwt.sign(payload, secretOrPrivateKey, [options, callback])
            // let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 2000 }); // Sigining the token
            let token = generateToken(user);
            res.json({
                success: true,
                error: null,
                token
            });
            break;
        }
        else {
            res.status(401).json({
                success: false,
                token: null,
                error: 'Username or password is incorrect'
            });
        }
    }
});

routes.post('/signup', function (req, res, next) {
    var body = req.body;

    // var hash = bcrypt.hashSync(body.password.trim(), 10);

    var user = {
        name: body.name.trim(),
        username: body.username.trim(),
        email: body.email.trim(),
        // password: hash,
        password: body.password.trim(),
        admin: false,
        isEmailVerified: false
    };

    db.articles.insert(user, function (err, newDoc) {
        // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        if (err) {
            console.log('Error in creating new user : ', err);
            return err
        }
        var token = utils.generateToken(user);

        res.status(200).send({
            message: 'New user created successfully.',
            user: newDoc,
            token: token
        });

    });
});

// https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
/* routes.post('/register', function (req, res) {
    db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
    ],
        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
}); */

/* router.post('/register-admin', function (req, res) {
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ],
        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
}); */

/* router.post('/login', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
    });
}); */

// GET : All Articles (/api/articles)
routes.get('/articles', (request, response) => {
    // Find all documents in the collection
    db.articles.find({}).sort({ date: -1 }).exec(function (err, docs) {

        if (err) {
            return err;
        }
        docs = docs.sort(date_sort_desc);

        response.status(200).send({ message: 'Fetched all the articles successfully', docs });
    });
});

// GET : All tags (/api/articles/tags)
routes.get('/articles/tags', (request, response) => {
    // Find all documents in the collection
    db.articles.find({}).sort({ date: -1 }).exec(function (err, docs) {

        const uniqueTags = docs.map((article) => article.tags)
            .reduce((allTags, tags) => allTags.concat(tags), [])
            .reduce((uniqtags, tag) => {
                uniqtags[tag.trim()] = (uniqtags[tag.trim()] || 0) + 1
                return uniqtags;
            }, {});

        // OUTPUT : {JavaScript: 3, ES6: 3, React: 1, Form: 1}

        response.status(200).send({ message: 'Fetching all the tags :', tags: uniqueTags });
    });
});


// GET : Get Single Article by Id (/api/articles/:articleId)
routes.get('/articles/:articleId', (request, response) => {
    // Find all documents in the collection
    db.articles.find({ _id: request.params.articleId }).exec(function (err, docs) {
        if (err) {
            return err;
        }
        response.status(200).send({ message: `Article found by ID#${request.params.articleId}`, docs });
    });
});


// CREATE : Create or Add new Article (/api/articles/add)
routes.post('/articles/add', (request, response) => {
    // console.log('request.body ===========\n', request.body);
    var doc = {
        ...request.body
    };

    db.articles.insert(doc, function (err, newDoc) {
        // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        if (err) {
            console.log('Error : ', err);
            return err
        }
        response.status(200).send({ message: 'New article created successfully.', newDoc });
    });

});


// EDIT : Edit Article by Id (/api/articles/edit/:articleId)
routes.post('/articles/edit/:articleId', (request, response) => {
    // let { title, sourceUrl, path, category, tags, excerpt, date, coverImage, type } = request.body;
    let newData = {
        date: new Date(),
        title: request.body.title,
        sourceUrl: request.body.sourceUrl,
        path: request.body.path,
        category: request.body.category,
        tags: request.body.tags,
        author: request.body.author,
        excerpt: request.body.excerpt,
        dateUpdated: new Date().getTime(),
        coverImage: request.body.coverImage,
        type: request.body.type,
        htmlCode: request.body.htmlCode,
        markdownCode: request.body.markdownCode
    }
    // Set an existing field's value
    db.articles.update({ _id: request.params.articleId }, { $set: newData }, { multi: false }, function (err, numReplaced) {
        if (err) {
            return err;
        } else {
            db.articles.find({ _id: request.params.articleId }).sort({ today: -1 }).exec(function (err, docs) {
                if (err) {
                    return err;
                }
                response.status(200).send({ message: 'Article ID#${request.params.articleId} updated successfully.', docs });
            });
        }
    });
});


// DELETE : Delete article by id (/api/articles/delete/:articleId)
routes.delete('/articles/delete/:articleId', (request, response) => {
    db.articles.remove({ _id: request.params.articleId }, {}, function (err, numRemoved) {
        if (err) {
            return err;
        }
        // Find all documents in the collection
        db.articles.find({}).sort({ date: -1 }).exec(function (err, docs) {
            if (err) {
                return err;
            }
            docs = docs.sort(date_sort_desc);
            response.status(200).send({ status: 'OK', message: `Item ID#${request.params.articleId} removed successfully from database.`, docs });
        });
    });
});


// Favorite : Edit Article by Id (/api/articles/edit/:articleId)
routes.put('/articles/favorite/:articleId', (request, response) => {
    // Set an existing field's value
    db.articles.update({ _id: request.params.articleId }, { $set: { favorite: request.body.favorite } }, { multi: false }, function (err, numReplaced) {
        if (err) {
            return err;
        } else {
            db.articles.find({ _id: request.params.articleId }).sort({ today: -1 }).exec(function (err, docs) {
                if (err) {
                    return err;
                }
                response.status(200).send({ message: 'Article ID#${request.params.articleId} marked as favorite.', docs });
            });
        }
    });
});


// Utility functions
// Now we will define our date comparison functions. These are callbacks
// that we will be providing to the array sort method below.
var date_sort_asc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates. This was news to me.
    if (new Date(date1.date) > new Date(date2.date)) return 1;
    if (new Date(date1.date) < new Date(date2.date)) return -1;
    return 0;
};

var date_sort_desc = function (date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (new Date(date1.date) > new Date(date2.date)) return -1;
    if (new Date(date1.date) < new Date(date2.date)) return 1;
    return 0;
};

module.exports = routes;
