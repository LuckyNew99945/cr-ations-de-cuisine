import "./search-bar.js";
import "./single-recipe.js";
import "../style/style.css";

// const search = document.getElementById("search"),
const searchEl = document.querySelector("search-bar"),
  // submit = document.getElementById("submit"),
  // random = document.getElementById("random"),
  resultTitle = document.getElementById("result-title"),
  recipesEl = document.getElementById("recipes"),
  singleRecipeEl = document.querySelector("single-recipe");

//Cari resep dan ambil dengan fetch dari API
// Done
const searchMeal = (e) => {
  e.preventDefault();

  //Hapus Single Recipe jika ada di tampilan
  singleRecipeEl.innerHTML = "";

  // Ambil Search Input
  const term = search.value;

  //Cek jika resep kosong
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultTitle.innerHTML = `<h2>Search results fot '${term}':</h2>`;

        if (data.meals === null) {
          resultTitle.innerHTML = `<p>There are no search result. Try again!</p>`;
        } else {
          recipesEl.innerHTML = data.meals
            .map(
              (recipe) => `
          <div class="recipe">
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}"/>
          <div class="recipe-info" data-recipeID="${recipe.idMeal}">
          <h3>${recipe.strMeal}</h3>
          </div>
          </div>
          `
            )
            .join("");
        }
      });
    //Clear Search Text
    searchEl.value = "";
  } else {
    alert("Please enter a search term");
  }
};

//Fetch meal by ID
// Done
const getMealById = (recipeID) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`)
    .then((res) => res.json())
    .then((data) => {
      const recipe = data.meals[0];

      addMealToDOM(recipe);
    });
};

// Fetch random meal from API
// Done
const getRandomMeal = () => {
  // Clear meals and heading
  recipesEl.innerHTML = "";
  resultTitle.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const recipe = data.meals[0];

      addMealToDOM(recipe);
    });
};

// Add meal to DOM

const addMealToDOM = (recipe) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleRecipeEl.innerHTML = `
  <div class="single-recipe">
    <h1>${recipe.strMeal}</h1>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}"/>
    <div class="single-recipe-info">
    ${recipe.strCategory ? `<p>${recipe.strCategory}</p>` : ""}
    ${recipe.strArea ? `<p>${recipe.strArea}</p>` : ""}
  </div>
  <div class="main">
    <h2>Ingredients</h2>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    <h2>Instructions</h2>
    <p>${recipe.strInstructions}</p>
  </div>
</div>
  `;
};

//Event listener
searchEl.clickSubmit = searchMeal;
searchEl.clickRandom = getRandomMeal;

recipesEl.addEventListener("click", (e) => {
  const recipeInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("recipe-info");
    } else {
      return false;
    }
  });

  if (recipeInfo) {
    const recipeID = recipeInfo.getAttribute("data-recipeId");
    getMealById(recipeID);
  }
});
