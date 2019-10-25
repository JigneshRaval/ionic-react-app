// server/router/bookmarks.router.js

const routes = require('express').Router();
const db = require('../db.config');


// GET /api
routes.get('/', (request, response) => {
    response.status(200).json({ message: 'Connected!' });
});


// GET : All Articles (/api/articles)
routes.get('/bookmarks', (request, response) => {
    // Find all documents in the collection
    db.bookmarks.find({}).sort({ date: -1 }).exec(function (err, docs) {

        if (err) {
            return err;
        }
        docs = docs.sort(date_sort_desc);

        response.status(200).send({ message: 'Fetched all the articles successfully', docs });
    });
});


// GET : Get Single Article by Id (/api/articles/:bookmarkId)
routes.get('/bookmarks/:bookmarkId', (request, response) => {
    // Find all documents in the collection
    db.bookmarks.find({ _id: request.params.bookmarkId }).exec(function (err, docs) {
        if (err) {
            return err;
        }
        response.status(200).send({ message: `bookmarks found by ID#${request.params.bookmarkId}`, docs });
    });
});


// CREATE : Create or Add new Article (/api/articles/add)
routes.post('/bookmarks/add', (request, response) => {
    // console.log('request.body ===========\n', request.body);
    var doc = {
        ...request.body
    };

    db.bookmarks.insert(doc, function (err, newDoc) {
        // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        if (err) {
            console.log('Error : ', err);
            return err
        }
        response.status(200).send({ message: 'New bookmark created successfully.', newDoc });
    });

});


// EDIT : Edit Article by Id (/api/articles/edit/:bookmarkId)
routes.post('/bookmarks/edit/:bookmarkId', (request, response) => {
    // let { title, sourceUrl, path, category, tags, excerpt, date, coverImage, type } = request.body;
    let newData = {
        date: new Date(),
        title: request.body.title,
        sourceUrl: request.body.sourceUrl,
        category: request.body.category,
        tags: request.body.tags,
        dateUpdated: new Date().getTime(),
        coverImage: request.body.coverImage,
        htmlCode: request.body.htmlCode,
        description: request.body.description
    }
    // Set an existing field's value
    db.bookmarks.update({ _id: request.params.bookmarkId }, { $set: newData }, { multi: false }, function (err, numReplaced) {
        if (err) {
            return err;
        } else {
            db.bookmarks.find({ _id: request.params.bookmarkId }).sort({ today: -1 }).exec(function (err, docs) {
                if (err) {
                    return err;
                }
                response.status(200).send({ message: 'Article ID#${request.params.bookmarkId} updated successfully.', docs });
            });
        }
    });
});


// DELETE : Delete article by id (/api/articles/delete/:bookmarkId)
routes.delete('/bookmarks/delete/:bookmarkId', (request, response) => {
    db.bookmarks.remove({ _id: request.params.bookmarkId }, {}, function (err, numRemoved) {
        if (err) {
            return err;
        }
        // Find all documents in the collection
        db.bookmarks.find({}).sort({ date: -1 }).exec(function (err, docs) {
            if (err) {
                return err;
            }
            docs = docs.sort(date_sort_desc);
            response.status(200).send({ status: 'OK', message: `Item ID#${request.params.bookmarkId} removed successfully from database.`, docs });
        });
    });
});


// Favorite : Edit Article by Id (/api/articles/edit/:bookmarkId)
routes.put('/bookmarks/favorite/:bookmarkId', (request, response) => {
    // Set an existing field's value
    db.bookmarks.update({ _id: request.params.bookmarkId }, { $set: { favorite: request.body.favorite } }, { multi: false }, function (err, numReplaced) {
        if (err) {
            return err;
        } else {
            db.bookmarks.find({ _id: request.params.bookmarkId }).sort({ today: -1 }).exec(function (err, docs) {
                if (err) {
                    return err;
                }
                response.status(200).send({ message: `Bookmark ID#${request.params.bookmarkId} marked as favorite.`, docs });
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
