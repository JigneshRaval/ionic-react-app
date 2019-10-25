// server/router/index.js

const routes = require('express').Router();
const db = require('../db.config');


// GET /api
routes.get('/', (request, response) => {
    response.status(200).json({ message: 'Connected!' });
});


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
