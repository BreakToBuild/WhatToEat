import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./recipes.css";
import axios from "axios";
import { recipes } from "../../constants";
import Cookies from "js-cookie";

const AddRecipe = (props) => {
  const [recipe, setRecipes] = useState({
    name: "",
    description: "",
    ingredients: "",
    preparation: "",
  });

  const InsertRecipe = (e) => {
    let csrftokenCookie = Cookies.get("csrftoken");

    e.preventDefault();
    const dadosReceita = {
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
    };
    axios(recipes, {
      method: "post",
      data: dadosReceita,
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrftokenCookie,
      },
    })
      .then((response) => {
        console.log(response);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setRecipes({ ...recipe, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button onClick={handleShow} data-cy="adicionar" variant="primary">
        Adicionar receita
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div>
            <h1 className="logText">Nova receita</h1>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={InsertRecipe}>
            <FormGroup>
              <Label for="nomeReceita">Nome </Label>
              <Input
                type="text"
                name="name"
                id="nomeReceita"
                value={recipe.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="descricaoReceita">Descrição</Label>
              <Input
                type="textarea"
                name="description"
                id="descricaoReceita"
                value={recipe.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="ingredientesReceita">Ingredientes</Label>
              <Input
                rows={5}
                type="textarea"
                name="ingredients"
                id="ingredientesReceita"
                value={recipe.ingredients}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="preparacaoReceita">Preparação</Label>
              <Input
                rows={5}
                type="textarea"
                name="preparation"
                id="preparacaoReceita"
                value={recipe.preparation}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button variant="success" type="submit">
              Criar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddRecipe;
