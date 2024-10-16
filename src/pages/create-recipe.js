import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(['access_token']);

  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientsChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };
  console.log(recipe);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        'https://food-recipe-backend-pya7.onrender.com/recipes',
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert('Recipe Created Successfully!!!');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create-Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="ingredients">Ingredients</label>

        {recipe.ingredients.map((ingredients, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredients}
            onChange={(event) => handleIngredientsChange(event, index)}
          />
        ))}
        <button onClick={addIngredient} type="button">
          Add Ingredients
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          value={recipe.instructions}
          name="instructions"
          id="instructions"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
