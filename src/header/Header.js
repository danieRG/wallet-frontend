import React, { Component } from 'react';
import './Header.css';
import toastr from 'toastr';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './logo.png';

class Header extends Component {

  logout(){
    sessionStorage.removeItem('user');
    toastr.info('Estás desconectado!');
    window.location.href = '/#/';
  }

  render() {
    return (
        <Navbar>
          <Navbar.Header>
            {
              sessionStorage.getItem('user') !== null && JSON.parse(sessionStorage.getItem('user')).is_admin === 0 ? (
                  <Navbar.Brand>
                  <a href="/#/dashboard"><img src={logo} width="58" height="44"  alt="Home" /></a>
                  </Navbar.Brand>
              ) : (
                <Navbar.Brand>
                <a href="/#/"><img src={logo} width="58" height="44"  alt="Home"/></a>
                </Navbar.Brand>
            )
            }
          <Navbar.Toggle />
          <Navbar.Text>
             <span id="text-wellcome">Bienvenido <b>{ sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : 'Invitado' }</b> a Mi billetera </span>
          </Navbar.Text>
         
          </Navbar.Header>
          <Navbar.Collapse>         
            {
              sessionStorage.getItem('user') !== null ? (<Nav pullRight><NavItem onClick={this.logout}>Salir</NavItem></Nav>) : <Nav pullRight><a href="/#/register">Registro</a></Nav>
            }
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;