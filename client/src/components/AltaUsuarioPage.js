import React from 'react';

export default class AltaUsuarioPage extends React.Component {
    constructor(props) {
        super(props);        
        this.state = { 
            username: '',
            email: '',
            password: ''            
        };
    };
    //life cicle methods    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.username != this.state.username && 
            prevState.email != this.state.email && 
            prevState.password != this.state.password) {
        //Para hacer post a mi api
            fetch('http://localhost:3001/api/guardar', {
                method: 'POST',
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
        }
    };

    handleAddUser = (e) => {  
        e.preventDefault();        
        const username = e.target.elements.username.value.trim();
        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value.trim();
        if (username != '' && email != '' && password != '') {
            this.setState(() => ({
                username,
                email,
                password
                })
            );
            e.target.elements.username.value = "";
            e.target.elements.email.value = "";
            e.target.elements.password.value = "";
        }
    }

    render() {
        return (
            <div>
                <h1>Alta Usuario</h1>                
                <form onSubmit={this.handleAddUser}>
                    User name: <input 
                        type="text" 
                        name="username" 
                        placeholder='Username'
                    />
                    User Email: <input 
                        type="text" 
                        name="email" 
                        placeholder='email'
                    />
                    User Password: <input 
                        type="password" 
                        name="password"
                        placeholder='password' 
                    />
                    <button placeholder="Alta Usuario">Agregar</button>
                </form>
            </div>
        )
    };
};
