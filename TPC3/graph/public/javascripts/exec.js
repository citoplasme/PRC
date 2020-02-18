var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`
// PREFIX h: <http://www.semanticweb.org/joaopimentel/ontologies/2020/1/advogados#>

var genLink = 'http://localhost:7200/repositories/' //"PRCAdvogados" + "?query="

//var query = 'SELECT ?nome WHERE { ?adv h:nome ?nome . } '
/*
SELECT * {
   ?a ?b ?c .
}
*/ 

$(document).ready(function(){
    $("#exec").click(function(){
        var query = $("#query").val()
        var repositorio = $("#repositorio").val()
        var link = genLink + repositorio + '?query=' 
        var encoded = encodeURIComponent(prefixes + query)
        axios.get('http://localhost:3000/query?query=' + link + encoded)
            .then(function(dados){
                d = JSON.stringify(dados.data)
                $("#results").val(d);
            })
            .catch(function(error){
                $("#results").val(error);
            })
        //alert(link + encoded);
        //$("#results").val(link + encoded);
    });
  });