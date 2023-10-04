//recipes api: edamam
var apiURL = 'https://developer.edamam.com/edamam-docs-recipe-api';
var apiKey = '46fa39f9b1266fd90b073f321a5e0b78';
var apiID = 'd71c5c9b'
var searchRecipeBtn = document.getElementById("recipe-button");
var searchRecipeInput = document.getElementById("recipe-input");

//If recipes have less then 20 recipes handles the differences
//and prevents us from having thousands of options at once
function displayRecipe(data) {
    var length;
    if (data.hits.length < 20) {
        length = data.hits.length;
    } else {
        length = 20;
    }
    for (var j = 0; j < length; j++) {
        var row = document.createElement('div');
        row.classList.add('row')
        var col = document.createElement('div');
        col.classList.add('col', 's12', 'm7')
        var card = document.createElement('div');
        card.classList.add('card', 'small');
        var cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        var image = document.createElement('img');
        image.src = data.hits[j].recipe.image;
        var span = document.createElement('span');
        span.classList.add('card-title', 'black-text');
        span.textContent = data.hits[j].recipe.label;
        var recipeInfo = document.createElement('span');
        recipeInfo.classList.add('card-title', 'black-text');
        recipeInfo.textContent = data.hits[j].recipe.dietLabels[0];
        var cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = `Cuisine type: ${data.hits[j].recipe.cuisineType[0]}`;
        var paragraph = document.createElement('p');
        cardContent.append(paragraph);
        cardContent.append(recipeInfo);
        paragraph.textContent = `Calories: ${Math.round(data.hits[j].recipe.calories)}`;
        var cardAction = document.createElement('div');
        cardAction.classList.add('card-action');
        var anchor = document.createElement('a');
        //COME BACK HERE
        anchor.href = "#"
        document.querySelector('.card-container').append(row);
        row.append(col);
        col.append(card);
        card.append(cardImage, cardContent, cardAction);
        cardImage.append(image, span);
        // cardAction.append(anchor)
    }

}

function recipeSearch() {
    fetch(`https://api.edamam.com/api/recipes/v2?q=${searchRecipeInput.value}&app_id=${apiID}&app_key=${apiKey}&type=public`)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            displayRecipe(data);

        }).catch(error => {
            console.log(error);
        })
}

searchRecipeBtn.addEventListener("click", recipeSearch);



//Wine pairing API
var api2URL = 'https://spoonacular.com/food-api/docs#Wine-Pairing'
var api2Key = '79dd044172b342eab0fc7efd361ced06'
var searchWineInput = document.getElementById("food-input");
var searchWineBtn = document.getElementById("wine-button");
var wineList = document.getElementById("wine-ul");

//function that searches for a wine type
function wineSearch() {
    fetch("https://api.spoonacular.com/food/wine/pairing?food=" + searchWineInput.value + "&apiKey=79dd044172b342eab0fc7efd361ced06")
        .then(response => {
            console.log("RESPONSE: ", response);
            return response.json();
        }).then(data => {
            console.log(data)
            //loops over the wine types that would go well with the searched food
            for (let i = 0; i < data.pairedWines.length; i++) {
                var liEl = document.createElement("li");
                liEl.innerHTML = data.pairedWines[i];
                wineList.appendChild(liEl);
            }

            //gives a description about the wine
            var descriptionEl = document.createElement("p");
            descriptionEl.textContent = data.pairingText;
            liEl.appendChild(descriptionEl);
        })
        .catch(error => {
            console.log(error);
        });
}

//button that listens for a search
searchWineBtn.addEventListener("click", wineSearch);


//for recent search history 
var pastMeals = [];