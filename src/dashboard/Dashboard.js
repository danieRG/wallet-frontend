import React, { Component } from 'react';
import './Dashboard.css';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Amount from '../amount/Amount';

class Dashboard extends Component {

  render() {
    return (
      <Row>   
        <Col xs={7} xsOffset={2} sm={6} smOffset={3}>
          <ListGroup>
            <ListGroupItem header="Total dinero retirado" href="/#/total-retired">Verificar todos los retiros actuales</ListGroupItem>
            <ListGroupItem header="Historial de transacciones" href="/#/transactions-history">Historial de todas las transancciones actuales</ListGroupItem>
            <ListGroupItem header="Recarga/Retirar dinero" href="/#/load-and-retire-money">Carga la billetera en tu cuenta y solicita su retiro</ListGroupItem>
            <ListGroupItem header="Solicitudes" href="/#/requests">Ver todas las solicitudes aprobadas o rechazadas.</ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <Amount/>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;