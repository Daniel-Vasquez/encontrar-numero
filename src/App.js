import React from "react";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numeroRandom: null,
      vidas: null,
      numeroUsuario: null,
      numerosIngresadosUsuario: [],
    };
  }

  componentDidMount() {
    const numeroRandom = this.GetRandomArbitrary(1, 100);
    //Generamos el número Random en el ComponentDidMount,
    //para que no cambie cada que haya un cambio en el render.
    this.setState({
      numeroRandom,
    });
  }

  GetRandomArbitrary = (min, max) => {
    const RANDOM = parseInt(Math.random() * (max - min) + min);
    return RANDOM;
  };

  handleChange = (e) => {
    this.setState({
      numeroUsuario: parseInt(e.target.value) || null, //Guardamos el número del usuario.
    });
  };

  handleClick = () => {
    console.log("Número Random: ", this.state.numeroRandom);
    console.log("Número Usuario: ", this.state.numeroUsuario);

    if (this.state.numeroUsuario === this.state.numeroRandom) {
      console.log("Ganaste");
    } else {
      console.log("No");
    }
  };

  render() {
    // console.log("Soy numeroUsuario: ", this.state.numeroUsuario);

    return (
      <div>
        <h1>Número random</h1>
        <div className="containerNumero">
          <div className="containerNumero-container">
            <p className="containerNumero-numero">{this.state.numeroRandom}</p>
          </div>
          <button className="containerNumero-button">
            Mostrar <br /> número
          </button>
        </div>
        <input
          type="number"
          onChange={(e) => {
            this.handleChange(e);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            this.handleClick();
          }}
        >
          Intentar
        </button>
        <p>{this.state.numeroUsuario}</p>
      </div>
    );
  }
}

export default App;
