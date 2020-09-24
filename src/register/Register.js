import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Register.css';
import { Form, FormControl, FormGroup, Col, Button } from 'react-bootstrap';

class Register extends Component {

	constructor(props){
		super(props);

		this.state = {
			username: '',
            password: '',
            documento: '',
            name: '',
            email: '',
            phone: '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.api = 'http://localhost:8080';
	}
  
	handleOnChange(event){
		let target = event.target;
		let name = target.name;

		this.setState({
			[name]: target.value 
		});
	}

	handleSubmit(event){
		event.preventDefault();
		let values = document.querySelectorAll('[name=password],[name=username],[name=name],[name=email],[name=phone],[name=documento]');

		if(values[0].value === '' || values[1].value === '' || values[2].value === '' || values[3].value === '' || values[4].value === '' || values[5].value === ''){
			toastr.error('Todos los datos son requeridos', 'Datos faltantes');
			return;
		}
		
		$.ajax({
			url : this.api + '/register',
			type: 'post',
			data: 'username=' + values[0].value + '&password=' + values[1].value + '&name=' + values[2].value + '&email=' + values[3].value + '&phone=' + values[4].value + '&documento=' + values[5].value,
			success : data => {	 
				if(data.user !== ''){
					toastr.success('¡Está hecho!', 'Registro exitoso');
					//sessionStorage.setItem('user', JSON.stringify(data.user));
					window.location.href = '/#/';
				}else{
					toastr.error('El usuario no pudo ser creador', 'Error de datos');
				}
			},
			error: err =>{
				toastr.warning('Error al conectar al servidor, intenta más tarde');
			}
		});
	}

  render() {
    return (
		<Form horizontal onSubmit={this.handleSubmit}>
			<FormGroup controlId="formHorizontalUsername">
				<Col sm={1} smOffset={4}>
					Usuario*
				</Col>
				<Col sm={2} >
					<FormControl type="text" placeholder="Usuario" name="username" value={this.state.username} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup controlId="formHorizontalPassword">
				<Col sm={1} smOffset={4}>
					Contraseña*
				</Col>
				<Col sm={2}>
					<FormControl type="password" placeholder="Contraseña" name="password" value={this.state.password} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
            <FormGroup controlId="formHorizontalUsername">
				<Col sm={1} smOffset={4}>
					Nombre*
				</Col>
				<Col sm={2}>
					<FormControl type="text" placeholder="Nombre" name="name" value={this.state.name} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup controlId="formHorizontalUsername">
				<Col sm={1} smOffset={4}>
					Email*
				</Col>
				<Col sm={2}>
					<FormControl type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup controlId="formHorizontalUsername">
				<Col sm={1} smOffset={4}>
					Celular*
				</Col>
				<Col sm={2}>
					<FormControl type="tel" placeholder="Celular" name="phone" value={this.state.phone} onChange={this.handleOnChange} pattern="[0-9]{10}" />
				</Col>
			</FormGroup>
			<FormGroup controlId="formHorizontalUsername">
				<Col sm={1} smOffset={4}>
					Documento*
				</Col>
				<Col sm={2}>
					<FormControl type="text" placeholder="Documento" name="documento" value={this.state.documento} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup>
				<Col smOffset={5} sm={2}>
					<Button bsStyle="info" type="submit">
						Registrar
					</Button>
				</Col>
			</FormGroup>
		</Form>
    );
  }
}

export default Register;