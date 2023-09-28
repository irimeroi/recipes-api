fetch("https://v3.football.api-sports.io/fixtures?live=all", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "71225f895694489bad3c82b84425c843"
	}
})
.then(response => {
	console.log(response);
    return response.json ()
})
.then(function (data){
console.log (data)
}) 
.catch(err => {
	console.log(err);
});

