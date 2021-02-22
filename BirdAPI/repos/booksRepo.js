let fs = require('fs');
const FILE_NAME = './assets/books.json'

let booksRepo = {
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });              
    },

    getById: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if (err){
                reject(err);  
            }
            else{
                let book = JSON.parse(data).find(b => b.id == id);
                resolve(book);
            }
        });
    },
    search: function (searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if (err){
                reject(err);
            }
            else {
                let books = JSON.parse(data);
                // Perform search 
                if (searchObject) {

                    books = books.filter(
                        b => (searchObject.id ? b.id == searchObject.id : true) &&
                            (searchObject.title ? b.title.toLowerCase().indexOf(searchObject.title.toLowerCase()) >= 0 : true));              

                }

                resolve(books);
            }
        });
    },

    insert: function(newData, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let books = JSON.parse(data);
                books.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(books), function (err) {
                    if (err) {
                        reject(err);       
                    }
                    else {
                        resolve(newData);
                    }                  
                });
            }
        });
    }


};

module.exports = booksRepo;