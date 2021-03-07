import * as model from './model.js';
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'



// Import installed npm packages to will polyfill (support old browsers by changing async await etc to older syntax)
import 'core-js/stable';
import 'regenerator-runtime/runtime';



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
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.state.search.results);
    // resultsView._clear();
  
  } catch(err) {
      console.log(err);
  }

};



// Publisher-subscriber pattern event handler
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
