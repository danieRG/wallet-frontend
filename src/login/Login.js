import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Login.css';
import { Form, FormControl, FormGroup, Col, Button } from 'react-bootstrap';

class Login extends Component {

	constructor(props){
		super(props);

		this.state = {
			username: '',
			password: ''
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
		let values = document.querySelectorAll('[name=password],[name=username]');

		if(values[0].value === '' || values[1].value === ''){
			toastr.error('El usuario o contraseña están vacios', 'Error de datos');
			return;
		}
		
		$.ajax({
			url : this.api + '/login',
			type: 'post',
			data: 'username=' + values[0].value + '&password=' + values[1].value,
			success : data => {	 
				if(data.user !== '' && data.user.is_admin === 0){
					toastr.success('¡Estás conectado!', 'Inicio exitoso');
					sessionStorage.setItem('user', JSON.stringify(data.user));
					window.location.href = '/#/dashboard';
				}else if(data.user !== '' && data.user.is_admin === 1){
					toastr.success('¡Estás conectado!', 'Inicio exitoso');
					sessionStorage.setItem('user', JSON.stringify(data.user));
					window.location.href = '/#/admin';
				}else{
					toastr.error('El usuario o contraseña son incorrectos', 'Error de datos');
				}
			},
			error: err =>{
				toastr.warning('Error al conectar al servidor, Intenta más tarde');
			}
		});
	}

  render() {
    return (
		<Form horizontal onSubmit={this.handleSubmit}>
			<FormGroup controlId="formHorizontalUsername">
				<Col sm={1} smOffset={4}>
					Usuario
				</Col>
				<Col sm={2} >
					<FormControl type="text" placeholder="Usuario" name="username" value={this.state.username} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup controlId="formHorizontalPassword">
				<Col sm={1} smOffset={4}>
					Contraseña
				</Col>
				<Col sm={2}>
					<FormControl type="password" placeholder="Contraseña" name="password" value={this.state.password} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup>
				<Col smOffset={5} sm={2}>
					<Button bsStyle="info" type="submit">
						Entrar
					</Button>
				</Col>
			</FormGroup>
		</Form>
    );
  }
}

export default Login;