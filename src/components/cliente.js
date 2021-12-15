import React from "react";

export default class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      nomeIncidente: "",
      data: "",
      comandoPoliziaMunicipale: "",
      costo: "",
      messaggio: ""
    }

    this.newPratica = this.newPratica.bind(this)
  }


  newPratica(ID, nomeIncidente, data, comandoPoliziaMunicipale, costo) {
    this.setState({ loading: true, message: "Pratica creata" })
    this.state.praticaAssicurativa.methods.newPratica(ID, nomeIncidente, data, comandoPoliziaMunicipale, costo).send({ from: this.state.account, gas: 2100000 })
    .once('receipt', (receipt) => {
      this.setState({ loading: false, message: "Pratica non creata"})
    })
  }

  render() {
    return (
      <div id="content">
              <h2 className="text-center">Nuova Compilazione</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const ID = this.praticaID.value
                const nomeIncidente = this.praticaNomeIncidente.value
                const nomeData = this.praticanomeData.value
                const praticaPolizia = this.praticaPolizia.value
                const praticaCosto = window.web3.utils.toWei(this.praticaCosto.value.toString(), 'Ether')
                this.newPratica(ID, nomeIncidente, nomeData, praticaPolizia, praticaCosto)
              }}>
              <div className="form-group">
              <input
                id="praticaID"
                type="text"
                ref={(input) => { this.praticaID = input }}
                className="form-control"
                placeholder="ID"
                required 
                />
                </div>
              <div className="form-group">
              <input
                id="praticaNomeIncidente"
                type="text"
                ref={(input) => { this.praticaNomeIncidente= input }}
                className="form-control"
                placeholder="Nome Incidente"
                required 
                />
              </div>
              <div className="form-group">
              <input
                id="praticaData"
                type="Date"
                ref={(input) => { this.praticaData= input }}
                className="form-control"
                placeholder="Data"
                required 
                />
              </div>
              <div className="form-group">
              <input
                id="praticaPolizia"
                type="text"
                ref={(input) => { this.praticaPolizia= input }}
                className="form-control"
                placeholder="Polizia Municipale"
                required 
                />
              </div>
              <div className="form-group">
              <input
                id="praticaCosto"
                type="text"
                ref={(input) => { this.praticaCosto= input }}
                className="form-control"
                placeholder="Costo"
                required 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Invia</button>
              </form>
              </div>
    );
  }
}
