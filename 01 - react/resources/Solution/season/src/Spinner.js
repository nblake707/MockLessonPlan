import React from 'react';

const Spinner = (props) => {
    return ( 
        <div className="ui active dimmer">
            <div className="ui big text loader">
              {props.message}
            </div>
        </div> 
    );
};

//If an instance of the spinner prop is created and there is nothing specified under message

Spinner.defaultProps = {
    message: 'Loading.......'
};

export default Spinner;