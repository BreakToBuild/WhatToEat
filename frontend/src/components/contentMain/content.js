import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./content.css";
import { Card, CardDeck, Container } from "react-bootstrap";
import { FaRegCalendarAlt, FaRegStar } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

function Content() {
    return (
        <Container>
            <CardDeck>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {" "}
                            <FiLock style={{ fontSize: 30 }}></FiLock>{" "}
                        </Card.Title>
                        <Card.Text className="text">
                            A WhatToEat permite que o utilizador consiga armazenar as suas
                            receitas favoritas e aceder à receita das mesmas sem problema.
            </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {" "}
                            <FaRegStar style={{ fontSize: 30 }}></FaRegStar>{" "}
                        </Card.Title>
                        <Card.Text className="text">
                            O utilizador tem também disponivel um sistema de " classificação
                            de receita " podendo dar até 5 estrelas.
            </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {" "}
                            <FaRegCalendarAlt
                                style={{ fontSize: 30 }}
                            ></FaRegCalendarAlt>{" "}
                        </Card.Title>
                        <Card.Text className="text">
                            Poderá também utilizar as suas receitas guardadas e criar o seu
                            proprio calendario.
            </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
        </Container>
    );
}

export default Content;
