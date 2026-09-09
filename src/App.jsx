 
import React, { useState } from "react";

// Sample recipe data
const recipeData = [
  {
    id: 1,
    title: "Classic Pancakes",
    time: "20 mins",
    difficulty: "Easy",
    description: "Fluffy and delicious pancakes for breakfast.",
    ingredients: [
      "1 cup all-purpose flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1 cup milk",
      "1 egg",
      "2 tbsp melted butter",
    ],
    instructions:
      "1. Mix the flour, sugar and baking powder.\n2. Add milk, egg and melted butter.\n3. Mix everything well.\n4. Heat a pan and pour the batter.\n5. Cook both sides until golden brown.",
  },

  {
    id: 2,
    title: "Pizza Dosa",
    time: "20 mins",
    difficulty: "Easy pizzy",
    description: " A delicious Indian-Italian fusion that combines a crispy dosa base with tangy pizza sauce, colorful vegetables, and melted cheese.",
    ingredients: [
      "Dosa batter 2 cups",
      "Pizza sauce  4 tbsp",
      "Onion  ½, finely chopped",
      "Capsicum  ½, finely chopped",
      "Sweet corn ¼ cup",
      "Grated cheese  ½ cup",
      "Oregano ½ tsp",
      "Chilli flakes  ½ tsp",
      "Oil 1 tsp",
      "Salt to taste",
    ],
    instructions:
      "1. Heat a non-stick pan and pour a ladle of dosa batter.\n2. Spread it evenly to form a thin dosa.\n3. Drizzle a little oil around the edges.\n4. Spread pizza sauce over the dosa.\n5. Sprinkle chopped onions, capsicum, sweet corn, and grated cheese.\n6. Add oregano and chilli flakes.\n7. Cover and cook for 2-3 minutes until the cheese melts.\n8. Fold the dosa and serve hot.",
  },

  {
    id: 3,
    title: "Chocolate Mug Cake",
    time: "5 mins",
    difficulty: "Very Easy",
    description: "A quick chocolate dessert made in a mug.",
    ingredients: [
      "4 tbsp flour",
      "2 tbsp sugar",
      "1 tbsp cocoa powder",
      "3 tbsp milk",
      "1 tbsp melted butter",
      "Chocolate chips",
    ],
    instructions:
      "1. Add flour, sugar and cocoa powder to a mug.\n2. Add milk and melted butter.\n3. Mix until smooth.\n4. Add chocolate chips.\n5. Microwave for about 70-80 seconds.\n6. Let it cool before eating.",
  },

   {
    id: 4,
    title: "🍝 Mom Secret Masala Pasta",
    time: "25 mins",
    difficulty: "Easy",
    description: "A delicious ,quick and flavorful pasta made with fresh vegetables, aromatic spices, and cheese—a simple homemade recipe that is quick, comforting, and perfect for any meal. 🍝❤️.",
    ingredients: [
      "200 g Pasta",
      "Onion 1 medium, chopped",
      "Tomato 2 medium, chopped",
      "Capsicum  ½ cup, chopped",
      "Sweet corn  ¼ cup",
      "Garlic  1 tsp, minced",
      "Butter  1 tbsp",
      "Red chilli powder  ½ tsp",
      "Garam masala  ½ tsp",
      "Oregano  ½ tsp",
      "Salt  ½ tsp",
      "Cheese  ¼ cup, grated",
    ],
    instructions:
      "Boil pasta in salted water until soft. Drain and keep aside.\nHeat butter and sauté garlic, onion, and capsicum for 2–3 minutes.\nAdd tomatoes, corn, chilli powder, garam masala, and salt. Cook for 4–5 minutes.\nAdd the boiled pasta and oregano. Mix well and cook for 2 minutes.\nTop with grated cheese and serve hot."
  },
    
];

