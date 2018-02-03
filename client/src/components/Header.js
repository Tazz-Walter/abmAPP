import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>ABM Usuarios</h1>
        <ul>
            <li><NavLink to="/" exact={true} activeClassName="is-active">HomePage Listado</NavLink></li>
            <li><NavLink to="/altausuario" exact={true} activeClassName="is-active">Alta Usuario</NavLink></li>            
            <li><NavLink to="/portfolio" exact={true} activeClassName="is-active">Portfolio</NavLink></li>
        </ul>
    </header>
);

export default Header;