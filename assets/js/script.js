//recipes api: edamam
var apiURL = 'https://developer.edamam.com/edamam-docs-recipe-api';
var apiKey = '508d7bf995bde1dcad83d2168ac464c4';
var apiID = '52921d28'
var searchRecipeBtn = document.getElementById("recipe-button");
var searchRecipeInput = document.getElementById("recipe-input");
const historyEl = document.getElementById("show-history");

//If recipes have less then 20 recipes handles the differences
//and prevents us from having thousands of options at once
function displayRecipe(data) {
    var length;
    document.querySelector('.card-container').innerHTML = '';
    if (data.hits.length < 20) {
        length = data.hits.length;
    } else {
        length = 20;
    }
    for (var j = 0; j < length; j++) {
        var row = document.createElement('div');
        var col = document.createElement('div');
        var card = document.createElement('div');
        card.classList.add('card', 'medium');
        var cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        var image = document.createElement('img');
        image.src = data.hits[j].recipe.image;
        var span = document.createElement('span');
        span.classList.add('black-text', "card-title");
        span.textContent = data.hits[j].recipe.label;
        var cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = `Cuisine type: ${data.hits[j].recipe.cuisineType[0]}`;
        var paragraph = document.createElement('p');
        paragraph.textContent = `Calories: ${Math.round(data.hits[j].recipe.calories)}`;
        cardContent.append(paragraph);
        var cardAction = document.createElement('div');
        cardAction.classList.add('card-action');
        var anchor = document.createElement('a');
        anchor.href = data.hits[j].recipe.shareAs;
        document.querySelector('.card-container').append(row);
        row.append(col);
        col.append(card);
        card.append(cardImage, span, cardContent, cardAction);
        cardImage.append(image);
        cardAction.append(anchor)
        anchor.textContent = "Click Me for Recipe";
        anchor.target = "_blank";
    }
}

function handleSearch(e) {
    e.preventDefault();
    console.log(e)
    let searchTerm = searchRecipeInput.value;
    if (!searchTerm) {
        return;
    }
    recipeSearch(searchTerm);
    wineSearch(searchTerm);
}

function recipeSearch(searchTerm) {
    fetch(`https://api.edamam.com/api/recipes/v2?q=${searchTerm}&app_id=${apiID}&app_key=${apiKey}&type=public`)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            displayRecipe(data);
            history(searchTerm);
        }).catch(error => {
            console.log(error);
        })
}//Wine pairing API
var api2URL = 'https://spoonacular.com/food-api/docs#Wine-Pairing'
var api2Key = '79dd044172b342eab0fc7efd361ced06'
var searchWineInput = document.getElementById("food-input");
var searchWineBtn = document.getElementById("wine-button");
var wineList = document.getElementById("wine-ul");

//function that searches for a wine type
function wineSearch(searchTerm) {
    fetch("https://api.spoonacular.com/food/wine/pairing?food=" + searchTerm + "&apiKey=79dd044172b342eab0fc7efd361ced06")
        .then(response => {
            console.log("RESPONSE: ", response);
            return response.json();
        }).then(data => {
            console.log(data)
            wineList.textContent = "";
            if (data.status === "failure") {
                var errorEl = document.createElement("p");
                errorEl.textContent = data.message;
                wineList.appendChild(errorEl);
            } else {
                //loops over the wine types that would go well with the searched food
                for (let i = 0; i < data.pairedWines.length; i++) {
                    var liEl = document.createElement("li");
                    liEl.innerHTML = data.pairedWines[i];
                    wineList.appendChild(liEl);
                }

                //gives a description about the wine
                var descriptionEl = document.createElement("p");
                descriptionEl.textContent = data.pairingText;
                wineList.appendChild(descriptionEl);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

//array to store recent search history 
var pastMeals = [];

//three functions to collect, store, and output past search history for user to gather again
function history(searchTerm) {
    if (pastMeals.indexOf(searchTerm) !== -1) {
        return;
    }
    pastMeals.unshift(searchTerm);
    localStorage.setItem("historyArr", JSON.stringify(pastMeals));
    renderHistory();
}

function initHistory() {
    pastMeals = JSON.parse(localStorage.getItem("historyArr")) || [];
    renderHistory();

    historyEl.addEventListener("click", function (e) {
        if (e.target.matches(".history-btn")) {
            const searchTerm = e.target.getAttribute("data-search-term");
            recipeSearch(searchTerm);
        }
    });
}

function renderHistory() {
    historyEl.innerHTML = "";
    for (let i = 0; i < pastMeals.length; i++) {
        const historyBtn = document.createElement("button");
        historyBtn.classList.add("history-btn");
        historyBtn.textContent = pastMeals[i];
        historyBtn.setAttribute("data-search-term", pastMeals[i]);
        historyEl.append(historyBtn);
    }
}

function handleHistory(e) {
    if (!e.target.matches(".history-btn")) {
        return;
    }
    recipeSearch(e.target.textContent);
}

//calls the initial his
initHistory();
//calls the initial history from the funciton
searchRecipeBtn.addEventListener("click", handleSearch);

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch(e);
    }
})

