export const state = {
    recipe: {}
};

export const loadRecipe = async function(id) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.message} (${res.status})`);

        const {recipe} = data;

        state.recipe = {
        id : recipe.recipe_id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceURL: recipe.source_url,
        image: recipe.image_url,
        ingredients: recipe.ingredients

        };
        console.log(state.recipe);
    } catch (err) {
        alert(err);
    }
};