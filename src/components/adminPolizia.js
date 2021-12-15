import React from "react";

export default class Polizia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      messaggio: ""
    }

    this.firmaPratica = this.firmaPratica.bind(this)
  }

  firmaPratica(ID) {
    this.setState({ loading: true, message: "Pratica Approvata" })
    this.state.praticaAssicurativa.methods.firmaPratica(ID).send({ from: this.state.account, gas: 2100000 })
    .once('receipt', (receipt) => {
      this.setState({ loading: false, message: "Pratica non approvata"})
    })
  }

  render() {
    return (
      <div id="content">
          <h3 className="text-center">Comando Polizia Municipale Admin</h3>
            <h4 className="text-center">Approva Pratica</h4>
            <form onSubmit={(event) => {
                event.preventDefault()
                const ID = this.praticaID.value
                this.firmaPratica(ID)
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
              <br />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Approva</button>
            </form>
              </div>
    );
  }
}



