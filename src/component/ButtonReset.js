import React from "react";

function ButtonReset(props) {
  return (
    <button className="buttonReset" onClick={props.resetGame}>
      Reintentar
    </button>
  );
}

export default ButtonReset;
