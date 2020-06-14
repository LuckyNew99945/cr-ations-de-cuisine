class SingleRecipe extends HTMLElement {
  set recipe(recipe) {
    this._recipe = recipe;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="single-recipe">
    <h1>${this._recipe.recipe.strMeal}</h1>
    <img src="${this._recipe.recipe.strMealThumb}" alt="${
      this._recipe.recipe.strMeal
    }"/>
    <div class="single-recipe-info">
    ${
      this._recipe.recipe.strCategory
        ? `<p>${this._recipe.recipe.strCategory}</p>`
        : ""
    }
    ${
      this._recipe.recipe.strArea ? `<p>${this._recipe.recipe.strArea}</p>` : ""
    }
  </div>
  <div class="main">
    <h2>Ingredients</h2>
    <ul>
      ${this._recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    <h2>Instructions</h2>
    <p>${this._recipe.recipe.strInstructions}</p>
  </div>
</div>
    `;
  }
}

customElements.define("single-recipe", SingleRecipe);
