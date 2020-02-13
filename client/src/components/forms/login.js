import React, { useState } from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';



function Login() {
  const [show, setShow] = useState(false);
  const [regShow, setRegShow] = useState(false);
  return (
    <>
      <span onClick={() => setShow(true)}>
        Login
     </span>

      <Modal show={show} id="modal1" onHide={() => setShow(false)} centered>
        <Modal.Header closeButton> 
          <div>
            <Image src={user} alt="User" className="Image-user" roundedCircle />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Insira o seu email" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" type="submit">
            Entrar
  </Button>
          <Button variant="danger"  onClick={() => setRegShow(true) || setShow(false)}>

            registo
            </Button>

        </Modal.Footer>
      </Modal>

      {/* Modal 2*/}

      <Modal show={regShow} onHide={() => setRegShow(false)} id="modal2" centered>
        <Modal.Header closeButton>
          <div>
            <h2>Registo</h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Insira o seu email" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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