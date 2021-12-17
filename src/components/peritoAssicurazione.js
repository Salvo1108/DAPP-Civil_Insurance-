import React from "react";
import Web3 from 'web3';
import PraticaAssicurativa from "../abis/PraticaAssicurativa.json"

export default class Perito extends React.Component {
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
          <h3 className="text-center">Perito Assicurativo</h3>
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



