import React from "react";
import "./App.css";

const INITIAL_STATE = () => {
  return {
    numeroRandom: null,
    vidas: 10,
    numeroUsuario: "",
    gano: null,
    mensaje: "",
    warning: "",
    numerosAgregadosUsuario: [],
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE();
  }

  GetRandomArbitrary = (min, max) =>
    parseInt(Math.random() * (max - min) + min);

  componentDidMount() {
    this.initGame();
  }

  handleChange = (currentValue) => {
    const value = parseInt(currentValue) || "";
    if (value >= 1 && value <= 100) {
      this.setState({
        numeroUsuario: value, //Guardamos el número del usuario.
        warning: "",
      });
    } else {
      this.setState({
        warning: "Sólo números entre 1 y 100.",
      });
    }
  };

  handleClick = () => {
    const { vidas, numeroRandom, numeroUsuario } = this.state;

    if (numeroUsuario === numeroRandom) {
      this.setState({
        gano: true,
        numeroUsuario: "",
        mensaje: "",
        warning: "",
      });
    } else if (numeroUsuario > numeroRandom) {
      this.setState({
        vidas: vidas - 1,
        numeroUsuario: "",
        mensaje: "El número es menor",
        warning: "",
      });
    } else if (numeroUsuario < numeroRandom) {
      this.setState({
        vidas: vidas - 1,
        numeroUsuario: "",
        mensaje: "El número es mayor",
        warning: "",
      });
    } else if (vidas === 0) {
      this.initGame();
    }
  };

  initGame = () => {
    const numeroRandom = this.GetRandomArbitrary(1, 100);
    this.setState({ ...INITIAL_STATE(), numeroRandom });
  };

  render() {
    const { vidas, mensaje, gano, numeroRandom, numeroUsuario, warning } =
      this.state;

    return (
      <div className="container">
        <h1 className="titulo">Adivina el número oculto del 1 al 100.</h1>
        <div className="containerNumero">
          <div className="containerNumero-container">
            <p className="containerNumero-numero">{numeroRandom}</p>
          </div>
          <div className="containerNumero-box">Ver número</div>
        </div>
        <p>Vidas:</p>
        <p>{vidas}</p>
        <input
          className="containerNumero-input"
          type="number"
          value={numeroUsuario}
          max={100}
          min={1}
          onChange={(e) => {
            this.handleChange(e.target.value);
          }}
        />
        {warning && <p>{warning}</p>}
        <p className="animate__animated animate__flash animate__slow animate__infinite">
          {mensaje}
        </p>
        {!gano && vidas > 0 && (
          <button
            className="containerNumero-button"
            type="submit"
            disabled={!numeroUsuario}
            onClick={() => {
              this.handleClick();
            }}
          >
            Intentar
          </button>
        )}
        {!gano && vidas === 0 && (
          <button className="buttonReset" onClick={() => this.initGame()}>
            Reintentar
          </button>
        )}
        {gano && (
          <div className="containerButtonReset">
            <p className="animate__animated animate__zoomInDown animate__slow animate__infinite usuarioGano">
              Ganaste
            </p>
            <button className="buttonReset" onClick={() => this.initGame()}>
              Reintentar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
