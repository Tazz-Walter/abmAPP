import React from 'react';
import { Link } from 'react-router-dom';
//destructuring quedaria en vez de props {description, amount, createdAt}
//como en ExpenseList le pasamos los valores atraves de Spread operator(...expense) aca podemos destructurar sino 
//deberiamos usar props.description, props.amount, props.createdAt

const UsuarioListItem = (props) => (
        <div>
            <p>Usuario: {props.username} 
            <Link to={`/listado/${props.id}`} >Modificar</Link>
            <button                
                onClick={(e) => {            
                    props.handleDeleteOption(props.id)
                }}
            >
            Remove
            </button></p>
            <p>Email: {props.email}</p>
            --------------------
        </div>
);    
export default UsuarioListItem;