function App() {
  // Stores all recipes
  const [recipes, setRecipes] = useState(recipeData);

  // Stores the recipe currently displayed
  const [selectedRecipe, setSelectedRecipe] = useState(recipeData[0]);

  // Stores search text
  const [searchText, setSearchText] = useState("");

  // Form input states
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  // Add a new recipe
  const addRecipe = (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (
      title.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // Create new recipe
    const newRecipe = {
      id: Date.now(),
      title: title,
      time: "15 mins",
      difficulty: "Medium",
      description: "A homemade recipe added by you.",
      ingredients: ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      instructions: instructions,
    };

    // Add recipe to recipe list
    setRecipes([...recipes, newRecipe]);

    // Show newly added recipe
    setSelectedRecipe(newRecipe);

    // Clear form
    setTitle("");
    setIngredients("");
    setInstructions("");
  };

  // Delete a recipe
  const deleteRecipe = (id, event) => {
    // Prevent the card click event
    event.stopPropagation();

    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);

    setRecipes(updatedRecipes);

    // If the deleted recipe was selected
    if (selectedRecipe && selectedRecipe.id === id) {
      if (updatedRecipes.length > 0) {
        setSelectedRecipe(updatedRecipes[0]);
      } else {
        setSelectedRecipe(null);
      }
    }
  };

  // Search recipes
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1>🍳 My Recipe Book</h1>
        <p>Find, explore and add your favourite recipes.</p>
      </header>

      <div style={styles.container}>
        {/* LEFT SIDE */}
        <div style={styles.sidebar}>
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search recipes..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={styles.searchInput}
          />

          <h2 style={styles.heading}>Recipes</h2>

          {/* Recipe Cards */}
          <div>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  style={{
                    ...styles.recipeCard,

                    // Highlight selected recipe
                    border:
                      selectedRecipe &&
                      selectedRecipe.id === recipe.id
                        ? "2px solid #4caf50"
                        : "1px solid #ddd",

                    backgroundColor:
                      selectedRecipe &&
                      selectedRecipe.id === recipe.id
                        ? "#f1fff3"
                        : "white",
                  }}
                >
                  <div style={styles.cardTop}>
                    <h3 style={styles.cardTitle}>{recipe.title}</h3>

                    <button
                      onClick={(event) =>
                        deleteRecipe(recipe.id, event)
                      }
                      style={styles.deleteButton}
                    >
                      🗑️
                    </button>
                  </div>

                  <p style={styles.meta}>
                    ⏱️ {recipe.time} &nbsp; | &nbsp; ⭐{" "}
                    {recipe.difficulty}
                  </p>

                  <p style={styles.description}>
                    {recipe.description}
                  </p>
                </div>
              ))
            ) : (
              <p style={styles.noRecipe}>
                No recipes found.
              </p>
            )}
          </div>

          {/* Add Recipe Form */}
          <div style={styles.formBox}>
            <h2 style={styles.formTitle}>➕ Add New Recipe</h2>

            <form onSubmit={addRecipe}>
              <input
                type="text"
                placeholder="Recipe name"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                style={styles.formInput}
              />

              <input
                type="text"
                placeholder="Ingredients separated by commas"
                value={ingredients}
                onChange={(event) =>
                  setIngredients(event.target.value)
                }
                style={styles.formInput}
              />

              <textarea
                placeholder="Cooking instructions"
                value={instructions}
                onChange={(event) =>
                  setInstructions(event.target.value)
                }
                style={styles.textarea}
              />

              <button type="submit" style={styles.addButton}>
                Save Recipe
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.details}>
          {selectedRecipe ? (
            <>
              <h2 style={styles.recipeTitle}>
                {selectedRecipe.title}
              </h2>

              <p style={styles.recipeDescription}>
                {selectedRecipe.description}
              </p>

              <hr />

              {/* Ingredients */}
              <h2>🛒 Ingredients</h2>

              <ul>
                {selectedRecipe.ingredients.map(
                  (ingredient, index) => (
                    <li
                      key={index}
                      style={styles.ingredient}
                    >
                      {ingredient}
                    </li>
                  )
                )}
              </ul>

              <hr />

              {/* Instructions */}
              <h2>👨‍🍳 Cooking Instructions</h2>

              <p style={styles.instructions}>
                {selectedRecipe.instructions}
              </p>
            </>
          ) : (
            <div style={styles.empty}>
              <h2>🍽️ No Recipe Selected</h2>
              <p>Add a recipe or select one from the list.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// 6. JavaScript Object CSS Styles - Clean Coral Theme
const styles = {
  appContainer: { 
    fontFamily: '"Comic Sans MS", "Arial Rounded MT Bold", sans-serif', 
    backgroundColor: '#FFF2F0', 
    minHeight: '100vh', 
    padding: '20px', 
    color: '#4A2E2B' 
  },
  header: { 
    textAlign: 'center', 
    marginBottom: '30px', 
    paddingBottom: '10px', 
    borderBottom: '2px solid #E6A19A' 
  },
  mainLayout: { 
    display: 'flex', 
    gap: '30px', 
    maxWidth: '1100px', 
    margin: '0 auto', 
    flexWrap: 'wrap' 
  },
  sidebar: { 
    flex: '1', 
    minWidth: '320px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px' 
  },
  searchBar: { 
    width: '100%', 
    padding: '10px 14px', 
    borderRadius: '20px', 
    border: '2px solid #E6A19A', 
    fontSize: '14px', 
    boxSizing: 'border-box',
    backgroundColor: '#FFF',
    fontFamily: 'inherit'
  },
  heading: { 
    margin: '10px 0 5px 0', 
    fontSize: '22px' 
  },
  cardContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px', 
    maxHeight: '400px', 
    overflowY: 'auto' 
  },
  recipeCard: { 
    borderWidth: '2px', 
    borderStyle: 'solid', 
    borderRadius: '12px', 
    padding: '15px', 
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  cardHeaderRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cardTitle: { 
    margin: 0, 
    fontSize: '18px' 
  },
  deleteButton: { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    fontSize: '18px', 
    padding: '2px' 
  },
  cardMeta: { 
    fontSize: '12px', 
    color: '#D4736A', 
    margin: '6px 0', 
    fontWeight: 'bold' 
  },
  cardDesc: { 
    fontSize: '13px', 
    color: '#6E4D4A', 
    margin: 0 
  },
  formContainer: { 
    backgroundColor: '#fff', 
    border: '2px solid #E6A19A', 
    borderRadius: '12px', 
    padding: '20px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px', 
    marginTop: '15px' 
  },
  formTitle: { 
    margin: '0 0 10px 0', 
    fontSize: '18px' 
  },
  inputField: { 
    padding: '10px 12px', 
    borderRadius: '8px', 
    border: '1px solid #E6A19A', 
    fontSize: '13px', 
    fontFamily: 'inherit', 
    width: '100%', 
    boxSizing: 'border-box' 
  },
  submitButton: { 
    backgroundColor: '#D4736A', 
    color: 'white', 
    border: 'none', 
    padding: '10px', 
    borderRadius: '20px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    fontFamily: 'inherit', 
    marginTop: '5px' 
  },
  detailsPanel: { 
    flex: '1.5', 
    minWidth: '350px', 
    backgroundColor: '#ffffff', 
    border: '2px solid #E6A19A', 
    borderRadius: '16px', 
    padding: '30px', 
    height: 'fit-content', 
    boxShadow: '0 4px 10px rgba(212, 115, 106, 0.1)' 
  },
  detailTitle: { 
    margin: '0 0 10px 0', 
    color: '#4A2E2B', 
    fontSize: '32px' 
  },
  detailOverview: { 
    color: '#D4736A', 
    fontSize: '14px', 
    fontWeight: 'bold' 
  },
  sectionDivider: { 
    height: '2px', 
    backgroundColor: '#FFF2F0', 
    margin: '20px 0' 
  },
  ingredientsList: { 
    listStyleType: 'none', 
    padding: 0, 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
    gap: '10px', 
    margin: '10px 0' 
  },
  ingredientItem: { 
    fontSize: '14px', 
    padding: '4px 0' 
  },
  instructionsText: { 
    lineHeight: '1.7', 
    fontSize: '15px', 
    color: '#4A2E2B', 
    whiteSpace: 'pre-line', 
    margin: '10px 0' 
  }
};
export default App;