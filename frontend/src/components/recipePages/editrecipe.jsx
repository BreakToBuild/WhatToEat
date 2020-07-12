import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./recipes.css";

const EditRecipeForm = (props) => {
  const [recipe, setRecipes] = useState(props.currentRecipes);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipes({ ...recipe, [name]: value });
  };

  useEffect(() => {
    setRecipes(props.currentRecipes);
  }, [props]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        style={{ marginLeft: "5px" }}
        onClick={handleShow}
        data-cy="Editar"
        variant="info"
      >
        Editar {recipe.nome}
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div>
            <h1 className="logText">Editar receita</h1>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form
            method="POST"
            onSubmit={(event) => {
              event.preventDefault();

              props.updateRecipes(recipe.id, recipe);
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
              Guardar
            </Button>
            <Button
              style={{ marginLeft: "250px" }}
              variant="danger"
              type="submit"
              onClick={() => props.setEditing(false)}
            >
              Cancelar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditRecipeForm;
