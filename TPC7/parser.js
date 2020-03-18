var fs = require('fs')

function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
};

for(var i = 1; i < 4; i++){
	var input = fs.readFileSync('q' + i + '.json').toString();
	var obj = JSON.parse(input)
	obj = normalize(obj)

	fs.writeFile('q' + i + '_normalized.json', JSON.stringify(obj, null, 2), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	})
}


//console.log(obj)
/*
axios.get('https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=SELECT+*+WHERE+%7B%0D%0A++++%3Ff+a+dbo%3AFilm.%0D%0A++++%3Ff+foaf%3Aname+%3Ffname.%0D%0A++++%3Ff+dbo%3Aabstract+%3Fabs.%0D%0A++++filter+%28lang%28%3Fabs%29%3D%22en%22%29.%0D%0A++++%3Ff+dbo%3Adirector+%3Fdir.%0D%0A++++%3Ff+dbo%3AmusicComposer+%3Fmusic.%0D%0A++++%3Ff+dbo%3Awriter+%3Fwriter.%0D%0A++++%3Ff+dbp%3Acountry+%3Fcountry.%0D%0A++++%3Ff+dbp%3Alanguage+%3Flang.%0D%0A%7D&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+')
.then(dados => 
		fs.writeFile('q1.json', JSON.stringify(dados.data, null, 2), function(err) {
		      if(err) {
		          return console.log(err);
		      }
		      console.log("The file was saved!");
		  })
		//console.log(dados.data)
	)
	.catch(e => console.log(e))
*/
