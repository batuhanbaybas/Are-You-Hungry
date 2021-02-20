let allCategoryApi = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
let category = document.querySelector("#category");
let changeCategory = document.querySelector("#categoryList");
let favorite = document.querySelector("#favorite");
let filterCategory = document.querySelector("#categoryFilter");

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
            let button = document.createElement("button");
            button.classList = "btn btn-primary text-center";
            button.innerText = "Tarif için tıkla";
            button.addEventListener("click", () => {
              let idValue = element.idMeal;
              Getİngredients(idValue);
            });
            button.setAttribute("type", "button");
            newDiv.appendChild(button);
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
          <h5 class="card-title">${element.strMeal}</h5>
          <p class="card-text">${element.strInstructions}.</p>
          <p class="card-text"><small>${element.strIngredient1}-${element.strMeasure1}</small></p>
          <p class="card-text"><small>${element.strIngredient2}-${element.strMeasure2}</small></p>
          <p class="card-text"><small>${element.strIngredient3}-${element.strMeasure3}</small></p>
          <p class="card-text"><small>${element.strIngredient4}-${element.strMeasure4}</small></p>
          <p class="card-text"><small>${element.strIngredient5}-${element.strMeasure5}</small></p>
          <p class="card-text"><small>${element.strIngredient6}-${element.strMeasure6}</small></p>
          <p class="card-text"><small>${element.strIngredient7}-${element.strMeasure7}</small></p>
          <p class="card-text"><small>${element.strIngredient8}-${element.strMeasure8}</small></p>
          <p class="card-text"><small>${element.strIngredient9}-${element.strMeasure9}</small></p>
        </div><img src="${element.strMealThumb}" class="card-img-bottom" alt="${element.strMeal}">
        </div>
          `;
      });
    });
};
