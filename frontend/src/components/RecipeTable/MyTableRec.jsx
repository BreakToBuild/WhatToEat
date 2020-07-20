import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { recipes } from "../../constants";
import Cookies from "js-cookie";
import { Form, FormGroup, Input, Label } from "reactstrap";
import styled from "styled-components";

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const MyTableRec = (props) => {
  const [data, setData] = useState([]);
  const [recipe, setRecipe] = useState();
  const [show, setShow] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setReadOnly(false);
    setRecipe();
  };

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(recipes, {
        method: "get",
        withCredentials: true,
      });
      setData(result.data.created);
    };
    GetData();
  }, []);

  const deleteRecipe = (id) => {
    let csrftokenCookie = Cookies.get("csrftoken");
    axios("http://dev.localhost:8000/api/recipe/" + id, {
      method: "delete",
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrftokenCookie,
      },
    }).then((result) => {
      console.log("eliminado");
      window.location.reload(true);
    });
  };
  const editRecipe = (recipe) => {
    handleShow();
    setRecipe(recipe);
  };
  const updateRecipe = (recipe) => {
    let csrftokenCookie = Cookies.get("csrftoken");
    const Receitas = {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
    };
    axios(`http://dev.localhost:8000/api/recipe/${recipe.id}`, {
      method: "put",
      withCredentials: true,
      data: Receitas,
      headers: {
        "X-CSRFToken": csrftokenCookie,
      },
    }).then((result) => {
      console.log("eliminado");
      window.location.reload(true);
    });
  };
  const viewRecipe = (recipe) => {
    handleShow();
    setRecipe(recipe);
    setReadOnly(true);
  };
  const onChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <Table
          striped
          bordered
          variant="dark"
          hover
          style={{ cursor: "pointer" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome </th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => {
              return (
                <tr style={{ fontSize: "13.5px" }} key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="info"
                      onClick={() => {
                        viewRecipe(item);
                      }}
                    >
                      Ver receita
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="success"
                      onClick={() => {
                        editRecipe(item);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        deleteRecipe(item.id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* MODAL EDITAR */}
        </Table>
      </div>
      {show && (
        <div>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <div>
                {!readOnly && <h1 className="logText">Editar receita</h1>}
                {readOnly && <h1 className="logText">Ver receita</h1>}
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateRecipe(recipe);
                }}
              >
                <FormGroup>
                  <Label for="nomeReceita">Nome </Label>
                  <Input
                    type="text"
                    name="name"
                    id="nomeReceita"
                    value={recipe.name}
                    onChange={onChange}
                    readOnly={readOnly}
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
                    readOnly={readOnly}
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
                    readOnly={readOnly}
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
                    readOnly={readOnly}
                  />
                </FormGroup>
                <Actions>
                  {!readOnly && (
                    <Button
                      variant="success"
                      type="submit"
                      style={{ marginLeft: "15px" }}
                    >
                      Guardar
                    </Button>
                  )}
                  <Button variant="danger" type="submit" onClick={handleClose}>
                    Fechar
                  </Button>
                </Actions>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default MyTableRec;
