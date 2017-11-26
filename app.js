var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.static('public'));

var books = [{
    id: 1,
    title: 'Harry Potter',
    author: 'J.K.Rolyn',
    releaseDate: '2011-04-29',
    keywords: 'Harry'
}, {
    id: 2,
    title: 'A game of thrones',
    author: 'George Zheng',
    releaseDate: '2012-09-31',
    keywords: 'George'
}, {
    id: 3,
    title: 'Jane Ai',
    author: 'Jame',
    releaseDate: '2015-08-08',
    keywords: 'Jane'
}, {
    id: 4,
    title: 'Shemale',
    author: 'Sexy whore',
    releaseDate: '2018-07-05',
    keywords: 'ladyboy'
}];


app.get('/', function(req, res) {
    res.sendFile('index.html', function(err) {
        console.log('send file error' + err);
    });
});

app.get('/api/books', function(req, res) {
    res.send(books);
});

app.get('/api/books/:id', function(req, res) {
    var queryid = req.params.id;
    var result;
    books.forEach(function(element) {
        if (element && element.id && element.id === queryid) {
            result = element;
            return;
        }
    });
    res.send(result);
});

app.post('/api/books', function(req, res) {
    let title = req.body.title;
    let author = req.body.author;
    let releaseDate = req.body.releaseDate;
    let keywords = req.body.keywords;
    let id = books[books.length - 1].id + 1;

    var newBook = {
        id,
        title,
        author,
        releaseDate,
        keywords
    };
    books.push(newBook);
});

// app.put('/api/books', function(req, res) {

// });

app.delete('/api/books/:id', function(req, res) {
    var deleteid = req.params.id;
    var index = books.map(function(x) { 
    	return x.id; 
    }).indexOf(deleteid);

    books.splice(index, 1);
});
// app.get('/test', function(req, res) {
//     res.sendFile(__dirname + '/public/test.html', function(err) {
//         console.log('send file error' + err);
//     });
// });

// app.get('/person/:id', function(req, res) {
//     res.status(200).send('with id request get.');
// });

// app.get('/person', function(req, res) {
// 	res.status(200).send('without id request get.');
// });
// 
// app.post('/person', function(req, res) {
//     res.send('Got a POST request');
// });

// app.put('/person', function(req, res) {
//     res.send('Got a PUT request at /user');
// });

// app.delete('/person/:id', function(req, res) {
//     console.log(req.originalUrl);
//     console.log('get delete /person request.');
//     res.status(200).json({ result: 'Got a DELETE request at /person' });
// });

app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));