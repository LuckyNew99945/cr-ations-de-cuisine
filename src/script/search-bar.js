class SearchBar extends HTMLElement {
  connectedCallback() {
    this.placeholder = this.getAttribute("placeholder") || null;
    this.render();
  }

  set clickSubmit(event) {
    this._clickSubmit = event;
    this.render();
  }

  set clickRandom(event) {
    this._clickRandom = event;
    this.render();
  }

  get searchValue() {
    return this.querySelector("#search").value;
  }

  render() {
    this.innerHTML = `
    <section class="flex">
    <input type="text" id="search" placeholder="${this.placeholder}" />
    <button id="submit" class="random-btn">
      <i class="fas fa-search"></i>
    </button>
    <button id="random" class="random-btn">
      <i class="fas fa-random"></i>
    </button>
  </section>
    `;

    this.querySelector("#submit").addEventListener("click", this._clickSubmit);

    this.querySelector("#random").addEventListener("click", this._clickRandom);
  }
}

customElements.define("search-bar", SearchBar);
