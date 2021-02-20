let allCategoryApi = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
let category = document.querySelector("#category");
let changeCategory = document.querySelector("#categoryList");
let favorite = document.querySelector("#favorite");
let filterCategory = document.querySelector("#categoryFilter");
let favoriteFood = [];

fetch(allCategoryApi)
  .then((response) => {
    return response.json();
  })
  .then((categories) => {
    categories.meals.forEach((element) => {
      const button = document.createElement("button");
      button.className = "list-group-item list-group-item-action";
      button.value = element.strCategory;
      button.innerHTML = element.strCategory;
      button.setAttribute("type", "button");
      category.appendChild(button);
      button.addEventListener("click", (e) => {
        let value = e.target.innerHTML;
        ChangeCategory(value);
      });
    });
    ChangeCategory = (value) => {
      if (filterCategory.innerHTML.length > 0) {
        filterCategory.innerHTML = "";
      }
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => {
          return response.json();
        })
        .then((e) => {
          for (let i = 0; i < e.meals.length; i++) {
            const element = e.meals[i];
            let div = document.createElement("div");
            div.classList = "card border border-warning m-5";
            div.setAttribute("style", "width:18rem;");
            filterCategory.appendChild(div);
            let image = document.createElement("img");
            image.classList = "card-img-top";
            image.setAttribute("src", element.strMealThumb);
            div.appendChild(image);
            let newDiv = document.createElement("div");
            newDiv.classList = "card-body";
            div.appendChild(newDiv);
            let h5 = document.createElement("h5");
            h5.classList = "card-title text-center";
            h5.innerHTML = element.strMeal;
            newDiv.appendChild(h5);
            let buttonDiv = document.createElement("div");
            buttonDiv.classList = "d-flex justify-content-between";
            newDiv.appendChild(buttonDiv);
            let button = document.createElement("button");
            button.classList = "btn btn-primary text-center";
            button.innerText = "Tarif için tıkla";
            button.setAttribute("type", "button");
            buttonDiv.appendChild(button);
            let span = document.createElement("span");
            span.classList = "badge rounded-pill bg-success m-2";
            span.innerHTML = "Merhaba";
            buttonDiv.appendChild(span);
            button.addEventListener("click", () => {
              let idValue = element.idMeal;
              Getİngredients(idValue);
            });
            span.addEventListener("click", () => {
              let value = element;
              SetFavorite(value);
            });
          }
        });
    };
  });
Getİngredients = (idValue) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`)
    .then((response) => {
      return response.json();
    })
    .then((e) => {
      e.meals.forEach((element) => {
        filterCategory.innerHTML = `
        <div class="card">
        
        <div class="card-body">
        <span class="badge rounded-pill bg-success">Success</span>
          <h5 class="card-title">${element.strMeal}</h5>
          <p class="card-text">${element.strInstructions}.</p>
          <h3 class="text-center">İtems</h3>
          <p class="card-text text-center"><small>${element.strIngredient1}-${element.strMeasure1}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient2}-${element.strMeasure2}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient3}-${element.strMeasure3}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient4}-${element.strMeasure4}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient5}-${element.strMeasure5}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient6}-${element.strMeasure6}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient7}-${element.strMeasure7}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient8}-${element.strMeasure8}</small></p>
          <p class="card-text text-center"><small>${element.strIngredient9}-${element.strMeasure9}</small></p>
        </div><img src="${element.strMealThumb}" class="card-img-bottom" alt="${element.strMeal}">
        </div>
          `;
      });
    });
};
SetFavorite = (value) => {
  favoriteFood.push(value.strMeal);
  const button = document.createElement("button");
  button.className = "list-group-item list-group-item-action";
  button.innerHTML = value.strMeal;
  button.setAttribute("type", "button");
  favorite.appendChild(button);
  button.addEventListener("click", ()=>{
    let idValue = value.idMeal
    Getİngredients(idValue)
  })
};
