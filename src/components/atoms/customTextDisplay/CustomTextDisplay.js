import React from 'react';
const CustomTextDisplay = ({message})=> {
    return (
      <div id="messageBox">
        {" "}
        <div id="message"> {message} </div>{" "}
      </div>
    );
    
}

export default CustomTextDisplay;