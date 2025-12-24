//selectores

const searchInput = document.getElementById("search-input");

const recipeContainer = document.querySelector("#recipes");

//buscador event listener

searchInput.addEventListener("input", filterRecipes);

const searchForm = searchInput.form;
if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filterRecipes();
  });
}

// fetch de recetas

const getRecipes = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const recipes = await response.json();
    return recipes.meals;
  } catch (error) {
    console.error(`message: ${error}`);
  }
};

// render de Recetas

const renderRecipes = async (recipes) => {
  let recipesHTML = "";
  recipes.forEach((recipe) => {
    recipesHTML += `
        <div class="col">
          <div class="card">
            <img
              src="${recipe.strThumb}"
              class="card-img-top img-cover"
              alt="${recipe.strIngredient}"
            />
            <div class="card-body">
              <h5 class="card-title">${recipe.strIngredient}</h5>
              <p class="card-text">
                ${recipe.strDescription}
              </p>
              <a href="#" class="btn btn-primary">Ver Receta</a>
            </div>
          </div>
        </div>
        `;
  });

  const recipeContainer = document.querySelector("#recipes");
  recipeContainer.innerHTML = recipesHTML;
};

//funcion filtro

function filterRecipes() {
  const searchIngredient = searchInput.value.toLowerCase().trim();

  if (!searchIngredient) {
    renderRecipes(recipes);
    return;
  }

  const filtered = (recipes || []).filter((recipe) =>
    (recipe.strIngredient || recipe.strMeal || "").toLowerCase().includes(searchIngredient) 
  );

 if (!filtered || filtered.length === 0) {
    recipeContainer.innerHTML =
      '<div class="col"><p class="text-center fs-5 mt-4">Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente.</p></div>';
    return;
  }

  renderRecipes(filtered);
}

//inicializacion
let recipes = [];
async function init() {
  recipes = await getRecipes();
  renderRecipes(recipes);
}

init();
