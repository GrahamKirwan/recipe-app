import * as model from './model.js';
import recipeView from './views/recipeView.js'



// Import installed npm packages to will polyfill (support old browsers by changing async await etc to older syntax)
import 'core-js/stable';
import 'regenerator-runtime/runtime';




// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    // Since loadRecipe is an async function form the model module, we have to await when we call it (this works because we are calling from within an async function)
    await model.loadRecipe(id);


    // 2. Rendering recipe 
    recipeView.render(model.state.recipe);


  } catch(err) {
      alert(err);
  }

}



controlRecipes();

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
