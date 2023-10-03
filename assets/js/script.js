//recipes api: edamam
//https://developer.edamam.com/edamam-docs-recipe-api

//wine pairing api
//https://spoonacular.com/food-api/docs#Wine-Pairing


// fetch("https://api.spoonacular.com/food/wine/pairing&apiKey=79dd044172b342eab0fc7efd361ced06", {
// 	"method": "GET",
// 	})
	
// .then(response => {
// 	return response.json()
// }).then(data => {
// 	console.log(data);
// })
// .catch(err => {
// 	console.log(err);
// });



var apiURL = `https://api.edamam.com/search?q=chicken&app_id=d71c5c9b&app_key=8263d46e5519d613cf064215c7994aa4&from=0&to=3&calories=591-722&health=alcohol-free`;
var apiKey1 = '46fa39f9b1266fd90b073f321a5e0b78';
var appID1 = 'd71c5c9b';
var searbarhEl = document.querySelector('#search-form');
var ingredientEl = document.querySelector('.ingredient')
var ingredient2El = document.querySelector('.ingredient2')
var table1El = document.querySelector('#step1')


function getRecipe(food) {
    fetch("https://api.edamam.com/search?q=chicken&app_id=d71c5c9b&app_key=8263d46e5519d613cf064215c7994aa4&from=0&to=3&calories=591-722")
        .then (function (response) {
            return response.json()
        })
        .then (function (data) {
            console.log(data);
            var ingredient1 = document.createElement('td');
            ingredient1.textContent = data.hits[0].recipe.ingredientLines[0];
            ingredient2El.textContent = data.hits[0].recipe.ingredientLines[1];
            table1El.appendChild(ingredient1)
        })
        

}

getRecipe();

console.log('Hello');
