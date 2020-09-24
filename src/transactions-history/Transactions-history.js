import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Transactions-history.css';
import { Panel, Table, Col, Row } from 'react-bootstrap';

class TransactionsHistory extends Component {

  constructor(props){
    super(props);

    this.state = {
      transactions: []
    };
  
    this.api = 'http://localhost:8080';
    let userLogged = JSON.parse(sessionStorage.getItem('user'));

    $.ajax({
      url : this.api + '/transactions/user/' + userLogged.id,
      type: 'get',
      success : data => {	 				
        if(data.transactions !== null){
          this.setState({
            transactions: data.transactions
          });
        }
        
      },
      error: err =>{
        toastr.warning('Error connecting with server, try later');
      }
    });
  }

  render() {
    return (
      <Row>
        <Col sm={6} smOffset={3} >
          <Panel header={(<b>Tu historial de transacciones</b>)} bsStyle="info">              
            <Table responsive>
              <thead>
                <tr>
                  <th># Transacción</th>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>	
                </tr>
              </thead>
              <tbody>
                {
                  this.state.transactions.map((transaction,index) => {
                    return (<tr key={ transaction.id }> 
                      <td>{transaction.id}</td>
                      <td>{transaction.date.slice(0,10)}</td>
                      <td>{transaction.type == "retirement" ? "Retiro/pago" : "Recarga" }</td>
                      <td>{transaction.quantity}</td> 
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Panel>
        </Col>
      </Row>            	
    );
  }
}

export default TransactionsHistory;