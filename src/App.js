import React from "react";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numeroRandom: null,
      vidas: 10,
      numeroUsuario: null,
      gano: null,
      sigue: "",
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
    // console.log("Número Random: ", this.state.numeroRandom);
    // console.log("Número Usuario: ", this.state.numeroUsuario);

    if (this.state.numeroUsuario === this.state.numeroRandom) {
      console.log("Ganaste");
      this.setState({ gano: true });
    } else if (this.state.numeroUsuario > this.state.numeroRandom) {
      console.log("El número es menor");
      this.setState({ vidas: this.state.vidas - 1 });
    } else if (this.state.numeroUsuario < this.state.numeroRandom) {
      console.log("El número es mayor");
      this.setState({ vidas: this.state.vidas - 1 });
    } else if (this.state.vidas === 0) {
      this.setState({ vidas: 10 });
    }
  };

  render() {
    // console.log(this.state.vidas);

    return (
      <div className="container">
        <h1>Adivina el número oculto</h1>
        <div className="containerNumero">
          <div className="containerNumero-container">
            <p className="containerNumero-numero">{this.state.numeroRandom}</p>
          </div>
          <div className="containerNumero-box">Ver número</div>
        </div>
        <p>Vidas:</p>
        <p>{this.state.vidas}</p>
        <input
          className="containerNumero-input"
          type="number"
          onChange={(e) => {
            this.handleChange(e);
          }}
        />
        <button
          className="containerNumero-button"
          type="submit"
          onClick={() => {
            this.handleClick();
          }}
        >
          Intentar
        </button>
        {!this.state.gano && this.state.vidas === 0 && <p>Sigue intentando</p>}
        {this.state.gano && <p>Ganaste</p>}
      </div>
    );
  }
}

export default App;
