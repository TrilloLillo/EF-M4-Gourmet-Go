// meal.js - fetch and render a single meal based on ?id=...

async function getMealById(id) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (err) {
    console.error('Error fetching meal by id', err);
    return null;
  }
}

function buildIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      items.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
    }
  }
  return items;
}

function renderMeal(meal) {
  const container = document.getElementById('meal-content');
  if (!container) return;

  const ingredients = buildIngredients(meal);

  container.innerHTML = `
    <div class="row">
      <div class="col-md-5 text-center">
        <img src="${meal.strMealThumb}" class="img-fluid rounded" alt="${meal.strMeal}" />
      </div>
      <div class="col-md-7 text-start">
        <h2 class="fw-bold">${meal.strMeal}</h2>
        <p class="text-muted mb-1"><strong>Category:</strong> ${meal.strCategory || '—'}</p>
        <p class="text-muted mb-3"><strong>Origin:</strong> ${meal.strArea || '—'}</p>

        <h5>Ingredients</h5>
        <ul>
          ${ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <h5>Instructions</h5>
        <p style="white-space: pre-line;">${meal.strInstructions || 'No instructions.'}</p>

        ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank" class="btn btn-outline-danger mt-3">Watch Video</a>` : ''}
      </div>
    </div>
  `;
}

function showList() {
  // Navigate back to the index page (relative to assets/pages/meal.html)
  window.location.href = '../../index.html';
}

// On load, read id and fetch
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const container = document.getElementById('meal-content');

  if (!id) {
    if (container) container.innerHTML = '<p>No recipe specified. Return to search and try again.</p>';
    return;
  }

  // show a small loader
  if (container) container.innerHTML = '<p>Loading recipe...</p>';

  getMealById(id).then(meal => {
    if (!meal) {
      if (container) container.innerHTML = '<p>Recipe not found.</p>';
      return;
    }
    // Ensure the detail section is visible (meal-detail may be hidden by default)
    const detailSection = document.getElementById('meal-detail');
    if (detailSection && detailSection.classList.contains('d-none')) {
      detailSection.classList.remove('d-none');
    }

    renderMeal(meal);
  });
})();
