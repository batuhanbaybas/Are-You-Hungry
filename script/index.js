let allCategoryApi = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
let filterCategoryApi = "https://www.themealdb.com/api/json/v1/1/filter.php?c="
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
     .then(response=>{
         return response.json();
        }).then(element=>{
            element.meals.map(element => {
                const image = document.createElement("img")
                image.className = "card-img-top"
                image.setAttribute("src",element.strMealThumb)
                image.setAttribute("alt",element.strMeal)
                filterCategory.appendChild(image)
                const div = document.createElement("div")
                div.className = "card-body"
                filterCategory.appendChild(div)
                const h5 = document.createElement("h5")
                h5.innerHTML = element.strMeal
                h5.className = "card-title"
                filterCategory.appendChild(h5)
                const button = document.createElement("button")
                button.innerHTML = "Tarif İçin Tıkla"
                button.className = "btn btn-primary"
                button.setAttribute("type","submit")
                filterCategory.appendChild(button)
                button.addEventListener("click",(value)=>{
                    value.preventDefault();
                    GetIngradients(e)
                })
            });
        })
      console.log(value);
      GetIngradients = (value)=>{
          console.log(value)
      }

    };
  });
