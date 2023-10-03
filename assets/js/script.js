//recipes api: edamam
//https://developer.edamam.com/edamam-docs-recipe-api

// var apiURL = 'https://api.edamam.com/api/recipes/v2.';
// var apiKey = '';


//Wine pairing API
var api2URL = 'https://spoonacular.com/food-api/docs#Wine-Pairing'
var api2Key = '79dd044172b342eab0fc7efd361ced06'
var searchWineInput = document.getElementById("food-input");
var searchWineBtn = document.getElementById("wine-button");
var wineList = document.getElementById("wine-ul");

//function that searches for a wine type
function wineSearch() {
    console.log(api2Key);
    fetch("https://api.spoonacular.com/food/wine/pairing?food=" + searchWineInput.value + "&apiKey=79dd044172b342eab0fc7efd361ced06")
    .then(response => {
        console.log("RESPONSE: ", response);
        return response.json();
    }).then(data => {
        //loops over the wine types that would go well with the searched food
        for (let i = 0; i < data.pairedWines.length; i++) {
            var liEl = document.createElement("li");
            liEl.innerHTML = data.pairedWines[i];
            wineList.appendChild(liEl);
        }

        //gives a description about the wine
        var descriptionEl = document.createElement("p");
        descriptionEl.textContent = data.productMatches[0].description;
        liEl.appendChild(descriptionEl);
    })
    .catch(error => {
        console.log(error);
    });
}

//button that listens for a search
searchWineBtn.addEventListener("click", wineSearch);
