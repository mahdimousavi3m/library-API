const http = require("http");
const fs = require("fs"); 
const url = require("url"); 
const crypto = require("crypto"); 
const db = require("./db.json"); 
const { json } = require("stream/consumers");

const server = http.createServer((req , res) => {
       if(req.method === "POST" && req.url === "/api/books"){
          let body = ""; 

          req.on("data" , (data) => {
            body += data.toString() ; 
          }); 

          req.on("end" , () => {
            const book = JSON.parse(body); 

            const newBook = {
              id : crypto.randomUUID(), 
              ...book, 
              free : 1
            };

            db.books.push(newBook); 

            fs.writeFile("db.json" , JSON.stringify(db) , (err) => {
               if(err){
                throw err; 
               }

               console.log("newBookAdded"); 

               res.writeHead(201 , {"content-type" : "application/json"}); 
               res.write(JSON.stringify({message : "new book added"}));
               res.end();
            })
          }); 
        }; 

        if(req.method === "GET" && req.url === "/api/books"){
            fs.readFile("db.json" , "utf-8" , (err , data) => {
              if(err) {
                throw err;
                }
              
              let db = JSON.parse(data);

              const books = JSON.stringify(db.books); 

              console.log(books) ; 

              res.writeHead(200 , {"content-type" : "application/json"});
              res.write(books); 
              res.end(); 
            })
        }; 

        if(req.method === "DELETE" && req.url.startsWith("/api/books")){
          const parsedUrl = url.parse(req.url , true); 
          const bookId = parsedUrl.query.id;

          const newBooks  = db.books.filter((book) => book.id !== bookId); 
          

          if(newBooks.length === db.books.length){
            res.writeHead(404 , {"content-type" : "application/json"}); 
            res.write(JSON.stringify({message : "book not found!!"})); 
            res.end(); 
          }
          else {
            fs.writeFile("db.json" , JSON.stringify({
              ...db , 
              books : newBooks
            }), 
            (err) => {
              if(err){
                throw err; 
              }

              res.writeHead(200, {"content-type" : "application/json"});
              res.write(JSON.stringify({message : "Book deleted"})); 
              res.end(); 
            }
          )
          }
        }

        if(req.method === "PUT" && req.url.startsWith("/api/books")){
          const parsedUrl = url.parse(req.url , true); 
          const bookID = parsedUrl.query.id; 

          let body = ""; 

          req.on("data" , (data) => {
            body += data.toString(); 
          }); 

          req.on("end" , ()=> {
            const book = JSON.parse(body); 
            let isfound = false; 
            db.books.forEach((bookItem) => {
              if(bookItem.id === bookID){
                isfound = true; 

                bookItem.title = book.title; 
                bookItem.author = book.author; 
                bookItem.price = book.price; 
              }
            })

            if(isfound){
               fs.writeFile("db.json" , JSON.stringify(db) , (err) => {
                if(err){
                  throw err; 
                }

                res.writeHead(200 , {"content-type" : "application/json"});
                res.write(JSON.stringify({message : "Book Updated Successfully"}));
                res.end();  

               })
            }else{
                res.writeHead(404 , {"content-type" : "application/json"}); 
                res.write(JSON.stringify({message : "Book Not Found"})); 
                res.end(); 
            }

          });
        }

}); 


server.listen(3000 , () => {
  console.log("server running in port 3000")
})

          
        
            
