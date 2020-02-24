var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://www.semanticweb.org/joaopimentel/ontologies/2020/1/arquivo#>
  `;

var repositorio = 'http://localhost:7200/repositories/PRC-AM?query='

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `
  select ?s ?tit (count(?p) as ?count) where {
      ?s rdf:type :Obra .
      ?s :titulo ?tit .
      ?s :tem_partitura ?p . 
  } group by ?s ?tit
  order by desc(?count)
  `;
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(repositorio + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(obra => {return {id: obra.s.value.split('#')[1], tit: obra.tit.value, count: obra.count.value} })
      console.log(JSON.stringify(mydata))
      res.render('index', { obras: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});


router.get('/:id', function(req, res, next) {
  var id = req.params.id
  var partituras = `
  select ?s ?voz ?clave ?path where { 
    ?s rdf:type :Partitura.
    :${id} :tem_partitura ?s .
    ?s :path ?path .
    optional {
    	?s :voz ?voz .    
    }
    optional {
        ?s :clave ?clave .
    }
}`;

  /*var info = `
  select ?tit ?nome where { 
    ?s rdf:type :Obra.
    ?s :é_composta_por ?aut .
    ?aut :nome ?nome .
    ?s :titulo ?tit .
  } `;*/
  
  var encoded = encodeURIComponent(prefixes + partituras)
  axios.get(repositorio + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(partitura => {
        var v = ( typeof partitura.voz === 'undefined' ) ? '' : partitura.voz.value ;
        var c = ( typeof partitura.clave === 'undefined' ) ? '' : partitura.clave.value ;
        return {
          id: partitura.s.value.split('#')[1], 
          voz: v, 
          clave: c, 
          path: partitura.path.value} 
      })
      res.render('individual', { partituras: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});

module.exports = router;
