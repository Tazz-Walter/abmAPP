import React from 'react';
import UsuarioListItem from './UsuarioListItem';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { usuarios: [] }
    }
    //life cicle methods    
    componentDidMount() {
        fetch('http://localhost:3001/api/listado')   
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                // console.log(recurso)
                this.setState({ usuarios: recurso })
            })      
    };
    componentWillUnmount() {
        //lo paso a localStorage para poder persistir entre las paginas        
        const json = JSON.stringify(this.state.usuarios);
        localStorage.setItem('usuarios', json);
    }
    handleDeleteOption = (id) => {
        if (id) {
            console.log('id borrado', id);
            fetch(`http://localhost:3001/api/borrar/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }                
            });
            this.setState((prevState) => ({
                //para remover opciones individuales con filter si son iguales lo borra 
                //de esta manera no volvemos a llamar al servicio. solo lo borramos del state.
                    usuarios: prevState.usuarios.filter((usu) => usu._id !== id) 
                })
            );
        }
    }
    render() {
        return (

            <div>
                <h1>Welcome Feloks!</h1>
                <h3>Listado Usuarios en la Base de Datos</h3>              
                {
                    this.state.usuarios.map(user => {
                        return (
                            //aca se podria usar spread operator para refactorizar en un futuro
                            <UsuarioListItem 
                                key={user._id}
                                id={user._id}
                                username={user.username}
                                email={user.email}
                                password={user.password}
                                handleDeleteOption={this.handleDeleteOption}
                            />
                        );
                    })
                }
            </div>
    )};
};
