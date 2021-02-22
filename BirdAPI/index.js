
// Bring in express server & create application
 
let express = require('express');
let app = express();
let booksRepo = require('./repos/booksRepo');

// Use the express Router object
let router = express.Router();

// Conf middleware to support jSON data parsing in request object
app.use(express.json());

// Create GET to return a list of all books
router.get('/', function(req, res, next){
    booksRepo.get(function (data){
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All books retrieved.",
            "data": data
        });
            
    }, function (err) {
        next(err);
    });
});

// Create GET/search?id=num&title=str to search for books by 'id' and/or 'title'
router.get('/search', function(req, res, next){

    let searchObject = {
        "id": req.query.id,
        "title": req.query.title
    };

    booksRepo.search(searchObject, function (data){
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All books retrieved.",
            "data": data
        });
    }, function (err) {
    next(err);
    });
});


// Create GET/id to return a single book
router.get('/:id', function(req, res, next){
    booksRepo.getById(req.params.id, function (data){
        if (data){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single book retrieved.",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The book '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The book '" + req.params.id + "' could not be found.",                   
                }
            });

        }
            
    }, function (err) {
        next(err);
    });
});

router.post('/', function (req, res, next) {
    booksRepo.insert(req.body, function(data) {
        res.status(201).json({
            "status": 201,
                "statusText": "Created",
                "message": "New Book Added.",
                "data": data
        });
    }, function(err) {
        next(err);
    });

})

// All routes prefix with /api/v1
app.use('/api/', router);

// Create server to listen on port 6060
var server = app.listen(6060, function (){
    console.log('Node server is running on http://localhost:6060..');
});

