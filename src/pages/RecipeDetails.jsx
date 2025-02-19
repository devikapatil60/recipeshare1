import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const foundRecipe = allRecipes.find((r) => r.id.toString() === id);
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) return <h2 style={{ textAlign: "center", color: "red" }}>Recipe Not Found</h2>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{recipe.title}</h2>
      <img src={recipe.image || "/default-image.jpg"} alt={recipe.title} style={styles.image} />
      <p style={styles.description}><strong>Description:</strong> {recipe.description}</p>
      <p style={styles.details}><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p style={styles.details}><strong>Instructions:</strong> {recipe.instructions}</p>
      <p style={styles.details}><strong>Posted by:</strong> {recipe.userEmail}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    color: "#666",
  },
  details: {
    fontSize: "14px",
    color: "#888",
  },
};

export default RecipeDetails;
