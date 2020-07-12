import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Table, Button } from "react-bootstrap";

const TableRec = (props) => {
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
            </tr>
          </thead>
          <tbody>
            {props.recipes.length > 0 ? (
              props.recipes.map((recipe) => (
                <tr style={{ fontSize: "13.5px" }} key={recipe.id}>
                  <td>{recipe.id}</td>
                  <td>{recipe.nome}</td>
                  <td>{recipe.descricao}</td>
                  <td>
                    <Button variant="success">Seguir</Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="info"
                      onClick={() => {
                        props.editRow(recipe);
                        console.log(recipe);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => props.deleteRecipes(recipe.id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td> Sem registos</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TableRec;
