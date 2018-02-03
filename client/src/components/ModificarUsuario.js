import React from 'react';

export default class ModificarUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id ? props.id : '',
            username: props.username ? props.username : '',
            email: props.email ? props.email : '',
            password: props.password ? props.password : '',
            change: false
        }
    }    
    //life cicle methods
    componentWillMount() {
     //obtengo los valores del usuario a modificar
        try {
            const idAModificar = this.props.match.params.id;            
            const json = localStorage.getItem('usuarios');
            const usuarios = JSON.parse(json);
            //busco en localstorage el usuario a modificar y seteo State
            if (usuarios && idAModificar) {
                usuarios.map((usu) => {
                    if (usu._id === idAModificar) {
                        this.setState(() => ({
                            id: usu._id,
                            username: usu.username,
                            email: usu.email,
                            password: usu.password
                        }));
                    }
                } )
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    componentWillUnmount() {
        if (this.state.change) {
            const id = this.state.id;
            //Para hacer post a mi api            
            fetch(`http://localhost:3001/api/modificar/${id}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
            });
        } else {
            console.log('no se hicieron cambios');
        }
    }
    onUserNameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username, change: true }));
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email, change: true }));
    };
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password, change: true }));
    };

    onSubmitUser = (e) => {
        e.preventDefault();
        this.props.history.push('/');                
    }
    render() {
        return (
            <div>
                <h2></h2>
                <form onSubmit={this.onSubmitUser}>
                    User name: <input
                        type="text"
                        name="username"
                        autoFocus
                        value={this.state.username}
                        onChange={this.onUserNameChange}
                    />
                    User Email: <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                    User Password: <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                    <button placeholder="Alta Usuario">Modicar</button>
                </form>                
            </div>
        );
    }
};