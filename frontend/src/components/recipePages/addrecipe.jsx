import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./recipes.css";

const AddRecipe = (props) => {
  const initialFormState = {
    id: null,
    nome: "",
    descricao: "",
    ingredientes: "",
    preparacao: "",
  };
  const [recipe, setRecipes] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRecipes({ ...recipe, [name]: value });
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
          <Form
            method="POST"
            onSubmit={(event) => {
              event.preventDefault();
              if (!recipe.nome || !recipe.descricao) return;

              props.addRecipes(recipe);
              setRecipes(initialFormState);
              handleClose();
            }}
          >
            <FormGroup>
              <Label for="nomeReceita">Nome </Label>
              <Input
                type="text"
                name="nome"
                id="nomeReceita"
                value={recipe.nome}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="descricaoReceita">Descrição</Label>
              <Input
                type="textarea"
                name="descricao"
                id="descricaoReceita"
                value={recipe.descricao}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="ingredientesReceita">Ingredientes</Label>
              <Input
                rows={5}
                type="textarea"
                name="ingredientes"
                id="ingredientesReceita"
                value={recipe.ingredientes}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="preparacaoReceita">Preparação</Label>
              <Input
                rows={5}
                type="textarea"
                name="preparacao"
                id="preparacaoReceita"
                value={recipe.preparacao}
                onChange={handleInputChange}
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
