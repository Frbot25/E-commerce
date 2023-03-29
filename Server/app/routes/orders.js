module.exports = function(app){
  
    app.get('/cart', function(request, response){
       response.send("Simple Call cart Route from Here!");
    });
  
    app.get('/posts', function(request, response){
       response.send("Simple Call posts Route from Here!");
    });
}