import React from "react";
import ButtonReset from "./component/ButtonReset";
import GetRandomArbitrary from "./utils/RandomNumber";
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

  componentDidMount() {
    this.initGame();
  }

  handleChange = (currentValue) => {
    const value = parseInt(currentValue) || "";
    if (value >= 0 && value <= 100) {
      this.setState({
        numeroUsuario: value,
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

    const numerosIngresados = [
      ...this.state.numerosAgregadosUsuario,
      numeroUsuario,
    ];

    if (numeroUsuario === numeroRandom) {
      this.setState({
        gano: true,
        numeroUsuario: "",
        mensaje: "",
        warning: "",
        numerosAgregadosUsuario: numerosIngresados,
      });
    } else if (numeroUsuario > numeroRandom) {
      this.setState({
        vidas: vidas - 1,
        numeroUsuario: "",
        mensaje: `El número a encontrar es menor a ${numeroUsuario}`,
        warning: "",
        numerosAgregadosUsuario: numerosIngresados,
      });
    } else if (numeroUsuario < numeroRandom) {
      this.setState({
        vidas: vidas - 1,
        numeroUsuario: "",
        mensaje: `El número a encontrar es mayor a ${numeroUsuario}`,
        warning: "",
        numerosAgregadosUsuario: numerosIngresados,
      });
    } else if (vidas === 0) {
      this.initGame();
    }
  };

  initGame = () => {
    const numeroRandom = GetRandomArbitrary(1, 100);
    this.setState({ ...INITIAL_STATE(), numeroRandom });
  };

  render() {
    const {
      vidas,
      mensaje,
      gano,
      numeroRandom,
      numeroUsuario,
      warning,
      numerosAgregadosUsuario,
    } = this.state;
    
    return (
      <div className="container">
        <h1 className="titulo">Adivina el número oculto del 1 al 100.</h1>
        <div className="containerNumero">
          <div className="containerNumero-container">
            <p className="containerNumero-numero">{numeroRandom}</p>
          </div>
          <div className={`containerNumero-box ${gano && "gano"}`} >Número secreto</div>
        </div>
        <p className="containerVidas">Vidas:</p>
        <p className="containerVidas-vidas">{vidas}</p>
        <input
          className="containerNumero-input"
          type="number"
          placeholder="Ingresa un número"
          value={numeroUsuario}
          max={100}
          min={1}
          onChange={(e) => {
            this.handleChange(e.target.value);
          }}
        />
        {warning && <p>{warning}</p>}
        <p className="conatinerMessage animate__animated animate__flash animate__slow animate__repeat-3">
          <strong>{mensaje}</strong>
        </p>
        <div className="conatinerNumerosIngresados">
          {numerosAgregadosUsuario.length > 0 && (
            <div>
              <p className="conatinerNumerosIngresados-text">Números Agregados:</p>
              <p className="conatinerNumerosIngresados-numero">
                {numerosAgregadosUsuario.join(", ")}.
              </p>
            </div>
          )}
        </div>
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
        {!gano && vidas === 0 && <ButtonReset resetGame={this.initGame} />}
        {gano && (
          <div className="containerButtonReset">
            <p className="animate__animated animate__flash animate__slow animate__infinite usuarioGano">
              Ganaste
            </p>
            <ButtonReset resetGame={this.initGame} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
