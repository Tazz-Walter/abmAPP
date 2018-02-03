import React from 'react';

const PortfolioItem = (props) => {   
    return (
        <div>            
            PortfolioItem with the param {props.match.params.id}
        </div>
    );
};

export default PortfolioItem;