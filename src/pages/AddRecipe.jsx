import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Restore data if user was redirected to login and came back
    const tempRecipe = JSON.parse(sessionStorage.getItem("tempRecipe"));
    if (tempRecipe) {
      setTitle(tempRecipe.title || "");
      setDescription(tempRecipe.description || "");
      setIngredients(tempRecipe.ingredients || [""]);
      setInstructions(tempRecipe.instructions || "");
      setImage(tempRecipe.image || null);
      sessionStorage.removeItem("tempRecipe"); // Clear stored data
    }
  }, []);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || ingredients.some((ing) => ing.trim() === "") || !instructions) {
      setError("Please fill all fields.");
      return;
    }

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      // ✅ Store data in sessionStorage before redirecting
      sessionStorage.setItem(
        "tempRecipe",
        JSON.stringify({ title, description, ingredients, instructions, image })
      );
      navigate("/login"); // Redirect to login page
      return;
    }

    // ✅ If logged in, save the recipe
    const newRecipe = {
      id: Date.now(),
      title,
      description,
      ingredients,
      instructions,
      image,
      userEmail: loggedInUser,
    };

    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    existingRecipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(existingRecipes));

    alert("Recipe added successfully!");
    navigate("/");
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="add-recipe-form">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Recipe Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
        />
        
        {/* ✅ Ingredients Input Fields */}
        <div className="ingredients-section">
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="form-input"
            />
          ))}
          <button type="button" onClick={handleAddIngredient} className="add-ingredient-btn">
            + Add Ingredient
          </button>
        </div>

        {/* ✅ Instructions Input */}
        <textarea
          placeholder="Cooking Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="form-textarea"
        />

        {/* ✅ Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result); // Convert image to Base64
              };
              reader.readAsDataURL(file);
            }
          }}
          className="form-file-input"
        />

        <button type="submit" className="submit-btn">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
