import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./recipes.css";
import axios from "axios";
import { recipes } from "../../constants";
import Cookies from "js-cookie";

const EditRecipeForm = (props) => {
  useEffect((id) => {
    const Url = "http://dev.localhost:8000/api/recipe/?id=" + id;
    const GetData = async () => {
      const result = await axios(Url);
      setRecipes(result.data);
    };
    GetData();
  }, []);

  const UpdateRecipes = (e) => {
    let csrftokenCookie = Cookies.get("csrftoken");
    e.preventDefault();
    const dadosReceita = {
      id: props.match.params.id,
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
      .then((result) => {
        console.log(result);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    e.persist();
    setRecipes({ ...recipe, [e.target.name]: e.target.value });
  };
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
          <Form method="POST" onSubmit={UpdateRecipes}>
            <FormGroup>
              <Label for="nomeReceita">Nome </Label>
              <Input
                type="text"
                name="name"
                id="nomeReceita"
                value={recipe.name}
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
