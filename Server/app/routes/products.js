module.exports = function(app){
  
    app.get('/products', function(request, response){
       response.send("Simple Call products Route from Here!");
    });
  
    app.get('/posts', function(request, response){
       response.send("Simple Call posts Route from Here!");
    });
}