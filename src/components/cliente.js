import React from "react";
import Web3 from 'web3';
import PraticaAssicurativa from "../abis/PraticaAssicurativa.json"

export default class Cliente extends React.Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = PraticaAssicurativa.networks[networkId]
    if(networkData) {
      const praticaAssicurativa = web3.eth.Contract(PraticaAssicurativa.abi, networkData.address)
      this.setState({ praticaAssicurativa })
    } else {
      window.alert('Il Contratto pratica assicurativa non è stato rilevato nella rete.')
    }
  }

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
                const nomeData = this.praticaData.value
                const praticaPolizia = this.praticaPolizia.value
                const praticaCosto = this.praticaCosto.value//window.web3.utils.toWei(this.praticaCosto.value.toString(), 'Ether')
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
