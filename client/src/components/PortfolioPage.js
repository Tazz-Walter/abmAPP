import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = (props) => {    
    return (
        <div>
            PORTFOLIO HOME
            <li><Link to="/portfolio/1">item1</Link></li>
            <li><Link to="/portfolio/2">item2</Link></li>            
        </div>
    );
};

export default Portfolio;