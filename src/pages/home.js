import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

export const Home = () => {
  const [cookies, setCookies] = useCookies(['access_token']);

  const [recipes, setRecipes] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          'https://food-recipe-backend-pya7.onrender.com/recipes'
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://food-recipe-backend-pya7.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipe(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  console.log(recipes);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        'https://food-recipe-backend-pya7.onrender.com/recipes',
        {
          recipeID,
          userID,
        }
      );
      setSavedRecipe(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in local storage
      await axios.delete(`/recipes/${recipeId}`, {
        headers: { authorization: cookies.access_token },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId)); // Remove deleted recipe from UI
    } catch (error) {
      console.log('Error deleting recipe', error);
    }
  };

  const isRecipeSaved = (id) => savedRecipe.includes(id);

  return (
    <div className="card">
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {/* {savedRecipe.includes(recipe._id) && <h1>ALREADY SAVED</h1>} */}
            <div>
              <h2>{recipe.name}</h2>
              <div className="card-action">
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
                </button>
                <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
              </div>
            </div>
            <div>
              <h3>Ingredients</h3>
              <p>{recipe.ingredients}</p>
            </div>
            <div className="instructions">
              <h3>Instructions</h3>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>
              <strong>Cooking Time :</strong> {recipe.cookingTime}(minutes)
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
