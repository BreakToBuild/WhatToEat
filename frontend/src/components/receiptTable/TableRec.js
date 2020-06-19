import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Table } from "react-bootstrap";

function TableRec() {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Nome </th>
            <th>Descrição</th>
            <th>Ingredientes</th>
            <th>Preparação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default TableRec;
