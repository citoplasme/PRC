var express = require('express');
var router = express.Router();

var axios = require('axios')

var genLink = 'http://localhost:7200/repositories' //"PRCAdvogados" + "?query="

router.get('/', function(req, res, next){
  axios.get(genLink)
    .then(function(dados){
      response = []
      dados.data.results.bindings.forEach(element => { 
        response.push(element.id.value)
      });
      res.render('index', {repositorios : response})
    })
    .catch(erro => res.render('error', {error : erro}))
})


router.get('/query', function(req, res, next){
  var query = req.query.query
  var partes = query.split('?query=')
  var path = partes[0] + '?query='
  var encoded = encodeURIComponent(partes[1])

  axios.get(path + encoded)
    .then(function(dados){
      res.jsonp(dados.data)
    })
    .catch(erro => res.jsonp(erro))
  })
module.exports = router;
