import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import { Form, FormControl, FormGroup, Col} from 'react-bootstrap';
import './LoadAndRetireMoney.css';
import Amount from '../amount/Amount';
toastr.options.closeButton = true;
toastr.options.preventDuplicates = true;

class LoadAndRetireMoney extends Component {

	constructor(props){
		super(props);

		this.state = {
			quantity: '',
			operation: 'retirement',
			email: JSON.parse(sessionStorage.getItem('user')).email,
			token: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.isAvailableAmount = this.isAvailableAmount.bind(this);
		this.api = 'http://localhost:8080';
		this.userLogged = JSON.parse(sessionStorage.getItem('user'));
	}
  
	genToken(){
		let sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
		this.setState({
			token: sixdigitsrandom 
		});
	}

	handleOnChange(event){
		let target = event.target;
		let name = target.name;
		this.setState({
			[name]: target.value 
		});
		
		this.isAvailableAmount(name, target.value);	
	}

	handleSubmit(event){
		event.preventDefault();

		if(this.state.quantity === ''){
			toastr.error('La cantidad está vacía', 'Error de datos');
			return;
		}
		
		$.ajax({
			url : this.api + '/requests',
			type: 'post',
			data: 'quantity=' + this.state.quantity + '&operation=' + this.state.operation + '&date=' + new Date().toISOString().slice(0, 10) +
			 '&id_requester=' + this.userLogged.id,
			success : data => {
				if(data.status === 'saved'){
					this.genToken()
					$.ajax({
						url : this.api + '/send-email',
						type: 'post',
						data: 'email=' + this.state.email + '&token=' + this.state.token + '&quantity=' + this.state.quantity + '&operation=' + this.state.operation,
						success :
							console.log('Éxito')
						,
						error: err =>{
							toastr.warning('Error al conectar al servidor, Intenta más tarde');
						}
					});

					toastr.success('¡Tu operación '+ this.state.operation +' ha sido procesada¡', 'Petición procesada');
					window.location.href = '/#/dashboard';
				}else if(data.status === 'in-progress'){
					
					this.genToken()
					$.ajax({
						url : this.api + '/send-email',
						type: 'post',
						data: 'email=' + this.state.email + '&token=' + this.state.token + '&quantity=' + this.state.quantity + '&operation=' + this.state.operation,
						success :
							console.log('Éxito')
						,
						error: err =>{
							toastr.warning('Error al conectar al servidor, Intenta más tarde');
						}
					});

					toastr.info('Tu petición ha sido erviada, espera a que un administrador confirme...');
					window.location.href = '/#/dashboard';
				}
			},
			error: err =>{
				toastr.warning('Error al conectar al servidor, Intenta más tarde');
			}
		});
	}

	isAvailableAmount(name,value){
		if(name === 'quantity' && value >= this.refs.amount.state.total && this.state.operation === 'retirement'){
			this.refs.buttonSend.disabled = true;
			toastr.error('No tienes esa cantidad de dinero', 'Dinero insuficiente');
		}else if(name === 'operation' && value === 'retirement' && this.state.quantity >= this.refs.amount.state.total){
			this.refs.buttonSend.disabled = true;
			toastr.error('No tienes esa cantidad de dinero', 'Dinero insuficiente');
		}else{
			this.refs.buttonSend.disabled = false;
		}
	}

  render() {
    return (
		<div>	
			<Col>
				<Amount ref='amount'/>
			</Col>
			<Col sm={5} smOffset={3}>
				<h3>Rearga o retira tu dinero rápido!</h3>
			</Col>
			<Form horizontal onSubmit={this.handleSubmit}>
				<FormGroup controlId="formHorizontalUsername">
					<Col sm={1} smOffset={4}>
						Cantidad
					</Col>
					<Col sm={2} >
						<FormControl type="number" placeholder="Cantidad" name="quantity" value={this.state.quantity} onChange={this.handleOnChange} />
					</Col>	
				</FormGroup>
				<FormGroup controlId="formControlsSelect">
					  <Col sm={1} smOffset={4}>
						Tipo de operación
					  </Col>
					  <Col sm={2}>	
						<FormControl componentClass="select" name="operation" placeholder="Operation" value={this.state.operation} onChange={this.handleOnChange}>
							<option value="retirement">Retiro/pago</option>
							<option value="payment">Recargar</option>
						</FormControl>
					  </Col>
					</FormGroup>
				<FormGroup>
					<Col smOffset={5} sm={2}>
						<button className="btn btn-primary" ref='buttonSend' type="submit">Enviar</button>
					</Col>
				</FormGroup>
			</Form>
		</div>
    );
  }
}

export default LoadAndRetireMoney;