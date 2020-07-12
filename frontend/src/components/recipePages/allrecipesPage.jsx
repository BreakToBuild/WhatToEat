import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import TableRec from "../RecipeTable/TableRec";
import Sidnav from "../sideNav/Sidenav";
import BreadCrumbs from "..//Breadcrumb/breadcrumb.jsx";
import AddRecipesForm from "../recipePages/addrecipe.jsx";
import EditRecipeForm from "../recipePages/editrecipe.jsx";
const AllRecipes = () => {
  const recipesData = [
    {
      id: 1,
      nome: "Sardinhas na cataplana",
      descricao:
        "Tudo num só tacho, deixe que os alimentos libertem os sabores, que se vão misturando.",
      ingredientes:
        "700 g sardinhas limpas (sem cabeça, vísceras e escamas) 2 c. de chá sal  3 cebolas 5 dentes de alho 4 batatas 7 tomates maduros 1 pimento verde 1 pimento vermelho 4 c. de sopa azeite Pingo Doce salsa fresca coentros frescos 1 folha de louro",
      preparacao:
        "1. Lave cuidadosamente as sardinhas em água fria corrente e certifique-se de que elimina todas as escamas. Enxugue-as em papel de cozinha, tempere-as com uma colher de chá de sal e reserve.  2. Descasque as cebolas, o alho e as batatas e corte-os em rodelas. Lave o tomate e os pimentos e limpe-os de sementes. Corte o tomate e os pimentos em rodelas.",
    },
    {
      id: 2,
      nome: "Pizza com peras e gorgonzola",
      descricao:
        "Prepare esta pizza em 15 minutos. Tenha pronta a base de massa fina grelhe as peras, adicione o queijo gorgonzola e a rúcula. Fácil e deliciosa.",
      ingredientes:
        "700 g sardinhas limpas (sem cabeça, vísceras e escamas) 2 c. de chá sal  3 cebolas 5 dentes de alho 4 batatas 7 tomates maduros 1 pimento verde 1 pimento vermelho 4 c. de sopa azeite Pingo Doce salsa fresca coentros frescos 1 folha de louro",
      preparacao:
        "1. Lave cuidadosamente as sardinhas em água fria corrente e certifique-se de que elimina todas as escamas. Enxugue-as em papel de cozinha, tempere-as com uma colher de chá de sal e reserve.  2. Descasque as cebolas, o alho e as batatas e corte-os em rodelas. Lave o tomate e os pimentos e limpe-os de sementes. Corte o tomate e os pimentos em rodelas.",
    },
    {
      id: 3,
      nome: "Pica-pau à portuguesa",
      descricao:
        "A receita de pica-pau tem origem na charneca do ribatejo, consiste em carne salteada temperada com ingredientes como o alho, o louro e vinho branco.",
      ingredientes:
        "700 g sardinhas limpas (sem cabeça, vísceras e escamas) 2 c. de chá sal  3 cebolas 5 dentes de alho 4 batatas 7 tomates maduros 1 pimento verde 1 pimento vermelho 4 c. de sopa azeite Pingo Doce salsa fresca coentros frescos 1 folha de louro",
      preparacao:
        "1. Lave cuidadosamente as sardinhas em água fria corrente e certifique-se de que elimina todas as escamas. Enxugue-as em papel de cozinha, tempere-as com uma colher de chá de sal e reserve.  2. Descasque as cebolas, o alho e as batatas e corte-os em rodelas. Lave o tomate e os pimentos e limpe-os de sementes. Corte o tomate e os pimentos em rodelas.",
    },
  ];

  const [recipes, setRecipes] = useState(recipesData);
  const addRecipes = (recipe) => {
    recipe.id = recipes.length + 1;
    setRecipes([...recipes, recipe]);
  };

  const [editing, setEditing] = useState(false);

  const updateRecipes = (id, updatedRecipes) => {
    setEditing(false);

    setRecipes(
      recipes.map((recipe) => (recipe.id === id ? updatedRecipes : recipe))
    );
  };

  const initialFormState = {
    id: null,
    nome: "",
    descricao: "",
    ingredientes: "",
    preparacao: "",
  };

  const editRow = (recipe) => {
    setEditing(true);

    setCurrentRecipes({
      id: recipe.id,
      nome: recipe.nome,
      descricao: recipe.descricao,
      ingredientes: recipe.ingredientes,
      preparacao: recipe.preparacao,
    });
  };
  const [currentRecipes, setCurrentRecipes] = useState(initialFormState);

  const deleteRecipes = (id) => {
    setRecipes(recipes.filter((recipes) => recipes.id !== id));
  };

  return (
    <div>
      <div>
        <Sidnav></Sidnav>
      </div>
      <div className="main">
        <BreadCrumbs />
        <div className="container-fluid">
          <TableRec
            recipes={recipes}
            deleteRecipes={deleteRecipes}
            editRow={editRow}
          />
        </div>

        <div className="flex-large" style={{ padding: "15px" }}>
          {editing ? (
            <div>
              <div>
                <AddRecipesForm addRecipes={addRecipes} />
                <EditRecipeForm
                  setEditing={setEditing}
                  currentRecipes={currentRecipes}
                  updateRecipes={updateRecipes}
                />
              </div>
            </div>
          ) : (
            <div>
              <AddRecipesForm addRecipes={addRecipes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
