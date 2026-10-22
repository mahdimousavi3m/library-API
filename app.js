const http = require("http");

// MVC
const bookRoutes = require("./Routes/bookRouts");
const userRoutes = require("./Routes/userRoutes");



const server = http.createServer((req, res) => {

  bookRoutes(req, res);
  userRoutes(req , res); 
  
});


server.listen(8000, () => {
  console.log("server running in port 8000")
})




