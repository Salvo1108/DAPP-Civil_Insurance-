import React from "react";
import ReactDOM from "react-dom";
import CivilInsurance from "./pratica";
import web3 from "./web3";

export default class Polizia extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      ID: "",
      messaggio: ""
    };
  }

  async handleClick(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await CivilInsurance.methods
      .praticaFirmata(this.state.ID)
      .send({ from: accounts[0], gas: 2100000 });
    this.setState({ message: "Pratica Approvata!" });
  }

  render() {
    return (
      <div className="container container-fluid login-conatiner">
        <div className="col-md-4">
          <h3 className="text-center">Comando Polizia Municipale Admin</h3>
          <div className="login-form">
            <h4 className="text-center">Approva Pratica</h4>
            <div className="form-group">
              <input
                type="number"
                value={this.state.ID}
                onChange={event => this.setState({ ID: event.target.value })}
                className="form-control"
                placeholder="ID"
              />
              <br />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={this.handleClick}
              >
                Approva
              </button>
            </div>
            {this.state.messaggio && (
              <p className="alert alert-danger fade in">{this.state.messaggio}</p>
            )}
          </div>
        </div>
        <div className="col-md-6 col-md-offset-2">
          <div className="c-list">
            <h2 className="text-center">Campi</h2>
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome Incidente</th>
                  <th>Data</th>
                  <th>Comandante Polizia Municipale</th>
                  <th>Costo</th>
                  <th>Contatore di Firma</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
