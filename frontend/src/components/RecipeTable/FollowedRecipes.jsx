import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { recipes } from "../../constants";
import Cookies from "js-cookie";
import { Form, FormGroup, Input, Label } from "reactstrap";

const FollowedRecipesTable = (props) => {
  const [data, setData] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    const GetData = async () => {
      const result = await axios(recipes, {
        method: "get",
        withCredentials: true,
      });
      setData(result.data.following);
    };
    GetData();
  }, []);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setReadOnly(false);
    setRecipe();
  };
  const handleUnfollow = (id) => {
    let csrftokenCookie = Cookies.get("csrftoken");
    axios("http://dev.localhost:8000/api/recipe/" + id + "/unfollow", {
      method: "post",
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrftokenCookie,
      },
    }).then((result) => {
      window.location.reload(true);
    });
  };
  const onChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };
  const viewRecipe = (recipe) => {
    handleShow();
    setRecipe(recipe);
    setReadOnly(true);
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
                      variant="danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        handleUnfollow(item.id);
                      }}
                    >
                      Deixar de seguir
                    </Button>
                    <Button
                      variant="info"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        viewRecipe(item);
                      }}
                    >
                      Ver receita
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
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
              <Form>
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
                <Button variant="danger" type="submit" onClick={handleClose}>
                  Fechar
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default FollowedRecipesTable;
