import React, { useState } from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Col } from 'react-bootstrap';



function Login() {
  const [show, setShow] = useState(false);
  const [regShow, setRegShow] = useState(false);
  return (
    <>
      <span onClick={() => setShow(true)}>
        Login
     </span>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <div>
            <h1 className="logText">Entre na sua conta.</h1>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" required />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} idcontrolId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" required />
              </Form.Group>
            </Form.Row>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" type="submit">
            Entrar
  </Button>
          <Button variant="danger" onClick={() => setRegShow(true) || setShow(false)}>

            registo
            </Button>

        </Modal.Footer>
      </Modal>

      {/* Modal 2*/}

      <Modal show={regShow} onHide={() => setRegShow(false)} centered>
        <Modal.Header closeButton>
          <div>
            <h1 className="logText">Registe a sua conta.</h1>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="firName">
                <Form.Label>Primeiro nome</Form.Label>
                <Form.Control type="text" placeholder="" required />
              </Form.Group>

              <Form.Group as={Col} controlId="secName">
                <Form.Label>Segundo nome</Form.Label>
                <Form.Control type="text" placeholder="" required />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="" required />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" required />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" >
            Entrar
          </Button>
          <Button variant="danger" onClick={() => setRegShow(false) || setShow(true)}>
            login
            </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;