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

const getRecipes = async (searchTerm = "") => {
  try {
    // Si no hay término, busca todo (s=), si hay, busca el específico
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );

    if (!response.ok) throw new Error("Error en la red");

    const data = await response.json();
    return data.meals || []; // Retorna el array de recetas o vacío si no hay nada
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    return [];
  }
};

// render de Recetas
const renderRecipes = async (recipesList) => {
  let recipesHTML = "";
  
  // Limpiamos el contenedor antes de renderizar (buena práctica)
  recipeContainer.innerHTML = "";

  recipesList.forEach((recipe) => {
    recipesHTML += `
        <div class="col">
          <div class="card h-100 shadow-sm border-0">
            <img
              src="${recipe.strMealThumb}"
              class="card-img-top img-cover"
              alt="${recipe.strMeal}"
              style="height: 200px; object-fit: cover;"
            />
            <div class="card-body">
              <h5 class="card-title fw-bold text-dark">${recipe.strMeal}</h5>
              <p class="card-text text-muted" style="font-size: 0.9rem;">
                ${recipe.strInstructions ? recipe.strInstructions.substring(0, 100) + '...' : 'Sin instrucciones disponibles.'}
              </p>
            </div>
            <div class="card-footer bg-white border-0 pb-3">
              <button 
                onclick="viewMeal('${recipe.idMeal}')" 
                class="btn btn-primary w-100 fw-bold">
                View Recipe
              </button>
            </div>
          </div>
        </div>
        `;
  });

  recipeContainer.innerHTML = recipesHTML;
};

//funcion filtro

function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (!searchTerm) {
    renderRecipes(recipes); // "recipes" es tu array global con la carga inicial
    return;
  }

  const filtered = recipes.filter((recipe) => {
    // 1. Buscamos en el nombre del plato
    const matchNombre = recipe.strMeal.toLowerCase().includes(searchTerm);

    // 2. Buscamos en los ingredientes (recorremos del 1 al 20)
    let matchIngrediente = false;
    for (let i = 1; i <= 20; i++) {
      const ingrediente = recipe[`strIngredient${i}`];
      if (ingrediente && ingrediente.toLowerCase().includes(searchTerm)) {
        matchIngrediente = true;
        break; // Si ya encontramos coincidencia, no seguimos buscando en esta receta
      }
    }

    return matchNombre || matchIngrediente;
  });

  if (filtered.length === 0) {
    recipeContainer.innerHTML = `
      <div class="col-12 text-center mt-4">
        <p class="fs-5">No encontramos recetas con "${searchTerm}". intenta con 'Chicken', 'Tomato' o 'Rice'.</p>
      </div>`;
    return;
  }

  renderRecipes(filtered);
}

async function viewMeal(id) {
  // Navigate to the meal details page and pass the id in the query string
  // Use a relative path from the main page to the pages file
  window.location.href = `assets/pages/meal.html?id=${id}`;

}

// If the page shows an inline detail (legacy), allow returning to the list
function showList() {
  const detailSection = document.getElementById("meal-detail");
  if (detailSection) detailSection.classList.add("d-none");
  const recipesSection = document.getElementById("recipes");
  if (recipesSection) recipesSection.classList.remove("d-none");
}

//inicializacion
let recipes = [];
async function init() {
  recipes = await getRecipes();
  renderRecipes(recipes);
}

init();
