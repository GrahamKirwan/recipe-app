import * as model from './model.js';
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'



// Import installed npm packages to will polyfill (support old browsers by changing async await etc to older syntax)
import 'core-js/stable';
import 'regenerator-runtime/runtime';


// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    // Since loadRecipe is an async function form the model module, we have to await when we call it (this works because we are calling from within an async function)
    await model.loadRecipe(id);


    // 2. Rendering recipe 
    recipeView.render(model.state.recipe);


  } catch(err) {
      recipeView.renderError();
  }

}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
    
  
  } catch(err) {
      console.log(err);
  }

};

const controlPagination = function(goToPage) {
  // 3) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render new initial pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
}




// Publisher-subscriber pattern event handler
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();
