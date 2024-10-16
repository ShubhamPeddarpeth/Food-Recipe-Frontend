import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(['access_token']);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://food-recipe-backend-pya7.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipe();
  }, [userID]);

  const removeSavedRecipe = async (recipeId) => {
    try {
      await axios.put(
        '/recipes/savedRecipes/remove',
        {
          userID: userID,
          recipeID: recipeId,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== recipeId)); // Remove recipe from UI
    } catch (error) {
      console.log('Error removing saved recipe', error);
    }
  };

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            {/* {savedRecipe.includes(recipe._id) && <h1>ALREADY SAVED</h1>} */}
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => removeSavedRecipe(recipe._id)}>
                Remove from Saved
              </button>
            </div>

            <p>{recipe.description}</p>
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
