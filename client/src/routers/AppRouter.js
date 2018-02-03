import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import ModificarUsuario from '../components/ModificarUsuario';
import Portfolio from '../components/PortfolioPage';
import PortfolioItem from '../components/PortfolioItemPage';
import HomePage from '../components/HomePage';
import AltaUsuario from '../components/AltaUsuarioPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/listado/:id" component={ModificarUsuario} />                
                <Route path="/altausuario" component={AltaUsuario} exact={true} />
                <Route path="/portfolio" component={Portfolio} exact={true} />
                <Route path="/portfolio/:id" component={PortfolioItem} />                
                <Route component={NotFoundPage} />
            </Switch>            
        </div>
    </BrowserRouter>
);

export default AppRouter;