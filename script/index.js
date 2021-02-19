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
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.value = element.strCategory;
      li.innerHTML = element.strCategory;
      category.appendChild(li);
      li.addEventListener("click", (e) => {
        e.target.innerHTML;
        ChangeCategory(e);
      });
    });
    ChangeCategory = (e) => {
      let value = e.target.innerHTML;
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => {
          return response.json();
        })
        .then((e) => {
          for (let i = 0; i < e.meals.length; i++) {
            const element = e.meals[i];
            console.log(element.strMeal);
            let div = document.createElement("div");
            div.classList = "card border border-warning mt-5";
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
            h5.classList = "card-title";
            h5.innerHTML = element.strMeal;
            newDiv.appendChild(h5);
            let button = document.createElement("button");
            button.classList = "btn btn-primary";
            button.innerText = "Tarif için tıkla";
            newDiv.appendChild(button);
          }
        });

      console.log(value);
    };
  });
